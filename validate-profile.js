#!/usr/bin/env node
/**
 * Validate an example crate against one of this repo's profile crates.
 *
 * Usage:
 *   node validate-profile.js <target-crate.json> <profile-crate.json>
 *   node validate-profile.js --json <target-crate.json> <profile-crate.json>
 *
 * This is the same job ro-crate-masp's own validate-crate.js does, kept here so
 * profiles in this repo can be checked without a checkout of that repo.
 */
const fs = require("fs");
const { ROCrate } = require("ro-crate");
const { MaspValidator } = require("ro-crate-maps/lib/masp-validator.js");

async function main() {
  let args = process.argv.slice(2);
  const printJson = args[0] === "--json";
  if (printJson) args = args.slice(1);

  const [targetPath, profilePath] = args;
  if (!targetPath || !profilePath) {
    console.log(
      "Usage: node validate-profile.js [--json] <target-crate.json> <profile-crate.json>"
    );
    process.exit(1);
  }

  const load = (p) =>
    new ROCrate(JSON.parse(fs.readFileSync(p, "utf8")), {
      array: true,
      link: true,
    });

  const validator = new MaspValidator(load(profilePath));
  const results = await validator.validateCrate(load(targetPath));
  const errors = results?.error || [];

  if (printJson) console.log(JSON.stringify(results, null, 2));

  if (errors.length > 0) {
    errors.forEach((e) => console.log(`[ERROR] ${e.message}`));
    process.exit(2);
  }
  if (!printJson) console.log("Validation passed: No issues found.");
}

main().catch((err) => {
  console.error("Validation failed:", err.message);
  process.exit(1);
});
