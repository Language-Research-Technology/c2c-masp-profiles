# masp-profiles

[MASP](https://github.com/Language-Research-Technology/ro-crate-masp) (Machine
Actionable Schema/Profile) crates used by
[resources2crate](https://github.com/benfoley/resources2crate) to drive its
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
- **`structured-doc-data/`** — a collection built from structured Word
  documents (Heading 1/2/3 parsed into Collections/DocumentParts/Chapters),
  e.g. person-centred oral-history or community-website collections. Root
  class `Dataset`. Modelled on
  [corpus-tools-person-centred-collections-docx](https://github.com/Language-Research-Technology/corpus-tools-person-centred-collections-docx)
  / resources2crate's "Structured Word documents" mode.

Each profile folder is:

```
<profile-name>/
  profile-crate/
    ro-crate-metadata.json   # the MASP itself — classes, properties, cardinality
    crate-o-mode.json        # editor hints (rootDataset.type, propertyGroups) —
                              # required for MaspValidator.getRootDatasetTypes()
                              # to resolve correctly — plus a resources2crate-
                              # specific "buildOptions" key (ignored by Crate-O)
                              # listing which build options this profile enables.
```

This follows MASP's own extension pattern: rules that don't belong in the core
schema (property grouping, which classes to show) go in the existing
`crate-o-mode.json` companion file, referenced via the `#hasEditorMode`
`ResourceDescriptor` role — same mechanism the
[LDAC profile](https://github.com/Language-Research-Technology/ro-crate-masp/tree/main/profiles/ldac)
uses. `buildOptions` is the one addition specific to this repo's consumer.

## Verifying a profile

```js
const { MaspValidator } = require("ro-crate-masp/lib/masp-validator.js");
const { ROCrate } = require("ro-crate");

const profileJson = require("./language-resources/profile-crate/ro-crate-metadata.json");
const modeJson = require("./language-resources/profile-crate/crate-o-mode.json");

const crate = new ROCrate(profileJson, { array: true, link: true });
await crate.resolveContext(); // required — see resources2crate's notes on this
const validator = new MaspValidator(crate);
validator.setEditorHints(modeJson); // required for getRootDatasetTypes() to work

console.log(validator.getRootDatasetTypes()); // e.g. ["Dataset", "RepositoryCollection"]
console.log(validator.getClassDefinition("RepositoryCollection").inputs);
```
