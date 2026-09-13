// Test-only setup: jsdom (Jest 27) does not expose TextEncoder/TextDecoder,
// which react-router needs while running the router tests.
import { TextDecoder, TextEncoder } from "util";

if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === "undefined") {
  global.TextDecoder = TextDecoder;
}
