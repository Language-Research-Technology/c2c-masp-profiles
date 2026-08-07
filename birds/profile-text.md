---
title: Birds Collection Profile -- EXPERIMENTAL RO-Crate MASP Profile
---
<!--  https://signposting.org/FAIR/  markup --->

<link href="https://benfoley.github.io/masp-profiles/birds/profile-crate/#profile" rel="cite-as" />

<link href="https://www.researchobject.org/ro-crate/1.2-DRAFT/profiles" rel="type"  />
<link href="http://purl.org/dc/terms/Standard" rel="type"  />
<link href="https://schema.org/CreativeWork" rel="type"  />

<link href="ro-crate-metadata.json" rel="describedby" type='application/ld+json; profile="https://w3id.org/ro/crate"' />

<link href="profile-documentation.md" rel="item"  />
<link href="examples/birds-crate/ro-crate-metadata.json" rel="item"  />

* Title: Birds Collection Profile
* Version: 0.1.0
* Permalink: <https://benfoley.github.io/masp-profiles/birds/profile-crate/#profile>
* [Profile Crate `ro-crate-metadata.json`](ro-crate-metadata.json)
* [Example RO-Crate `ro-crate-metadata.json`](examples/birds-crate/ro-crate-metadata.json)

## About this profile

This profile describes the shape of the small language-and-media collections that
[`ro-crate-static-site`](https://github.com/Language-Research-Technology/ro-crate-html-lite) renders as
multi-page static sites. It was written by reading one such crate — the `birds` test collection — and
writing down the rules that crate already follows, so it is deliberately narrow: it is a description of
a working example rather than an aspirational standard.

The model has four moving parts:

* a **Collection** (the Root Data Entity), typed `["Dataset", "RepositoryCollection"]`;
* one or more **Objects**, typed `RepositoryObject`, each describing a single bird — its name, its name
  translated, a sentence in the language, that sentence translated, and its scientific name;
* a **Speaker** for each Object, the person heard in the recordings;
* **Media Files** — one image and up to three audio recordings (the bird's call, its name spoken, and the
  sentence spoken) — each linked back to its Object with `isPartOf`.

An optional Markdown **About Page**, typed `["File", "AboutPage"]`, carries prose about the collection;
the static site generator turns it into the site's About page.

Collections and Objects are joined in both directions: the Collection lists its members with
`pcdm:hasMember` and each Object points back with `pcdm:memberOf`.

### Collection-level metadata

Beyond a name and description, the Collection may carry `datePublished` (a bare year like `2026` is
fine), a `license` URL covering the whole collection, `author` and `publisher`, `inLanguage` for the
language the metadata is written in, `ldac:subjectLanguage` for the language the collection is *about*,
and `ldac:metadataIsPublic`. All are optional; only `name`, `description`, `pcdm:hasMember` and
`conformsTo` are required.

`author` and `publisher` **should** point at a Person or Organization the crate describes, and an
**Organization** class is defined for that purpose — an organisation that appears must have a `name`.
The two properties are deliberately left unconstrained in range, though: a reference to an entity the
crate doesn't describe (a bare ROR identifier, say) is worth flagging, but it is a warning for tooling
to raise, not grounds for failing the whole crate.

`ldac:metadataIsPublic` accepts either a real boolean or the strings `true`/`false`, because a crate
authored in a spreadsheet round-trips the value as text.

### The custom vocabulary

The bird-specific properties are not in Schema.org. The example crate mints them under the ARCP
namespace `arcp://name,custom/terms#` (prefix `custom:`) and defines each one as an `rdf:Property`
contextual entity in the crate itself. This profile keeps that convention: `custom:translation`,
`custom:sentence`, `custom:sentenceTranslation`, `custom:scientificName`, `custom:photographerName`,
`custom:callAudio`, `custom:nameAudio` and `custom:sentenceAudio`.

### Known deviations in the example crate

One thing a future version should tighten, recorded here rather than quietly enforced:

* **`datePublished` is not quite ISO 8601.** The example uses `2016-11-08 01:36:17` — a space where ISO
  8601 wants a `T`. The profile requires the property but does not yet constrain its format.

Two earlier deviations have since been fixed in the example crate: the speaker link was a bare `speaker`
property that resolved to nothing, and speakers were typed `Thing`. Both now follow LDAC —
[`ldac:speaker`](https://w3id.org/ldac/terms#speaker) pointing at a `Person` — and the profile requires
that.

### What validation of the About Page will and will not catch

The About Page is the one optional class here (`sh:minCount: 0`). Class rules count only the entities
that pass every one of their property rules, and that count is then checked against the cardinality — so
an About Page that gets its `encodingFormat` or `about` wrong is simply not counted, the count is zero,
and zero is a legal number of About Pages. Nothing is reported as an error.

The diagnosis is still made, it just does not reach the error list or the exit code: look under
`rules["#Class_AboutPage"]` in the JSON report (`npm run validate:birds:json`) for `property-errors`
naming the property that failed. A malformed About Page and an absent one are indistinguishable to the
error list alone.

This does not apply to the optional *properties* elsewhere in the profile — a bad `image` or
`custom:callAudio` invalidates its Object, and Object is required, so it surfaces as an error.

${rules.all}

${rules.allItemLists}

${rules.examples}

## Provenance

${rules.provenance}
