# c2c-masp-profiles

[MASP](https://github.com/Language-Research-Technology/ro-crate-masp) (Machine
Actionable Schema/Profile) crates used by
[chaos2crate](https://github.com/Language-Research-Technology/chaos2crate) to drive its
folder → RO-Crate build workflow: the profile you pick determines which fields
the Describe step asks for and which Build options are shown, and the finished
crate is checked against it with `MaspValidator.validateCrate()`.

## Profiles

- **`language-resources/`** — a collection of digitised language-documentation
  resources (dictionaries, wordlists, recordings, field materials), with
  AUSTLANG-style language metadata, contributing people, and content
  locations. Root class `RepositoryCollection`. Modelled on
  [corpus-tools-dyirbal](https://github.com/Language-Research-Technology/corpus-tools-dyirbal)
  / chaos2crate's generic folder mode.
- **`ldac/`** — the full Language Data Commons (LDAC) profile: the
  comprehensive LDaCA vocabulary (About, Access, Related People/Orgs/Works,
  Structure, Provenance, Language, Space & Time, Software & Hardware property
  groups) rather than a subset tailored to one workflow — see
  `ldac/profile-text.md` for the specification this implements. Root class
  `RepositoryCollection`. Shares `language-resources`' `conformsTo`
  (`https://w3id.org/ldac/profile#Collection`) since both genuinely implement
  that same external profile: this is the reference/complete implementation,
  `language-resources` the version pared down to what chaos2crate's generic
  folder mode actually writes (plus its own AUSTLANG/contributor/content-location
  additions).
- **`structured-docs/`** — a collection built from structured Word
  documents (Heading 1/2/3 parsed into Collections/DocumentParts/Chapters),
  e.g. person-centred oral-history or community-website collections. Root
  class `Dataset`. Modelled on
  [corpus-tools-person-centred-collections-docx](https://github.com/Language-Research-Technology/corpus-tools-person-centred-collections-docx)
  / chaos2crate's "Structured Word documents" mode.
- **`birds/`** — a small language/media collection: a `RepositoryCollection` of
  `RepositoryObject` entries, each one bird with a name, a translation, a
  sentence, an `ldac:speaker`, an image and three audio recordings, plus an
  optional Markdown About page. Root class `RepositoryCollection`. Derived from
  the `test_data/birds` crate in
  [ro-crate-static-site](https://github.com/Language-Research-Technology/ro-crate-html-lite),
  which is kept alongside it at `birds/profile-crate/examples/birds-crate/` and
  validates against it.
- **`chordpro-songs/`** — a songbook harvested from ChordPro song charts
  (`.cho`/`.pro`) and Markdown setlists (`.setlist.md`): each song is a
  `MusicComposition` carrying its own verbatim source plus `musicalKey`/
  `composer`/`performer`/`subtitle`; each setlist (and each `#`-delineated set
  within one) is a `MusicPlaylist`; each setlist entry is its own lightweight
  `MusicComposition` linked to the song it performs via `specializationOf`.
  Root class `Dataset`. Trimmed from `ro-crate-masp`'s own bundled
  schema.org profile down to only the classes/properties chaos2crate's
  `chordpro-input` plugin actually writes (see that plugin's own `SPEC.md`,
  §5–§7, for the full model) — kept alongside a real, built example at
  `chordpro-songs/profile-crate/examples/chordpro-crate/` and validates
  against it, including a richer example with ambiguous/unresolved setlist
  entries and nested sets at
  `chordpro-songs/profile-crate/examples/chordpro-crate-large/`.

Each profile folder is:

```
<profile-name>/
  profile-text.md             # human-authored profile narrative/source text
  profile-crate/
    ro-crate-metadata.json   # the MASP itself — classes, properties, cardinality
    tool-config.json         # editor hints (rootDataset.type, propertyGroups) —
                              # required for MaspValidator.getRootDatasetTypes()
                              # to resolve correctly — plus a "tools" block keyed
                              # by consumer (ignored by Crate-O) listing which
                              # build options this profile enables for that tool.
                              # Two consumers are carried: collection2crate and
                              # chaos2crate, the same app under its former name.
    index.html               # generated profile documentation site
    profile-documentation.md # generated profile documentation markdown
```

This follows MASP's own extension pattern: rules that don't belong in the core
schema (property grouping, which classes to show) go in the existing
`tool-config.json` companion file, referenced via the `#hasEditorMode`
`ResourceDescriptor` role — same mechanism the
[LDAC profile](https://github.com/Language-Research-Technology/ro-crate-masp/tree/main/profiles/ldac)
uses. `buildOptions` is the one addition specific to this repo's consumers,
namespaced under `tools` so other consumers of the same file can carry their own
config alongside it without colliding.

### Two consumers, two shapes

The app was renamed from **chaos2crate** to **collection2crate**, and the two
read the same information in different shapes, neither understanding the other.
So each profile states its build options twice:

| Block | Read by | Shape |
|---|---|---|
| `tools.collection2crate.buildOptions` | collection2crate | `enabledOptionKeys` (the allow-list) + `plugins` (the subset that starts switched on), with scalar pre-fills such as `inputMode` alongside |
| `tools.chaos2crate.buildOptions` | chaos2crate, where still deployed | one `{ name, enabled, enabledOptions }` entry per plugin, with the same pre-fills |

In both, an option is **hidden unless the profile names it, and hidden means
off** — so a block that omits an option is not neutral about it, it switches the
plugin behind it off.

Two statements of one fact drift, so keep them in step and let `npm test` prove
it:

```bash
npm test   # check-tool-config.mjs — flattens both blocks and compares them
```

It fails, naming the profile and the difference, if the blocks stop agreeing on
which options are allowed, which start on, or what is pre-filled. Drop the
`chaos2crate` block (and its half of the check) once nothing reads it.

## Verifying a profile

```js
const { MaspValidator } = require("ro-crate-masp/lib/masp-validator.js");
const { ROCrate } = require("ro-crate");

const profileJson = require("./language-resources/profile-crate/ro-crate-metadata.json");
const modeJson = require("./language-resources/profile-crate/tool-config.json");

const crate = new ROCrate(profileJson, { array: true, link: true });
await crate.resolveContext(); // required — see chaos2crate's notes on this
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
