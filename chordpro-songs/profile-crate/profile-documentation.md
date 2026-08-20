# ChordPro Songs & Setlists

The profile specifies metadata for a songbook harvested from a folder of ChordPro song
charts (`.cho`/`.pro`) and Markdown setlists (`.setlist.md`).

A song file is described as a `MusicComposition` with a copy of its ChordPro source in a `text` property.

Setlists are described using `MusicPlaylist`, to list the songs for a particular event, optionally divided in sets, via a nested `MusicPlaylist`. MusicPlaylist enties may also have parts that are `MusicComposition` entries which are specializations of a song, referenced via `specializationOf`, which may have their own key and capo information



## Types of entities (specializations of Classes) and expected Properties


### <a id="https%3A%2F%2Fschema.org%2FThing" title="https://schema.org/Thing"></a> Class: Thing

The most generic type of item.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="https%3A%2F%2Fschema.org%2FCreativeWork" title="https://schema.org/CreativeWork"></a> Class: CreativeWork

The most generic kind of creative work, including books, movies, photographs, software programs, etc.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset"></a> Class: Dataset

A body of structured information describing some topic(s) of interest.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#https%3A%2F%2Fschema.org%2FdatePublished" title="https://schema.org/datePublished">datePublished</a> |  | No | Date of first publication or broadcast. For example the date a [[CreativeWork]] was broadcast or a [[Certification]] was issued. | <a href="#https%3A%2F%2Fschema.org%2FDate" title="https://schema.org/Date">Date</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2Fdescription" title="https://schema.org/description">description</a> |  | No | A description of the item. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2FhasPart" title="https://schema.org/hasPart">hasPart</a> |  | No | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a>, <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a>, <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2Flicense" title="https://schema.org/license">license</a> |  | No | A license document that applies to this content, typically indicated by URL. | <a href="#https%3A%2F%2Fschema.org%2FURL" title="https://schema.org/URL">URL</a> |  |
| <a href="#name-Dataset" title="#name-Dataset">name</a> |  | No | The songbook's own title. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |


### <a id="https%3A%2F%2Fschema.org%2FMusicComposition" title="https://schema.org/MusicComposition"></a> Class: MusicComposition

A musical composition.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist"></a> Class: MusicPlaylist

A collection of music tracks in playlist form.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#https%3A%2F%2Fschema.org%2FhasPart" title="https://schema.org/hasPart">hasPart</a> |  | No | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a>, <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a>, <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> |  |
| <a href="#name-MusicPlaylist" title="#name-MusicPlaylist">name</a> |  | No | A top-level setlist's own title (e.g. "Friday Gig"), or — on a nested "#" set — that set's own heading text (e.g. "Set 1"); MusicPlaylist covers both (SPEC.md §6). | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#text-MusicPlaylist" title="#text-MusicPlaylist">text</a> |  | No | A setlist's or a "#" set's own freeform note, written as Markdown and rendered as such — optional; the freeform text found between a "#" heading and its first entry, or authored anywhere for a top-level setlist. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |


### <a id="https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text"></a> Class: Text

Data type: Text.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="https%3A%2F%2Fschema.org%2FURL" title="https://schema.org/URL"></a> Class: URL

Data type: URL.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="https%3A%2F%2Fschema.org%2FDate" title="https://schema.org/Date"></a> Class: Date

A date value in [ISO 8601 date format](http://en.wikipedia.org/wiki/ISO_8601).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
*No properties defined for this class*



### <a id="MusicCompositionSong" title="#MusicCompositionSong"></a> Class: MusicCompositionSong

A canonical song, harvested from one ChordPro chart file — chordpro-input's own specialization of MusicComposition, never carrying specializationOf.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="#https%3A%2F%2Fschema.org%2FMusicComposition" title="https://schema.org/MusicComposition">MusicComposition</a> |
| <a href="#https%3A%2F%2Fschema.org%2Fcomposer" title="https://schema.org/composer">composer</a> |  | No | The person or organization who wrote a composition, or who is the composer of a work performed at some event. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2FmusicalKey" title="https://schema.org/musicalKey">musicalKey</a> |  | No | The key, mode, or scale this composition uses. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#name-MusicCompositionSong" title="#name-MusicCompositionSong">name</a> |  | No | A canonical song's own title. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2Fperformer" title="https://schema.org/performer">performer</a> |  | No | A performer at the event&#x2014;for example, a presenter, musician, musical group or actor. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#https%3A%2F%2Fschema.org%2Fsubtitle" title="https://schema.org/subtitle">subtitle</a> |  | No | A secondary title for the item — chordpro-input's own use: a song's {subtitle}/{st} ChordPro directive. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#text-MusicCompositionSong" title="#text-MusicCompositionSong">text</a> |  | No | The song's own verbatim ChordPro source (directives and all) — the one place its full text lives; every setlist entry that performs it points back here rather than carrying its own copy. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |


### <a id="MusicCompositionSongProxy" title="#MusicCompositionSongProxy"></a> Class: MusicCompositionSongProxy

One setlist entry — a lightweight performance-slot proxy, not a second copy of the song — chordpro-input's own specialization of MusicComposition, linked to the song it performs via specializationOf.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="#https%3A%2F%2Fschema.org%2FMusicComposition" title="https://schema.org/MusicComposition">MusicComposition</a> |
| <a href="#name-MusicCompositionSongProxy" title="#name-MusicCompositionSongProxy">name</a> |  | No | The raw heading text for this setlist entry, taken verbatim from the setlist file — may be a fuzzy or approximate match to the song it specializes, not necessarily identical to that song's own name. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |
| <a href="#specializationOf" title="http://www.w3.org/ns/prov#specializationOf">specializationOf</a> |  | No | chordpro-input's own use: links a setlist-entry MusicCompositionSongProxy to the canonical MusicCompositionSong it performs. | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |  |
| <a href="#text-MusicCompositionSongProxy" title="#text-MusicCompositionSongProxy">text</a> |  | No | This entry's own short performance note, written as Markdown and rendered as such — optional; absent on most entries. Never the song's own text, which lives on the MusicCompositionSong it specializes instead. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> |  |

## All Properties

### <a id="https%3A%2F%2Fschema.org%2Fcomposer" title="https://schema.org/composer"></a> Property: composer

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2Fcomposer" title="https://schema.org/composer">composer</a> |  | The person or organization who wrote a composition, or who is the composer of a work performed at some event. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="https%3A%2F%2Fschema.org%2FdatePublished" title="https://schema.org/datePublished"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2FdatePublished" title="https://schema.org/datePublished">datePublished</a> |  | Date of first publication or broadcast. For example the date a [[CreativeWork]] was broadcast or a [[Certification]] was issued. | <a href="#https%3A%2F%2Fschema.org%2FDate" title="https://schema.org/Date">Date</a> | <a href="#https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset">Dataset</a> |
### <a id="https%3A%2F%2Fschema.org%2Fdescription" title="https://schema.org/description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2Fdescription" title="https://schema.org/description">description</a> |  | A description of the item. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset">Dataset</a> |
### <a id="https%3A%2F%2Fschema.org%2FhasPart" title="https://schema.org/hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2FhasPart" title="https://schema.org/hasPart">hasPart</a> |  | Indicates an item or CreativeWork that is part of this item, or CreativeWork (in some sense). | <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a>, <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a>, <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> | <a href="#https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset">Dataset</a>, <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a> |
### <a id="https%3A%2F%2Fschema.org%2Flicense" title="https://schema.org/license"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2Flicense" title="https://schema.org/license">license</a> |  | A license document that applies to this content, typically indicated by URL. | <a href="#https%3A%2F%2Fschema.org%2FURL" title="https://schema.org/URL">URL</a> | <a href="#https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset">Dataset</a> |
### <a id="https%3A%2F%2Fschema.org%2FmusicalKey" title="https://schema.org/musicalKey"></a> Property: musicalKey

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2FmusicalKey" title="https://schema.org/musicalKey">musicalKey</a> |  | The key, mode, or scale this composition uses. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="name-Dataset" title="#name-Dataset"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#name-Dataset" title="#name-Dataset">name</a> |  | The songbook's own title. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#https%3A%2F%2Fschema.org%2FDataset" title="https://schema.org/Dataset">Dataset</a> |
### <a id="name-MusicPlaylist" title="#name-MusicPlaylist"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#name-MusicPlaylist" title="#name-MusicPlaylist">name</a> |  | A top-level setlist's own title (e.g. "Friday Gig"), or — on a nested "#" set — that set's own heading text (e.g. "Set 1"); MusicPlaylist covers both (SPEC.md §6). | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a> |
### <a id="name-MusicCompositionSong" title="#name-MusicCompositionSong"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#name-MusicCompositionSong" title="#name-MusicCompositionSong">name</a> |  | A canonical song's own title. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="name-MusicCompositionSongProxy" title="#name-MusicCompositionSongProxy"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#name-MusicCompositionSongProxy" title="#name-MusicCompositionSongProxy">name</a> |  | The raw heading text for this setlist entry, taken verbatim from the setlist file — may be a fuzzy or approximate match to the song it specializes, not necessarily identical to that song's own name. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> |
### <a id="https%3A%2F%2Fschema.org%2Fperformer" title="https://schema.org/performer"></a> Property: performer

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2Fperformer" title="https://schema.org/performer">performer</a> |  | A performer at the event&#x2014;for example, a presenter, musician, musical group or actor. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="specializationOf" title="http://www.w3.org/ns/prov#specializationOf"></a> Property: specializationOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#specializationOf" title="http://www.w3.org/ns/prov#specializationOf">specializationOf</a> |  | chordpro-input's own use: links a setlist-entry MusicCompositionSongProxy to the canonical MusicCompositionSong it performs. | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> | <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> |
### <a id="https%3A%2F%2Fschema.org%2Fsubtitle" title="https://schema.org/subtitle"></a> Property: subtitle

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#https%3A%2F%2Fschema.org%2Fsubtitle" title="https://schema.org/subtitle">subtitle</a> |  | A secondary title for the item — chordpro-input's own use: a song's {subtitle}/{st} ChordPro directive. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="text-MusicCompositionSong" title="#text-MusicCompositionSong"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#text-MusicCompositionSong" title="#text-MusicCompositionSong">text</a> |  | The song's own verbatim ChordPro source (directives and all) — the one place its full text lives; every setlist entry that performs it points back here rather than carrying its own copy. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSong" title="#MusicCompositionSong">MusicCompositionSong</a> |
### <a id="text-MusicCompositionSongProxy" title="#text-MusicCompositionSongProxy"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#text-MusicCompositionSongProxy" title="#text-MusicCompositionSongProxy">text</a> |  | This entry's own short performance note, written as Markdown and rendered as such — optional; absent on most entries. Never the song's own text, which lives on the MusicCompositionSong it specializes instead. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#MusicCompositionSongProxy" title="#MusicCompositionSongProxy">MusicCompositionSongProxy</a> |
### <a id="text-MusicPlaylist" title="#text-MusicPlaylist"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#text-MusicPlaylist" title="#text-MusicPlaylist">text</a> |  | A setlist's or a "#" set's own freeform note, written as Markdown and rendered as such — optional; the freeform text found between a "#" heading and its first entry, or authored anywhere for a top-level setlist. | <a href="#https%3A%2F%2Fschema.org%2FText" title="https://schema.org/Text">Text</a> | <a href="#https%3A%2F%2Fschema.org%2FMusicPlaylist" title="https://schema.org/MusicPlaylist">MusicPlaylist</a> |
## Property Values

No PropertyValue entities are defined.


