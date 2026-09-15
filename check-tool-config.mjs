#!/usr/bin/env node
/**
 * Check that every profile's two build-option blocks say the same thing.
 *
 * Each tool-config.json carries its build options twice, because two consumers
 * read them and neither understands the other's shape:
 *
 *   tools.collection2crate  the flat shape — enabledOptionKeys as the
 *                           allow-list, plugins as the subset that starts
 *                           switched on, plus scalar pre-fills alongside.
 *   tools.chaos2crate       the same app under its former name, still deployed:
 *                           one nested { name, enabled, enabledOptions } entry
 *                           per plugin, plus the same scalar pre-fills.
 *
 * Two statements of one fact drift. This flattens the nested block and compares
 * it with the flat one, so a change made to only one of them fails here instead
 * of quietly changing what a build does for half the users.
 *
 * DIVERGED below is the exception: keys the two consumers deliberately no
 * longer agree on. They are reported as notes and left out of the comparison,
 * so the rest of the block is still held to the rule.
 *
 * Usage: node check-tool-config.mjs   (also `npm test`)
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CONFIG = "profile-crate/tool-config.json";

/**
 * Reduce a buildOptions block to what it actually says, whichever shape it is
 * written in — the nested one-entry-per-plugin form, or the flat
 * enabledOptionKeys/plugins form. Both appear in this repo, and in either
 * consumer's block, so the comparison below must not care which is which.
 */
function meaning(buildOptions) {
  const nested = Array.isArray(buildOptions.plugins)
    && buildOptions.plugins.length
    && typeof buildOptions.plugins[0] === "object";

  if (nested) {
    const enabledOptionKeys = [];
    const plugins = [];
    for (const entry of buildOptions.plugins) {
      for (const key of entry.enabledOptions || []) {
        if (!enabledOptionKeys.includes(key)) enabledOptionKeys.push(key);
      }
      if (entry.enabled) plugins.push(entry.name);
    }
    const prefills = Object.fromEntries(
      Object.entries(buildOptions).filter(([key]) => key !== "plugins")
    );
    return { enabledOptionKeys, plugins, prefills };
  }

  const enabledOptionKeys = [...(buildOptions.enabledOptionKeys || [])];
  const plugins = [...(buildOptions.plugins || [])];
  const prefills = {};
  for (const [key, value] of Object.entries(buildOptions)) {
    if (key === "enabledOptionKeys" || key === "plugins") continue;
    // A checkbox pre-filled as `"key": true` is the same statement as naming it
    // in `plugins`; count it once, as the latter.
    if (value === true && enabledOptionKeys.includes(key)) {
      if (!plugins.includes(key)) plugins.push(key);
    } else {
      prefills[key] = value;
    }
  }
  return { enabledOptionKeys, plugins, prefills };
}

// Keys the two consumers no longer share, on purpose. collection2crate
// dissolved input modes into ordinary plugin options: it does not read
// inputMode at all any more, and it has a docxInput option chaos2crate has
// never heard of. Removing either from the block that still uses it would
// change what that tool does, so they are excluded from the comparison rather
// than reconciled — everything else still has to match.
const DIVERGED = {
  inputMode: "chaos2crate only — collection2crate picks a builder by option",
  docxInput: "collection2crate only — the option that replaced inputMode: docx",
  // The transcript-grammar plugin and ca-data-prep's grammar choice exist only
  // in collection2crate; chaos2crate would ignore the keys anyway.
  transcriptGrammar: "collection2crate only — parse transcripts with a saved grammar",
  transcriptGrammarEdit: "collection2crate only — the transcript grammar editor",
  transcriptGrammarTest: "collection2crate only — the transcript grammar tester",
};

const withoutDiverged = (m) => ({
  enabledOptionKeys: m.enabledOptionKeys.filter((key) => !(key in DIVERGED)),
  plugins: m.plugins.filter((key) => !(key in DIVERGED)),
  prefills: Object.fromEntries(Object.entries(m.prefills).filter(([key]) => !(key in DIVERGED))),
});

const sorted = (list) => [...list].sort();
const notes = [];
const problems = [];
const profiles = readdirSync(ROOT, { withFileTypes: true })
  .filter((e) => e.isDirectory() && e.name !== "node_modules" && !e.name.startsWith("."))
  .map((e) => e.name)
  .filter((name) => existsSync(path.join(ROOT, name, CONFIG)))
  .sort();

for (const name of profiles) {
  const tools = JSON.parse(readFileSync(path.join(ROOT, name, CONFIG), "utf8")).tools || {};
  const modern = tools.collection2crate?.buildOptions;
  const legacy = tools.chaos2crate?.buildOptions;

  if (!modern) { problems.push(`${name}: no tools.collection2crate.buildOptions`); continue; }
  if (!legacy) { problems.push(`${name}: no tools.chaos2crate.buildOptions`); continue; }

  const full = { a: meaning(modern), b: meaning(legacy) };
  for (const [key, why] of Object.entries(DIVERGED)) {
    const inModern = key in full.a.prefills || full.a.enabledOptionKeys.includes(key);
    const inLegacy = key in full.b.prefills || full.b.enabledOptionKeys.includes(key);
    if (inModern !== inLegacy) notes.push(`${name}: "${key}" — ${why}`);
    else if (inModern) notes.push(`${name}: "${key}" is in both blocks — ${why}`);
  }

  const a = withoutDiverged(full.a);
  const b = withoutDiverged(full.b);

  // Order is not meaningful in either block, so compare as sets.
  if (JSON.stringify(sorted(a.enabledOptionKeys)) !== JSON.stringify(sorted(b.enabledOptionKeys))) {
    problems.push(
      `${name}: the two blocks allow different options\n` +
      `    only in collection2crate: ${a.enabledOptionKeys.filter((k) => !b.enabledOptionKeys.includes(k)).join(", ") || "-"}\n` +
      `    only in chaos2crate:      ${b.enabledOptionKeys.filter((k) => !a.enabledOptionKeys.includes(k)).join(", ") || "-"}`
    );
  }
  if (JSON.stringify(sorted(a.plugins)) !== JSON.stringify(sorted(b.plugins))) {
    problems.push(
      `${name}: the two blocks switch on different options\n` +
      `    only in collection2crate: ${a.plugins.filter((k) => !b.plugins.includes(k)).join(", ") || "-"}\n` +
      `    only in chaos2crate:      ${b.plugins.filter((k) => !a.plugins.includes(k)).join(", ") || "-"}`
    );
  }
  if (JSON.stringify(a.prefills) !== JSON.stringify(b.prefills)) {
    problems.push(
      `${name}: the two blocks pre-fill different values\n` +
      `    collection2crate: ${JSON.stringify(a.prefills)}\n` +
      `    chaos2crate:      ${JSON.stringify(b.prefills)}`
    );
  }
  // An option switched on but not allowed can never appear.
  for (const key of full.a.plugins) {
    if (!full.a.enabledOptionKeys.includes(key)) {
      problems.push(`${name}: "${key}" is switched on but is not in enabledOptionKeys, so it can never be shown`);
    }
  }
}

if (!profiles.length) {
  console.error("check-tool-config: found no profiles to check.");
  process.exit(1);
}
if (problems.length) {
  console.error(`check-tool-config: ${problems.length} problem(s)\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
if (notes.length) {
  console.log(`check-tool-config: ${notes.length} deliberate difference(s), not compared:\n`);
  for (const note of notes) console.log(`  ${note}`);
  console.log("");
}
console.log(
  `check-tool-config: ${profiles.length} profile(s) consistent across both consumers ` +
  `(${profiles.join(", ")})`
);
