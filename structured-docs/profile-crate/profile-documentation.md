# Structured Docs

The profile specifies metadata and workflows used in creating person-centred collections.

Includes a mode file for specifying configuration for the Resources2Crate tool (defined in crate-o-mode.json). Using this config, Resources2Crate will parse document contents and package those contents in [bibo:DocumentPart](http://purl.org/ontology/bibo/DocumentPart).

Headings in the source documents become a nesting structure: Heading 1 becomes a
[bibo:DocumentPart](http://purl.org/ontology/bibo/DocumentPart) and Heading 2/3
become [bibo:Chapter](http://purl.org/ontology/bibo/Chapter) entities beneath it.
Containment runs downward through `hasPart` — a RepositoryCollection holds DocumentParts, a
DocumentPart holds Chapters, and Chapters may nest within one another. A Chapter
is always *part of* the document above it, so it links back up with `isPartOf`
rather than holding a DocumentPart of its own. Images and audio found in a
document are attached to the enclosing Chapter or DocumentPart as `ImageObject`
and `AudioObject` entities, each pointing at the `File` copied into the crate.

## Types of entities (specializations of Classes) and expected Properties


### <a id="Class_MetadataDescriptor" title="#Class_MetadataDescriptor"></a> Class: RO-Crate Metadata Descriptor

Every crate MUST contain exactly one RO-Crate Metadata Descriptor: the entity that describes the `ro-crate-metadata.json` file itself and points at the root Dataset.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/CreativeWork" title="http://schema.org/CreativeWork" target="_blank" rel="noopener">CreativeWork</a> |
| <a href="#prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id">@id</a> |  | Yes | The metadata descriptor MUST have the identifier `ro-crate-metadata.json`. | <a href="#propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id">Metadata Descriptor Identifier Constraint</a> |  |
| <a href="#prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | Yes | MUST reference the root Dataset (the Root Data Entity). | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |  |
| <a href="#prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo">conformsTo</a> |  | Yes | MUST declare the RO-Crate version the metadata file conforms to. | <a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a> |  |


### <a id="Class_Dataset" title="#Class_Dataset"></a> Class: Dataset

The root dataset: a collection of structured-document collections.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_Dataset_datePublished" title="#prop_Dataset_datePublished">datePublished</a> |  | Yes | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_Dataset_description" title="#prop_Dataset_description">description</a> |  | Yes | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Dataset_hasPart" title="#prop_Dataset_hasPart">hasPart</a> |  | Yes | The Collections in this dataset — one per top-level folder of structured .docx documents. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |  |
| <a href="#prop_Dataset_name" title="#prop_Dataset_name">name</a> |  | Yes | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Dataset_creator" title="#prop_Dataset_creator">creator</a> |  | No | Person(s) who compiled/created this collection. | <a href="#Class_Person" title="#Class_Person">Person</a> |  |
| <a href="#prop_Dataset_license" title="#prop_Dataset_license">license</a> |  | No | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> |  |


### <a id="Class_Collection" title="#Class_Collection"></a> Class: RepositoryCollection

One top-level folder of structured .docx documents (shown as a menu entry in the generated site). MUST be typed `RepositoryCollection`.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://pcdm.org/models#Collection" title="http://pcdm.org/models#Collection" target="_blank" rel="noopener">Collection</a> |
| <a href="#prop_Collection_hasPart" title="#prop_Collection_hasPart">hasPart</a> |  | Yes | The documents in this collection — one per structured .docx file. | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> |  |
| <a href="#prop_Collection_name" title="#prop_Collection_name">name</a> |  | Yes | Menu label — see the collection-name mapping builder. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_DocumentPart" title="#Class_DocumentPart"></a> Class: bibo:DocumentPart

One structured .docx document within a Collection (a Heading 1 section).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://purl.org/ontology/bibo/DocumentPart" title="http://purl.org/ontology/bibo/DocumentPart" target="_blank" rel="noopener">DocumentPart</a> |
| <a href="#prop_DocumentPart_name" title="#prop_DocumentPart_name">name</a> |  | Yes | Document title, taken from the Heading 1 text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_DocumentPart_hasPart" title="#prop_DocumentPart_hasPart">hasPart</a> |  | No | The Chapters and media entities nested inside this document. | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a>, <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> |  |
| <a href="#prop_DocumentPart_position" title="#prop_DocumentPart_position">position</a> |  | No | Ordering of this document within its Collection, as it appeared in the source. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> |  |
| <a href="#prop_DocumentPart_text" title="#prop_DocumentPart_text">text</a> |  | No | The document's parsed body content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_Chapter" title="#Class_Chapter"></a> Class: bibo:Chapter

A section within a document, parsed from a Heading 2 or Heading 3. Chapters may nest.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://purl.org/ontology/bibo/Chapter" title="http://purl.org/ontology/bibo/Chapter" target="_blank" rel="noopener">Chapter</a> |
| <a href="#prop_Chapter_name" title="#prop_Chapter_name">name</a> |  | Yes | Chapter title, taken from the heading text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_Chapter_hasPart" title="#prop_Chapter_hasPart">hasPart</a> |  | No | Nested Chapters, table rows and media entities belonging to this chapter. | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a>, <a href="#Class_TableRow" title="#Class_TableRow">TableRow</a>, <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> |  |
| <a href="#prop_Chapter_isPartOf" title="#prop_Chapter_isPartOf">isPartOf</a> |  | No | The DocumentPart, or enclosing Chapter, that this chapter belongs to. Containment runs downward through `hasPart`; this is the inverse link back up. | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a>, <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |  |
| <a href="#prop_Chapter_position" title="#prop_Chapter_position">position</a> |  | No | Ordering of this chapter within its parent, as it appeared in the source. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> |  |
| <a href="#prop_Chapter_text" title="#prop_Chapter_text">text</a> |  | No | The chapter's parsed body content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_TableRow" title="#Class_TableRow"></a> Class: custom:TableRow

One row of a table inside a Chapter. A content block rather than a document — it carries text and media but has no heading, so it is not a bibo:DocumentPart.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | custom:TableRow |
| <a href="#prop_TableRow_hasPart" title="#prop_TableRow_hasPart">hasPart</a> |  | No | Media entities appearing in this row. | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> |  |
| <a href="#prop_TableRow_position" title="#prop_TableRow_position">position</a> |  | No | Ordering of this row within its table. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> |  |
| <a href="#prop_TableRow_text" title="#prop_TableRow_text">text</a> |  | No | The row's content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_ImageObject" title="#Class_ImageObject"></a> Class: ImageObject

An image placed in a document, with its caption and photo credit. Typed `["CreativeWork", "ImageObject"]` in built crates.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/ImageObject" title="http://schema.org/ImageObject" target="_blank" rel="noopener">ImageObject</a> |
| <a href="#prop_ImageObject_caption" title="#prop_ImageObject_caption">caption</a> |  | No | Caption text shown beneath the image. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_ImageObject_creditText" title="#prop_ImageObject_creditText">creditText</a> |  | No | Photo credit shown beneath the caption. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_ImageObject_imageReference" title="#prop_ImageObject_imageReference">custom:imageReference</a> |  | No | The image filename as written in the source document, kept when the referenced file could not be resolved to a File entity. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_ImageObject_hasPart" title="#prop_ImageObject_hasPart">hasPart</a> |  | No | The image File, linked structurally as well as through `image`. | <a href="#Class_File" title="#Class_File">File</a> |  |
| <a href="#prop_ImageObject_image" title="#prop_ImageObject_image">image</a> |  | No | The image File this entity displays. | <a href="#Class_File" title="#Class_File">File</a> |  |


### <a id="Class_AudioObject" title="#Class_AudioObject"></a> Class: AudioObject

An audio recording placed in a document. Typed `["CreativeWork", "AudioObject"]` in built crates.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/AudioObject" title="http://schema.org/AudioObject" target="_blank" rel="noopener">AudioObject</a> |
| <a href="#prop_AudioObject_audio" title="#prop_AudioObject_audio">audio</a> |  | No | The audio File this entity plays. | <a href="#Class_File" title="#Class_File">File</a> |  |


### <a id="Class_File" title="#Class_File"></a> Class: File

A media file copied into the crate — the image and audio payloads referenced by the media entities.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/MediaObject" title="http://schema.org/MediaObject" target="_blank" rel="noopener">MediaObject</a> |
| <a href="#prop_File_name" title="#prop_File_name">name</a> |  | Yes | The file's name on disk. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_File_encodingFormat" title="#prop_File_encodingFormat">encodingFormat</a> |  | No | The file's media type, e.g. `image/jpeg`. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="Class_Person" title="#Class_Person"></a> Class: Person

A contributor or subject of the collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_Person_name" title="#prop_Person_name">name</a> |  | Yes | The person's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |

## All Properties

### <a id="prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id"></a> Property: @id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_id" title="#prop_MetadataDescriptor_id">@id</a> |  | The metadata descriptor MUST have the identifier `ro-crate-metadata.json`. | <a href="#propertyValue_MetadataDescriptor_id" title="#propertyValue_MetadataDescriptor_id">Metadata Descriptor Identifier Constraint</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about"></a> Property: about

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_about" title="#prop_MetadataDescriptor_about">about</a> | <a href="http://schema.org/about" target="_blank" rel="noopener">http://schema.org/about</a> | MUST reference the root Dataset (the Root Data Entity). | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_AudioObject_audio" title="#prop_AudioObject_audio"></a> Property: audio

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_AudioObject_audio" title="#prop_AudioObject_audio">audio</a> |  | The audio File this entity plays. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> |
### <a id="prop_ImageObject_caption" title="#prop_ImageObject_caption"></a> Property: caption

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ImageObject_caption" title="#prop_ImageObject_caption">caption</a> |  | Caption text shown beneath the image. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a> |
### <a id="prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo"></a> Property: conformsTo

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_MetadataDescriptor_conformsTo" title="#prop_MetadataDescriptor_conformsTo">conformsTo</a> |  | MUST declare the RO-Crate version the metadata file conforms to. | <a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a> | <a href="#Class_MetadataDescriptor" title="#Class_MetadataDescriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_Dataset_creator" title="#prop_Dataset_creator"></a> Property: creator

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_creator" title="#prop_Dataset_creator">creator</a> |  | Person(s) who compiled/created this collection. | <a href="#Class_Person" title="#Class_Person">Person</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_ImageObject_creditText" title="#prop_ImageObject_creditText"></a> Property: creditText

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ImageObject_creditText" title="#prop_ImageObject_creditText">creditText</a> |  | Photo credit shown beneath the caption. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a> |
### <a id="prop_ImageObject_imageReference" title="#prop_ImageObject_imageReference"></a> Property: custom:imageReference

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ImageObject_imageReference" title="#prop_ImageObject_imageReference">custom:imageReference</a> |  | The image filename as written in the source document, kept when the referenced file could not be resolved to a File entity. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a> |
### <a id="prop_Dataset_datePublished" title="#prop_Dataset_datePublished"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_datePublished" title="#prop_Dataset_datePublished">datePublished</a> |  | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_Dataset_description" title="#prop_Dataset_description"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_description" title="#prop_Dataset_description">description</a> |  | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_File_encodingFormat" title="#prop_File_encodingFormat"></a> Property: encodingFormat

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_File_encodingFormat" title="#prop_File_encodingFormat">encodingFormat</a> |  | The file's media type, e.g. `image/jpeg`. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_File" title="#Class_File">File</a> |
### <a id="prop_Dataset_hasPart" title="#prop_Dataset_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_hasPart" title="#prop_Dataset_hasPart">hasPart</a> |  | The Collections in this dataset — one per top-level folder of structured .docx documents. | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_Collection_hasPart" title="#prop_Collection_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_hasPart" title="#prop_Collection_hasPart">hasPart</a> |  | The documents in this collection — one per structured .docx file. | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_DocumentPart_hasPart" title="#prop_DocumentPart_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DocumentPart_hasPart" title="#prop_DocumentPart_hasPart">hasPart</a> |  | The Chapters and media entities nested inside this document. | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a>, <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> |
### <a id="prop_Chapter_hasPart" title="#prop_Chapter_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Chapter_hasPart" title="#prop_Chapter_hasPart">hasPart</a> |  | Nested Chapters, table rows and media entities belonging to this chapter. | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a>, <a href="#Class_TableRow" title="#Class_TableRow">TableRow</a>, <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |
### <a id="prop_TableRow_hasPart" title="#prop_TableRow_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TableRow_hasPart" title="#prop_TableRow_hasPart">hasPart</a> |  | Media entities appearing in this row. | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a>, <a href="#Class_AudioObject" title="#Class_AudioObject">AudioObject</a> | <a href="#Class_TableRow" title="#Class_TableRow">TableRow</a> |
### <a id="prop_ImageObject_hasPart" title="#prop_ImageObject_hasPart"></a> Property: hasPart

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ImageObject_hasPart" title="#prop_ImageObject_hasPart">hasPart</a> |  | The image File, linked structurally as well as through `image`. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a> |
### <a id="prop_ImageObject_image" title="#prop_ImageObject_image"></a> Property: image

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_ImageObject_image" title="#prop_ImageObject_image">image</a> |  | The image File this entity displays. | <a href="#Class_File" title="#Class_File">File</a> | <a href="#Class_ImageObject" title="#Class_ImageObject">ImageObject</a> |
### <a id="prop_Chapter_isPartOf" title="#prop_Chapter_isPartOf"></a> Property: isPartOf

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Chapter_isPartOf" title="#prop_Chapter_isPartOf">isPartOf</a> |  | The DocumentPart, or enclosing Chapter, that this chapter belongs to. Containment runs downward through `hasPart`; this is the inverse link back up. | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a>, <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |
### <a id="prop_Dataset_license" title="#prop_Dataset_license"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_license" title="#prop_Dataset_license">license</a> |  | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_Dataset_name" title="#prop_Dataset_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Dataset_name" title="#prop_Dataset_name">name</a> |  | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Dataset" title="#Class_Dataset">Dataset</a> |
### <a id="prop_Collection_name" title="#prop_Collection_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Collection_name" title="#prop_Collection_name">name</a> |  | Menu label — see the collection-name mapping builder. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Collection" title="#Class_Collection">RepositoryCollection</a> |
### <a id="prop_DocumentPart_name" title="#prop_DocumentPart_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DocumentPart_name" title="#prop_DocumentPart_name">name</a> |  | Document title, taken from the Heading 1 text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> |
### <a id="prop_Chapter_name" title="#prop_Chapter_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Chapter_name" title="#prop_Chapter_name">name</a> |  | Chapter title, taken from the heading text. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |
### <a id="prop_File_name" title="#prop_File_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_File_name" title="#prop_File_name">name</a> |  | The file's name on disk. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_File" title="#Class_File">File</a> |
### <a id="prop_Person_name" title="#prop_Person_name"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Person_name" title="#prop_Person_name">name</a> |  | The person's name. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Person" title="#Class_Person">Person</a> |
### <a id="prop_DocumentPart_position" title="#prop_DocumentPart_position"></a> Property: position

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DocumentPart_position" title="#prop_DocumentPart_position">position</a> |  | Ordering of this document within its Collection, as it appeared in the source. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> |
### <a id="prop_Chapter_position" title="#prop_Chapter_position"></a> Property: position

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Chapter_position" title="#prop_Chapter_position">position</a> |  | Ordering of this chapter within its parent, as it appeared in the source. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |
### <a id="prop_TableRow_position" title="#prop_TableRow_position"></a> Property: position

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TableRow_position" title="#prop_TableRow_position">position</a> |  | Ordering of this row within its table. | <a href="http://schema.org/Integer" title="http://schema.org/Integer" target="_blank" rel="noopener">Integer</a> | <a href="#Class_TableRow" title="#Class_TableRow">TableRow</a> |
### <a id="prop_DocumentPart_text" title="#prop_DocumentPart_text"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_DocumentPart_text" title="#prop_DocumentPart_text">text</a> |  | The document's parsed body content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_DocumentPart" title="#Class_DocumentPart">DocumentPart</a> |
### <a id="prop_Chapter_text" title="#prop_Chapter_text"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_Chapter_text" title="#prop_Chapter_text">text</a> |  | The chapter's parsed body content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_Chapter" title="#Class_Chapter">Chapter</a> |
### <a id="prop_TableRow_text" title="#prop_TableRow_text"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_TableRow_text" title="#prop_TableRow_text">text</a> |  | The row's content, as HTML. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#Class_TableRow" title="#Class_TableRow">TableRow</a> |
## Property Values

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
<tr><td><a href="#propertyValue_roCrateVersion" title="#propertyValue_roCrateVersion">RO-Crate Version Constraint</a></td><td>The RO-Crate version this crate conforms to.</td><td><div><strong>Literal String</strong><pre><code>https://w3id.org/ro/crate/1.2</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>


