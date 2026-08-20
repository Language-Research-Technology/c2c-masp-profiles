# masp-profiles

[MASP](https://github.com/Language-Research-Technology/ro-crate-masp) (Machine
Actionable Schema/Profile) crates used by
[resources2crate](https://github.com/Language-Research-Technology/chaos2crate) to drive its
folder → RO-Crate build workflow: the profile you pick determines which fields
the Describe step asks for and which Build options are shown, and the finished
crate is checked against it with `MaspValidator.validateCrate()`.

## Profiles

- **`language-resources/`** — a collection of digitised language-documentation
  resources (dictionaries, wordlists, recordings, field materials), with
  AUSTLANG-style language metadata, contributing people, and content
  locations. Root class `RepositoryCollection`. Modelled on
  [corpus-tools-dyirbal](https://github.com/Language-Research-Technology/corpus-tools-dyirbal)
  / resources2crate's generic folder mode.
- **`structured-docs/`** — a collection built from structured Word
  documents (Heading 1/2/3 parsed into Collections/DocumentParts/Chapters),
  e.g. person-centred oral-history or community-website collections. Root
  class `Dataset`. Modelled on
  [corpus-tools-person-centred-collections-docx](https://github.com/Language-Research-Technology/corpus-tools-person-centred-collections-docx)
  / resources2crate's "Structured Word documents" mode.
- **`birds/`** — a small language/media collection: a `RepositoryCollection` of
  `RepositoryObject` entries, each one bird with a name, a translation, a
  sentence, an `ldac:speaker`, an image and three audio recordings, plus an
  optional Markdown About page. Root class `RepositoryCollection`. Derived from
  the `test_data/birds` crate in
  [ro-crate-static-site](https://github.com/Language-Research-Technology/ro-crate-html-lite),
  which is kept alongside it at `birds/profile-crate/examples/birds-crate/` and
  validates against it.

Each profile folder is:

```
<profile-name>/
  profile-text.md             # human-authored profile narrative/source text
  profile-crate/
    ro-crate-metadata.json   # the MASP itself — classes, properties, cardinality
    tool-config.json         # editor hints (rootDataset.type, propertyGroups) —
                              # required for MaspValidator.getRootDatasetTypes()
                              # to resolve correctly — plus a resources2crate-
                              # specific "buildOptions" key (ignored by Crate-O)
                              # listing which build options this profile enables.
    index.html               # generated profile documentation site
    profile-documentation.md # generated profile documentation markdown
```

This follows MASP's own extension pattern: rules that don't belong in the core
schema (property grouping, which classes to show) go in the existing
`tool-config.json` companion file, referenced via the `#hasEditorMode`
`ResourceDescriptor` role — same mechanism the
[LDAC profile](https://github.com/Language-Research-Technology/ro-crate-masp/tree/main/profiles/ldac)
uses. `buildOptions` is the one addition specific to this repo's consumer.

## Verifying a profile

```js
const { MaspValidator } = require("ro-crate-masp/lib/masp-validator.js");
const { ROCrate } = require("ro-crate");

const profileJson = require("./language-resources/profile-crate/ro-crate-metadata.json");
const modeJson = require("./language-resources/profile-crate/tool-config.json");

const crate = new ROCrate(profileJson, { array: true, link: true });
await crate.resolveContext(); // required — see resources2crate's notes on this
const validator = new MaspValidator(crate);
validator.setEditorHints(modeJson); // required for getRootDatasetTypes() to work

console.log(validator.getRootDatasetTypes()); // e.g. ["Dataset", "RepositoryCollection"]
console.log(validator.getClassDefinition("RepositoryCollection").inputs);
```

To check a whole crate against a profile's rules, `validate-profile.js` wraps
`MaspValidator.validateCrate()`:

```bash
npm run validate:birds        # pass/fail
npm run validate:birds:json   # full report, including per-entity property errors
```

Note: validating the `birds` profile needs the cyclic-reference fix in
`MaspValidator.validateEntity()` — `pcdm:hasMember`/`pcdm:memberOf` pairs
otherwise recurse until the stack overflows. Until that lands in
`ro-crate-masp` main and the `ro-crate-maps` dependency is reinstalled, these
scripts will report a stack overflow.
