import fs from "fs";
import path from "path";

const SRC_ROOT = path.join(__dirname, "..");
const PROJECT_ROOT = path.join(SRC_ROOT, "..");

const listSourceFiles = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return entry.name === "__tests__" ? [] : listSourceFiles(fullPath);
    }

    return /\.(js|jsx)$/.test(entry.name) ? [fullPath] : [];
  });

const sourceFiles = listSourceFiles(SRC_ROOT);

const readIfExists = (filePath) =>
  fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : null;

const filesContaining = (pattern) =>
  sourceFiles.filter((file) => pattern.test(fs.readFileSync(file, "utf8")));

describe("order conversion tracking audit", () => {
  it("ships no conversion or purchase event inside React", () => {
    const offenders = filesContaining(
      /ttq|CompletePayment|firePurchaseOnce|sentPurchaseOrderIds|purchase_sent_|fbq|["']Purchase["']/,
    );

    expect(offenders.map((file) => path.relative(SRC_ROOT, file))).toEqual([]);
  });

  it("keeps one legitimate global pixel page-view init", () => {
    const html = readIfExists(path.join(PROJECT_ROOT, "public", "index.html"));

    expect(html).not.toBeNull();
    expect(html).toContain('ttq.load("D33IDQRC77U0GC4S7H10")');
    expect(html).toContain("ttq.page()");
    expect((html.match(/ttq\.load\(/g) || []).length).toBe(1);
    expect(html).not.toContain("CompletePayment");
    expect(html).not.toContain("gtag");
  });

  it("keeps the authoritative server confirmation rule in the form", () => {
    const form = readIfExists(
      path.join(SRC_ROOT, "components", "Form.jsx"),
    );

    expect(form).toContain("payload.success === true");
    expect(form).toContain("response.ok");
    expect(form).toContain("isSubmittingRef");
    expect(form).toContain('navigate("/thank-you")');
  });

  it("keeps the Apps Script endpoint and sheet column payload untouched", () => {
    const data = readIfExists(path.join(SRC_ROOT, "data.js"));

    expect(data).toContain(
      '"https://script.google.com/macros/s/AKfycbw6JUkqmqhcCGD6bZWQ92QfCjvJRqgXlCFVZy0gOF_nZKAIxgjXq9JmfvnjnA85ttiPdg/exec"',
    );

    const form = readIfExists(path.join(SRC_ROOT, "components", "Form.jsx"));

    [
      '"date"',
      '"orderId"',
      '"product"',
      '"name"',
      '"phone"',
      '"wilaya"',
      '"commune"',
      '"quantity"',
      '"offer"',
      '"prix"',
    ].forEach((field) => expect(form).toContain(field));
  });

  it("routes /thank-you through the existing router", () => {
    const app = readIfExists(path.join(SRC_ROOT, "App.jsx"));
    const entry = readIfExists(path.join(SRC_ROOT, "index.js"));

    expect(app).toContain('path="/thank-you"');
    expect(app).toContain('from "react-router-dom"');
    expect(entry).toContain("BrowserRouter");
    expect(readIfExists(path.join(SRC_ROOT, "components", "ThankYou.jsx")))
      .toBeTruthy();
  });
});
