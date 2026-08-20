---
title: Birds Collection Profile -- EXPERIMENTAL RO-Crate MASP Profile
---
<!--  https://signposting.org/FAIR/  markup --->

<link href="https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile" rel="cite-as" />

<link href="https://www.researchobject.org/ro-crate/1.2-DRAFT/profiles" rel="type"  />
<link href="http://purl.org/dc/terms/Standard" rel="type"  />
<link href="https://schema.org/CreativeWork" rel="type"  />

<link href="ro-crate-metadata.json" rel="describedby" type='application/ld+json; profile="https://w3id.org/ro/crate"' />

<link href="profile-documentation.md" rel="item"  />
<link href="examples/birds-crate/ro-crate-metadata.json" rel="item"  />

* Title: Birds Collection Profile
* Version: 0.1.0
* Permalink: <https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile>
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

## Types of entities (specializations of Classes) and expected Properties


### <a id="Class_MetadataDescriptor" title="#Class_MetadataDescriptor"></a> Class: RO-Crate Metadata Descriptor

Every crate MUST contain exactly one RO-Crate Metadata Descriptor: the entity that describes the `ro-crate-metadata.json` file itself and points at the Collection.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
| <a href="#prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id">@id</a> |  | Yes | The metadata descriptor MUST have the identifier `ro-crate-metadata.json`. | <a href="#propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id">Metadata Descriptor Identifier Constraint</a> |  |
| <a href="#prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | MUST reference the Collection (the Root Data Entity). | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |  |
| <a href="#prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo">conformsTo</a> |  | Yes | MUST declare the RO-Crate version the metadata file conforms to. | <a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a> |  |


### <a id="Class_Collection" title="#Class_Collection"></a> Class: RepositoryCollection

The Collection — the Root Data Entity. It groups the bird entries (Objects) that make up the site, and MUST be typed `["Dataset", "RepositoryCollection"]`.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a>, <a href="http://pcdm.org/models#Collection" title="http://pcdm.org/models#Collection" target="_blank" rel="noopener">Collection</a> |
| <a href="#prop_Collection_conformsTo" title="#prop_Collection_conformsTo">conformsTo</a> |  | Yes | The Collection MUST declare conformance to this profile or to the LDAC Collection profile it specialises. | <a href="#propertyValue_Collection_conformsTo" title="#propertyValue_Collection_conformsTo">Collection Profile Constraint</a> |  |
| <a href="#prop_Collection_description" title="#prop_Collection_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Yes | Prose describing the collection, shown on the landing page. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Collection_name" title="#prop_Collection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | A short title for the collection; used as the site title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Collection_hasMember" title="#prop_Collection_hasMember">pcdm:hasMember</a> | <a href="http://pcdm.org/models#hasMember" target="_blank" rel="noopener">http://pcdm.org/models#hasMember</a> | Yes | Links the Collection to each of its bird entries. MUST have at least one member. | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |  |
| <a href="#prop_Collection_author" title="#prop_Collection_author">author</a> | <a href="http://schema.org/author" target="_blank" rel="noopener">http://schema.org/author</a> | No | Who made the collection. SHOULD reference a Person or Organization described in the crate. Deliberately unconstrained in range: a reference to an entity the crate does not describe is reported as a warning by the tooling rather than failing validation here. |  |  |
| <a href="#prop_Collection_datePublished" title="#prop_Collection_datePublished">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | No | When the collection was published. A year on its own (`2026`) is acceptable; the format is not otherwise constrained. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Collection_inLanguage" title="#prop_Collection_inLanguage">inLanguage</a> | <a href="http://schema.org/inLanguage" target="_blank" rel="noopener">http://schema.org/inLanguage</a> | No | The language the collection's metadata and descriptions are written in. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Collection_metadataIsPublic" title="#prop_Collection_metadataIsPublic">ldac:metadataIsPublic</a> | <a href="https://w3id.org/ldac/terms#metadataIsPublic" target="_blank" rel="noopener">https://w3id.org/ldac/terms#metadataIsPublic</a> | No | Whether this collection's metadata may be exposed publicly, independently of access to the content itself. Accepts a real boolean or the strings `true`/`false` — a spreadsheet-authored crate round-trips this value as text. | <a href="http://schema.org/Boolean" title="http://schema.org/Boolean" target="_blank" rel="noopener">Boolean</a>, <a href="#propertyValue_booleanText" title="#propertyValue_booleanText">Boolean-as-text Constraint</a> |  |
| <a href="#prop_Collection_subjectLanguage" title="#prop_Collection_subjectLanguage">ldac:subjectLanguage</a> | <a href="https://w3id.org/ldac/terms#subjectLanguage" target="_blank" rel="noopener">https://w3id.org/ldac/terms#subjectLanguage</a> | No | The language the collection is *about* — the language the bird names and stories are in. LDAC normally expects a Language entity; this profile accepts the plain name the birds crate uses. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Collection_license" title="#prop_Collection_license">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | No | The licence covering the collection as a whole, given as an http(s) URL. Individual entries may override it with their own `license`. | <a href="#propertyValue_licenseUrl" title="#propertyValue_licenseUrl">Licence URL Constraint</a> |  |
| <a href="#prop_Collection_publisher" title="#prop_Collection_publisher">publisher</a> | <a href="http://schema.org/publisher" target="_blank" rel="noopener">http://schema.org/publisher</a> | No | Who published the collection. SHOULD reference a Person or Organization described in the crate — a ROR identifier still deserves its own entity. Unconstrained in range for the same reason as `author`. |  |  |


### <a id="Class_Object" title="#Class_Object"></a> Class: RepositoryObject

An Object — a member of the Collection: one bird entry, gathering the name, story, speaker and media files for a single bird.

At least 1 instances of this type MUST be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://pcdm.org/models#Object" title="http://pcdm.org/models#Object" target="_blank" rel="noopener">Object</a> |
| <a href="#prop_Object_translation" title="#prop_Object_translation">custom:translation</a> |  | Yes | The translation of the entry's name into the language of description. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_datePublished" title="#prop_Object_datePublished">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | Yes | When the entry was published. SHOULD be ISO 8601 (the birds crate uses a space rather than `T` between date and time). | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_description" title="#prop_Object_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Yes | A description of the entry. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_speaker" title="#prop_Object_speaker">ldac:speaker</a> | <a href="https://w3id.org/ldac/terms#speaker" target="_blank" rel="noopener">https://w3id.org/ldac/terms#speaker</a> | Yes | The person heard in this entry's recordings. Uses the LDAC term, so crates MUST bind the `ldac` prefix to `https://w3id.org/ldac/terms#` in their `@context`. | <a href="#Class_Speaker" title="#Class_Speaker">Person</a> |  |
| <a href="#prop_Object_license" title="#prop_Object_license">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | Yes | Each entry MUST carry a licence, given as a URL. It SHOULD also be described by a contextual entity in the crate. | <a href="#propertyValue_licenseUrl" title="#propertyValue_licenseUrl">Licence URL Constraint</a> |  |
| <a href="#prop_Object_name" title="#prop_Object_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The name of the bird in the language of the collection. Used as the entry's heading. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_memberOf" title="#prop_Object_memberOf">pcdm:memberOf</a> | <a href="http://pcdm.org/models#memberOf" target="_blank" rel="noopener">http://pcdm.org/models#memberOf</a> | Yes | Each entry MUST point back at the Collection it belongs to. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |  |
| <a href="#prop_Object_callAudio" title="#prop_Object_callAudio">custom:callAudio</a> |  | No | A recording of the bird's call. | <a href="#Class_File" title="#Class_File">File</a> |  |
| <a href="#prop_Object_nameAudio" title="#prop_Object_nameAudio">custom:nameAudio</a> |  | No | A recording of the bird's name being spoken. | <a href="#Class_File" title="#Class_File">File</a> |  |
| <a href="#prop_Object_photographerName" title="#prop_Object_photographerName">custom:photographerName</a> |  | No | Credit for the image: the name of the photographer. SHOULD be present whenever `image` is. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_scientificName" title="#prop_Object_scientificName">custom:scientificName</a> |  | No | The binomial (Linnaean) name of the bird. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_sentence" title="#prop_Object_sentence">custom:sentence</a> |  | No | A sentence or short story about the bird, in the language of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_sentenceAudio" title="#prop_Object_sentenceAudio">custom:sentenceAudio</a> |  | No | A recording of `custom:sentence` being spoken. | <a href="#Class_File" title="#Class_File">File</a> |  |
| <a href="#prop_Object_sentenceTranslation" title="#prop_Object_sentenceTranslation">custom:sentenceTranslation</a> |  | No | The translation of `custom:sentence`. SHOULD be present whenever `custom:sentence` is. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Object_image" title="#prop_Object_image">image</a> | <a href="http://schema.org/image" target="_blank" rel="noopener">http://schema.org/image</a> | No | A picture of the bird, as a Media File in the crate. | <a href="#Class_File" title="#Class_File">File</a> |  |


### <a id="Class_Speaker" title="#Class_Speaker"></a> Class: Person

The Speaker — the person heard in an Object's recordings, linked with `ldac:speaker`. That term also permits an `Organization`; this profile requires a `Person`.

At least 1 instances of this type MUST be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_Speaker_name" title="#prop_Speaker_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The speaker's name, or a pseudonym. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Speaker_description" title="#prop_Speaker_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | No | A biographical note about the speaker. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_File" title="#Class_File"></a> Class: File

A Media File — an image or audio file in the crate. Media files that belong to a bird entry link back to it with `isPartOf`.

At least 1 instances of this type MUST be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/MediaObject" title="http://schema.org/MediaObject" target="_blank" rel="noopener">MediaObject</a> |
| <a href="#prop_File_isPartOf" title="#prop_File_isPartOf">isPartOf</a> | <a href="http://schema.org/isPartOf" target="_blank" rel="noopener">http://schema.org/isPartOf</a> | No | A Media File that belongs to a bird entry MUST reference that entry, so the static site can group media with its entry. | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |  |


### <a id="Class_AboutPage" title="#Class_AboutPage"></a> Class: AboutPage

The About Page — an optional Markdown file typed `["File", "AboutPage"]` holding prose about the Collection. The static site generator renders it as the site's About page.

Instances of this type SHOULD be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 0 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/MediaObject" title="http://schema.org/MediaObject" target="_blank" rel="noopener">MediaObject</a>, <a href="http://schema.org/AboutPage" title="http://schema.org/AboutPage" target="_blank" rel="noopener">AboutPage</a> |
| <a href="#prop_AboutPage_about" title="#prop_AboutPage_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | The About page MUST say what it is about — the Collection. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |  |
| <a href="#prop_AboutPage_encodingFormat" title="#prop_AboutPage_encodingFormat">encodingFormat</a> | <a href="http://schema.org/encodingFormat" target="_blank" rel="noopener">http://schema.org/encodingFormat</a> | Yes | The About page MUST be Markdown. | <a href="#propertyValue_markdown" title="#propertyValue_markdown">Markdown Media Type Constraint</a> |  |


### <a id="Class_Organization" title="#Class_Organization"></a> Class: Organization

An organisation credited as the collection's author or publisher. Referencing one by identifier alone is not enough — the crate must describe it.

Instances of this type SHOULD be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 0 | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Organization" title="http://schema.org/Organization" target="_blank" rel="noopener">Organization</a> |
| <a href="#prop_Organization_name" title="#prop_Organization_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | Yes | The organisation's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |

## All Properties

### <a id="prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id"></a> Property: @id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id">@id</a> |  | The metadata descriptor MUST have the identifier `ro-crate-metadata.json`. | <a href="#propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id">Metadata Descriptor Identifier Constraint</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | MUST reference the Collection (the Root Data Entity). | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_AboutPage_about" title="#prop_AboutPage_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_AboutPage_about" title="#prop_AboutPage_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | The About page MUST say what it is about — the Collection. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> | <a href="#Class_AboutPage" title="#Class_AboutPage">AboutPage</a> |
### <a id="prop_Collection_author" title="#prop_Collection_author"></a> Property: author

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_author" title="#prop_Collection_author">author</a> | <a href="http://schema.org/author" target="_blank" rel="noopener">http://schema.org/author</a> | Who made the collection. SHOULD reference a Person or Organization described in the crate. Deliberately unconstrained in range: a reference to an entity the crate does not describe is reported as a warning by the tooling rather than failing validation here. |  | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo"></a> Property: conformsTo

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo">conformsTo</a> |  | MUST declare the RO-Crate version the metadata file conforms to. | <a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_Collection_conformsTo" title="#prop_Collection_conformsTo"></a> Property: conformsTo

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_conformsTo" title="#prop_Collection_conformsTo">conformsTo</a> |  | The Collection MUST declare conformance to this profile or to the LDAC Collection profile it specialises. | <a href="#propertyValue_Collection_conformsTo" title="#propertyValue_Collection_conformsTo">Collection Profile Constraint</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_callAudio" title="#prop_Object_callAudio"></a> Property: custom:callAudio

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_callAudio" title="#prop_Object_callAudio">custom:callAudio</a> |  | A recording of the bird's call. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_nameAudio" title="#prop_Object_nameAudio"></a> Property: custom:nameAudio

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_nameAudio" title="#prop_Object_nameAudio">custom:nameAudio</a> |  | A recording of the bird's name being spoken. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_photographerName" title="#prop_Object_photographerName"></a> Property: custom:photographerName

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_photographerName" title="#prop_Object_photographerName">custom:photographerName</a> |  | Credit for the image: the name of the photographer. SHOULD be present whenever `image` is. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_scientificName" title="#prop_Object_scientificName"></a> Property: custom:scientificName

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_scientificName" title="#prop_Object_scientificName">custom:scientificName</a> |  | The binomial (Linnaean) name of the bird. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_sentence" title="#prop_Object_sentence"></a> Property: custom:sentence

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_sentence" title="#prop_Object_sentence">custom:sentence</a> |  | A sentence or short story about the bird, in the language of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_sentenceAudio" title="#prop_Object_sentenceAudio"></a> Property: custom:sentenceAudio

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_sentenceAudio" title="#prop_Object_sentenceAudio">custom:sentenceAudio</a> |  | A recording of `custom:sentence` being spoken. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_sentenceTranslation" title="#prop_Object_sentenceTranslation"></a> Property: custom:sentenceTranslation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_sentenceTranslation" title="#prop_Object_sentenceTranslation">custom:sentenceTranslation</a> |  | The translation of `custom:sentence`. SHOULD be present whenever `custom:sentence` is. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Object_translation" title="#prop_Object_translation"></a> Property: custom:translation

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_translation" title="#prop_Object_translation">custom:translation</a> |  | The translation of the entry's name into the language of description. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_datePublished" title="#prop_Collection_datePublished"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_datePublished" title="#prop_Collection_datePublished">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | When the collection was published. A year on its own (`2026`) is acceptable; the format is not otherwise constrained. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_datePublished" title="#prop_Object_datePublished"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_datePublished" title="#prop_Object_datePublished">datePublished</a> | <a href="http://schema.org/datePublished" target="_blank" rel="noopener">http://schema.org/datePublished</a> | When the entry was published. SHOULD be ISO 8601 (the birds crate uses a space rather than `T` between date and time). | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_description" title="#prop_Collection_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_description" title="#prop_Collection_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | Prose describing the collection, shown on the landing page. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_description" title="#prop_Object_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_description" title="#prop_Object_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | A description of the entry. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Speaker_description" title="#prop_Speaker_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Speaker_description" title="#prop_Speaker_description">description</a> | <a href="http://schema.org/description" target="_blank" rel="noopener">http://schema.org/description</a> | A biographical note about the speaker. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Speaker" title="#Class_Speaker">Person</a> |
### <a id="prop_AboutPage_encodingFormat" title="#prop_AboutPage_encodingFormat"></a> Property: encodingFormat

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_AboutPage_encodingFormat" title="#prop_AboutPage_encodingFormat">encodingFormat</a> | <a href="http://schema.org/encodingFormat" target="_blank" rel="noopener">http://schema.org/encodingFormat</a> | The About page MUST be Markdown. | <a href="#propertyValue_markdown" title="#propertyValue_markdown">Markdown Media Type Constraint</a> | <a href="#Class_AboutPage" title="#Class_AboutPage">AboutPage</a> |
### <a id="prop_Object_image" title="#prop_Object_image"></a> Property: image

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_image" title="#prop_Object_image">image</a> | <a href="http://schema.org/image" target="_blank" rel="noopener">http://schema.org/image</a> | A picture of the bird, as a Media File in the crate. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_inLanguage" title="#prop_Collection_inLanguage"></a> Property: inLanguage

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_inLanguage" title="#prop_Collection_inLanguage">inLanguage</a> | <a href="http://schema.org/inLanguage" target="_blank" rel="noopener">http://schema.org/inLanguage</a> | The language the collection's metadata and descriptions are written in. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_File_isPartOf" title="#prop_File_isPartOf"></a> Property: isPartOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_File_isPartOf" title="#prop_File_isPartOf">isPartOf</a> | <a href="http://schema.org/isPartOf" target="_blank" rel="noopener">http://schema.org/isPartOf</a> | A Media File that belongs to a bird entry MUST reference that entry, so the static site can group media with its entry. | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> | <a href="#Class_File" title="#Class_File">File</a> |
### <a id="prop_Collection_metadataIsPublic" title="#prop_Collection_metadataIsPublic"></a> Property: ldac:metadataIsPublic

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_metadataIsPublic" title="#prop_Collection_metadataIsPublic">ldac:metadataIsPublic</a> | <a href="https://w3id.org/ldac/terms#metadataIsPublic" target="_blank" rel="noopener">https://w3id.org/ldac/terms#metadataIsPublic</a> | Whether this collection's metadata may be exposed publicly, independently of access to the content itself. Accepts a real boolean or the strings `true`/`false` — a spreadsheet-authored crate round-trips this value as text. | <a href="http://schema.org/Boolean" title="http://schema.org/Boolean" target="_blank" rel="noopener">Boolean</a>, <a href="#propertyValue_booleanText" title="#propertyValue_booleanText">Boolean-as-text Constraint</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_speaker" title="#prop_Object_speaker"></a> Property: ldac:speaker

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_speaker" title="#prop_Object_speaker">ldac:speaker</a> | <a href="https://w3id.org/ldac/terms#speaker" target="_blank" rel="noopener">https://w3id.org/ldac/terms#speaker</a> | The person heard in this entry's recordings. Uses the LDAC term, so crates MUST bind the `ldac` prefix to `https://w3id.org/ldac/terms#` in their `@context`. | <a href="#Class_Speaker" title="#Class_Speaker">Person</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_subjectLanguage" title="#prop_Collection_subjectLanguage"></a> Property: ldac:subjectLanguage

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_subjectLanguage" title="#prop_Collection_subjectLanguage">ldac:subjectLanguage</a> | <a href="https://w3id.org/ldac/terms#subjectLanguage" target="_blank" rel="noopener">https://w3id.org/ldac/terms#subjectLanguage</a> | The language the collection is *about* — the language the bird names and stories are in. LDAC normally expects a Language entity; this profile accepts the plain name the birds crate uses. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Collection_license" title="#prop_Collection_license"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_license" title="#prop_Collection_license">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | The licence covering the collection as a whole, given as an http(s) URL. Individual entries may override it with their own `license`. | <a href="#propertyValue_licenseUrl" title="#propertyValue_licenseUrl">Licence URL Constraint</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_license" title="#prop_Object_license"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_license" title="#prop_Object_license">license</a> | <a href="http://schema.org/license" target="_blank" rel="noopener">http://schema.org/license</a> | Each entry MUST carry a licence, given as a URL. It SHOULD also be described by a contextual entity in the crate. | <a href="#propertyValue_licenseUrl" title="#propertyValue_licenseUrl">Licence URL Constraint</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_name" title="#prop_Collection_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_name" title="#prop_Collection_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | A short title for the collection; used as the site title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Organization_name" title="#prop_Organization_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Organization_name" title="#prop_Organization_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The organisation's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Organization" title="#Class_Organization">Organization</a> |
### <a id="prop_Object_name" title="#prop_Object_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_name" title="#prop_Object_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The name of the bird in the language of the collection. Used as the entry's heading. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Speaker_name" title="#prop_Speaker_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Speaker_name" title="#prop_Speaker_name">name</a> | <a href="http://schema.org/name" target="_blank" rel="noopener">http://schema.org/name</a> | The speaker's name, or a pseudonym. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Speaker" title="#Class_Speaker">Person</a> |
### <a id="prop_Collection_hasMember" title="#prop_Collection_hasMember"></a> Property: pcdm:hasMember

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_hasMember" title="#prop_Collection_hasMember">pcdm:hasMember</a> | <a href="http://pcdm.org/models#hasMember" target="_blank" rel="noopener">http://pcdm.org/models#hasMember</a> | Links the Collection to each of its bird entries. MUST have at least one member. | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_Object_memberOf" title="#prop_Object_memberOf"></a> Property: pcdm:memberOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Object_memberOf" title="#prop_Object_memberOf">pcdm:memberOf</a> | <a href="http://pcdm.org/models#memberOf" target="_blank" rel="noopener">http://pcdm.org/models#memberOf</a> | Each entry MUST point back at the Collection it belongs to. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> | <a href="#Class_Object" title="#Class_Object">RepositoryObject</a> |
### <a id="prop_Collection_publisher" title="#prop_Collection_publisher"></a> Property: publisher

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_publisher" title="#prop_Collection_publisher">publisher</a> | <a href="http://schema.org/publisher" target="_blank" rel="noopener">http://schema.org/publisher</a> | Who published the collection. SHOULD reference a Person or Organization described in the crate — a ROR identifier still deserves its own entity. Unconstrained in range for the same reason as `author`. |  | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
## Property Values

### <a id="propertyValue_booleanText" title="#propertyValue_booleanText"></a> Property Value: Boolean-as-text Constraint

ID: #propertyValue_booleanText

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_booleanText" title="#propertyValue_booleanText">Boolean-as-text Constraint</a></td><td>The strings `true` and `false`, as written by spreadsheet round-tripping. Carries no minimum count: it widens what the property accepts rather than requiring every value to match it.</td><td><div><strong>Regex Pattern</strong><pre><code>/^(true|false)$/</code></pre></div></td><td>0</td><td>N/A</td></tr>
</tbody></table>

### <a id="propertyValue_Collection_conformsTo" title="#propertyValue_Collection_conformsTo"></a> Property Value: Collection Profile Constraint

ID: #propertyValue_Collection_conformsTo

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_Collection_conformsTo" title="#propertyValue_Collection_conformsTo">Collection Profile Constraint</a></td><td>The Collection must declare conformance to this profile or to the LDAC Collection profile.</td><td><pre><code>{
  &quot;@id&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile&quot;,
  &quot;@type&quot;: [
    &quot;CreativeWork&quot;,
    &quot;Profile&quot;
  ],
  &quot;name&quot;: &quot;Birds Collection Profile&quot;,
  &quot;url&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/&quot;
}</code></pre><hr /><pre><code>{
  &quot;@id&quot;: &quot;https://w3id.org/ldac/profile#Collection&quot;,
  &quot;@type&quot;: [
    &quot;CreativeWork&quot;,
    &quot;Profile&quot;
  ],
  &quot;name&quot;: &quot;LDAC Collection Profile&quot;,
  &quot;description&quot;: &quot;The Language Data Commons collection profile, of which this profile is a (much smaller) specialisation.&quot;
}</code></pre></td><td>1</td><td>N/A</td></tr>
</tbody></table>

### <a id="propertyValue_licenseUrl" title="#propertyValue_licenseUrl"></a> Property Value: Licence URL Constraint

ID: #propertyValue_licenseUrl

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_licenseUrl" title="#propertyValue_licenseUrl">Licence URL Constraint</a></td><td>A licence must be given as an http(s) URL.</td><td><div><strong>Regex Pattern</strong><pre><code>/^https?:\/\//</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>

### <a id="propertyValue_markdown" title="#propertyValue_markdown"></a> Property Value: Markdown Media Type Constraint

ID: #propertyValue_markdown

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_markdown" title="#propertyValue_markdown">Markdown Media Type Constraint</a></td><td>The About page's `encodingFormat` must be `text/markdown`.</td><td><div><strong>Literal String</strong><pre><code>text/markdown</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>

### <a id="propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id"></a> Property Value: Metadata Descriptor Identifier Constraint

ID: #propertyValue_MetadataDescriptor_id

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id">Metadata Descriptor Identifier Constraint</a></td><td>The metadata descriptor's identifier must be `ro-crate-metadata.json`.</td><td><div><strong>Literal String</strong><pre><code>ro-crate-metadata.json</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>

### <a id="propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion"></a> Property Value: RO-Crate Version Constraint

ID: #propertyValue_roCrateVersion

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a></td><td>The metadata descriptor must declare conformance to RO-Crate 1.2.</td><td><pre><code>{
  &quot;@id&quot;: &quot;https://w3id.org/ro/crate/1.2&quot;
}</code></pre></td><td>1</td><td>1</td></tr>
</tbody></table>



## Item Lists

### <a id="itemList_collectionProfiles"></a>Item List: Collection Profiles

Profile identifiers that a conforming Collection may declare with `conformsTo`.

<table>
<thead><tr><th>Name</th><th>@id</th><th>Entity</th></tr></thead>
<tbody>
<tr><td>Birds Collection Profile</td><td><a id="profile" href="https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile" target="_blank" rel="noopener">https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile&quot;,
  &quot;@type&quot;: [
    &quot;CreativeWork&quot;,
    &quot;Profile&quot;
  ],
  &quot;name&quot;: &quot;Birds Collection Profile&quot;,
  &quot;url&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/&quot;
}</code></pre></td></tr>
<tr><td>LDAC Collection Profile</td><td><a id="Collection" href="https://w3id.org/ldac/profile#Collection" target="_blank" rel="noopener">https://w3id.org/ldac/profile#Collection</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;https://w3id.org/ldac/profile#Collection&quot;,
  &quot;@type&quot;: [
    &quot;CreativeWork&quot;,
    &quot;Profile&quot;
  ],
  &quot;name&quot;: &quot;LDAC Collection Profile&quot;,
  &quot;description&quot;: &quot;The Language Data Commons collection profile, of which this profile is a (much smaller) specialisation.&quot;
}</code></pre></td></tr>
</tbody></table>

### <a id="conformanceIndicators"></a>Item List: Supported conformsTo identifiers

Canonical identifiers that indicate conformance to this profile.

<table>
<thead><tr><th>Name</th><th>@id</th><th>Entity</th></tr></thead>
<tbody>
<tr><td>Birds Collection Profile</td><td><a id="profile" href="https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile" target="_blank" rel="noopener">https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile</a></td><td><pre><code>{
  &quot;@id&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/#profile&quot;,
  &quot;@type&quot;: [
    &quot;CreativeWork&quot;,
    &quot;Profile&quot;
  ],
  &quot;name&quot;: &quot;Birds Collection Profile&quot;,
  &quot;url&quot;: &quot;https://language-research-technology.github.io/masp-profiles/birds/profile-crate/&quot;
}</code></pre></td></tr>
</tbody></table>



<a id="hasExampleCrate"></a>

## Example-1: Example: the Birds crate


### <a id="examples%2Fbirds-crate%2Fro-crate-metadata.json"></a> Artifact: Birds example crate metadata

<pre>
 {
  "@id": "examples/birds-crate/ro-crate-metadata.json",
  "@type": "File",
  "name": "Birds example crate metadata",
  "description": "A copy of the RO-Crate metadata from the `birds` test collection in the ro-crate-static-site repository. This crate is the source from which this profile was derived, and it validates against it.",
  "encodingFormat": [
    {
      "@id": "https://www.nationalarchives.gov.uk/PRONOM/fmt/817"
    },
    "application/ld+json"
  ]
}
</pre>



## Provenance

This document was compiled using [generate-masp-docs.js](https://github.com/Language-Research-Technology/masp-profiles/blob/main/generate-masp-docs.js), based on [../../birds/profile-text.md](https://github.com/Language-Research-Technology/masp-profiles/blob/main/../../birds/profile-text.md) using a MASP Schema defined in [../../birds/profile-crate/ro-crate-metadata.json](https://github.com/Language-Research-Technology/masp-profiles/blob/main/../../birds/profile-crate/ro-crate-metadata.json).
