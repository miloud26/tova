/*
 * Build-time step (postbuild).
 *
 * React.lazy only starts its `import()` when the route actually renders, which
 * leaves the route's chunks waiting for main.js to finish evaluating. This
 * script reads the *built* bundle and injects a route -> chunk-file map into
 * build/index.html, so the browser can start exactly those chunks at parse
 * time. Nothing is hardcoded: chunk ids, hashes and names are read back from
 * the production output on every build.
 *
 * Where the information comes from (all from build output):
 *   1. `main.<hash>.js` contains webpack's own route groups, e.g.
 *        lazy(() => Promise.all([n.e(930),n.e(217),n.e(845),n.e(790)]).then(...))
 *   2. the same file contains the chunk-id -> content-hash table used to build
 *      chunk URLs:  n.u = e => "static/js/" + e + "." + {790:"a9a46c86",...}[e] + ".chunk.js"
 *   3. each chunk's `.js.map` lists the source files it contains, which is how
 *      a group is attributed to a route (the group holding src/Pgae01.jsx is
 *      the product route, the one holding src/LandingPage01.jsx is the landing
 *      route).
 *
 * If any of that is unavailable the script injects nothing and the page keeps
 * working exactly as before.
 */

const fs = require("fs");
const path = require("path");

const BUILD_DIR = path.join(__dirname, "..", "build");
const JS_DIR = path.join(BUILD_DIR, "static", "js");
const INDEX_FILE = path.join(BUILD_DIR, "index.html");
// The HTML minifier drops the trailing semicolon, so do not require it.
const MARKER = /window\.__routeChunks\s*=\s*null/;

const log = (message) => console.log(`[preload-route-chunks] ${message}`);

const ROUTES = [
  { key: "product", page: "Pgae01.jsx" },
  { key: "landing", page: "LandingPage01.jsx" },
];

const chunkSources = (chunkId, hash) => {
  const mapFile = path.join(JS_DIR, `${chunkId}.${hash}.chunk.js.map`);

  if (!fs.existsSync(mapFile)) {
    return null;
  }

  try {
    return JSON.parse(fs.readFileSync(mapFile, "utf8")).sources || [];
  } catch (error) {
    return null;
  }
};

const main = () => {
  if (!fs.existsSync(INDEX_FILE) || !fs.existsSync(JS_DIR)) {
    log("no production build found, skipping");

    return;
  }

  const mainFile = fs
    .readdirSync(JS_DIR)
    .find((file) => /^main\.[0-9a-f]+\.js$/.test(file));

  if (!mainFile) {
    log("main chunk not found, skipping");

    return;
  }

  const mainSource = fs.readFileSync(path.join(JS_DIR, mainFile), "utf8");

  // chunk id -> file name, straight from webpack's URL builder.
  const hashTable = mainSource.match(
    /\{((?:\d+:"[0-9a-f]+",?){2,})\}\[e\]/,
  );

  if (!hashTable) {
    log("chunk hash table not found, skipping");

    return;
  }

  const hashById = {};

  for (const entry of hashTable[1].matchAll(/(\d+):"([0-9a-f]+)"/g)) {
    hashById[entry[1]] = entry[2];
  }

  const fileName = (id) =>
    hashById[id]
      ? `/static/js/${id}.${hashById[id]}.chunk.js`
      : null;

  // The lazy-route chunk groups: Promise.all([n.e(a), n.e(b), ...])
  const groups = [];

  for (const match of mainSource.matchAll(
    /Promise\.all\(\[((?:\w+\.e\(\d+\),?)+)\]\)/g,
  )) {
    const ids = [...match[1].matchAll(/\.e\((\d+)\)/g)].map((m) => m[1]);

    if (ids.length) {
      groups.push(ids);
    }
  }

  const routeChunks = {};
  const used = new Set();

  for (const route of ROUTES) {
    const group = groups.find((ids) =>
      ids.some(
        (id) =>
          !used.has(id) &&
          (chunkSources(id, hashById[id]) || []).some((source) =>
            path.basename(source) === route.page,
          ),
      ),
    );

    if (!group) {
      log(`could not identify the chunk group of ${route.page}`);

      continue;
    }

    const files = group.map(fileName).filter(Boolean);

    group.forEach((id) => used.add(id));
    routeChunks[route.key] = files;
    log(`${route.key}: ${files.join(", ")}`);
  }

  if (!routeChunks.product && !routeChunks.landing) {
    log("nothing identified, index.html left untouched");

    return;
  }

  const html = fs.readFileSync(INDEX_FILE, "utf8");

  if (!MARKER.test(html)) {
    log("placeholder not found in index.html, skipping");

    return;
  }

  const injected = `window.__routeChunks=${JSON.stringify(routeChunks)};`;

  fs.writeFileSync(INDEX_FILE, html.replace(MARKER, injected));
  log("route chunk map injected into index.html");
};

main();
