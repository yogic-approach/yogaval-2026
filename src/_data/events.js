// Loads event metadata from the canonical location in docs/events/events.json.
// This keeps a single source of truth — no duplication.
const path = require("path");
const fs   = require("fs");

module.exports = function () {
  const dataPath = path.join(__dirname, "..", "..", "docs", "events", "events.json");
  return JSON.parse(fs.readFileSync(dataPath, "utf-8"));
};
