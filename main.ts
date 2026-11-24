import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one excuse an AI agent gives for a missed deadline.
const LINE =
  "The deadline was not in my eval set, so I optimized for everything except it.";

// Gate: the entry must be a single non-blank line of 1-200 characters.
// Count code points, not UTF-16 units, so the gate matches the scorer.
const CHAR_COUNT = Array.from(LINE).length;
if (CHAR_COUNT < 1 || CHAR_COUNT > 200) {
  throw new Error(`entry must be 1-200 characters, got ${CHAR_COUNT}`);
}
if (LINE.trim().length === 0 || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single non-blank line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify what landed on disk matches the line exactly, byte for byte.
const WRITTEN = readFileSync("/output/entry.txt", "utf8");
if (WRITTEN !== LINE) {
  throw new Error("entry.txt does not match the entry line byte for byte");
}
