# Structured Doc Data

The profile specifies metadata and workflows used in creating person-centred collections.

Includes a mode file for specifying configuration for the Resources2Crate tool (defined in crate-o-mode.json). Using this config, Resources2Crate will parse document contents and package those contents in [bibo:DocumentPart](http://purl.org/ontology/bibo/DocumentPart).

## Types of entities (specializations of Classes) and expected Properties


### <a id="class_Dataset" title="#class_Dataset"></a> Class: Dataset

The root dataset: a collection of structured-document collections.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Dataset" title="http://schema.org/Dataset" target="_blank" rel="noopener">Dataset</a> |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> |  | Yes | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> |  | Yes | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_name_Dataset" title="#prop_name_Dataset">name</a> |  | Yes | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_creator_Dataset" title="#prop_creator_Dataset">creator</a> |  | No | Person(s) who compiled/created this collection. | <a href="#class_Person" title="#class_Person">Person</a> |  |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> |  | No | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> |  |


### <a id="class_Person" title="#class_Person"></a> Class: Person

A contributor or subject of the collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_name_Person" title="#prop_name_Person">name</a> |  | Yes |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_Collection" title="#class_Collection"></a> Class: Collection

One top-level folder of structured .docx documents (shown as a menu entry in the generated site).

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://pcdm.org/models#Collection" title="http://pcdm.org/models#Collection" target="_blank" rel="noopener">Collection</a> |
| <a href="#prop_name_Collection" title="#prop_name_Collection">name</a> |  | Yes | Menu label — see the collection-name mapping builder. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_bibo:DocumentPart" title="#class_bibo:DocumentPart"></a> Class: bibo:DocumentPart

One structured .docx document within a Collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://purl.org/ontology/bibo/DocumentPart" title="http://purl.org/ontology/bibo/DocumentPart" target="_blank" rel="noopener">DocumentPart</a> |
| <a href="#prop_name_bibo:DocumentPart" title="#prop_name_bibo:DocumentPart">name</a> |  | Yes |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_text_bibo:DocumentPart" title="#prop_text_bibo:DocumentPart">text</a> |  | No | The document's parsed body content. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_RO-Crate_Metadata_Descriptor" title="#class_RO-Crate_Metadata_Descriptor"></a> Class: RO-Crate Metadata Descriptor



Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  |  |
| <a href="#prop_@id_RO-Crate_Metadata_Descriptor" title="#prop_@id_RO-Crate_Metadata_Descriptor">@id</a> |  | Yes |  | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">propertyValue_RO-Crate_Metadata_Descriptor.id</a> |  |

## All Properties

### <a id="prop_@id_RO-Crate_Metadata_Descriptor" title="#prop_@id_RO-Crate_Metadata_Descriptor"></a> Property: @id

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_@id_RO-Crate_Metadata_Descriptor" title="#prop_@id_RO-Crate_Metadata_Descriptor">@id</a> |  |  | <a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">propertyValue_RO-Crate_Metadata_Descriptor.id</a> | <a href="#class_RO-Crate_Metadata_Descriptor" title="#class_RO-Crate_Metadata_Descriptor">RO-Crate Metadata Descriptor</a> |
### <a id="prop_creator_Dataset" title="#prop_creator_Dataset"></a> Property: creator

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_creator_Dataset" title="#prop_creator_Dataset">creator</a> |  | Person(s) who compiled/created this collection. | <a href="#class_Person" title="#class_Person">Person</a> | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |
### <a id="prop_datePublished_Dataset" title="#prop_datePublished_Dataset"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_datePublished_Dataset" title="#prop_datePublished_Dataset">datePublished</a> |  | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |
### <a id="prop_description_Dataset" title="#prop_description_Dataset"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_description_Dataset" title="#prop_description_Dataset">description</a> |  | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |
### <a id="prop_license_Dataset" title="#prop_license_Dataset"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_license_Dataset" title="#prop_license_Dataset">license</a> |  | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |
### <a id="prop_name_Dataset" title="#prop_name_Dataset"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Dataset" title="#prop_name_Dataset">name</a> |  | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Dataset" title="#class_Dataset">Dataset</a> |
### <a id="prop_name_Person" title="#prop_name_Person"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Person" title="#prop_name_Person">name</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Person" title="#class_Person">Person</a> |
### <a id="prop_name_Collection" title="#prop_name_Collection"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Collection" title="#prop_name_Collection">name</a> |  | Menu label — see the collection-name mapping builder. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Collection" title="#class_Collection">Collection</a> |
### <a id="prop_name_bibo:DocumentPart" title="#prop_name_bibo:DocumentPart"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_bibo:DocumentPart" title="#prop_name_bibo:DocumentPart">name</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_bibo:DocumentPart" title="#class_bibo:DocumentPart">DocumentPart</a> |
### <a id="prop_text_bibo:DocumentPart" title="#prop_text_bibo:DocumentPart"></a> Property: text

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_text_bibo:DocumentPart" title="#prop_text_bibo:DocumentPart">text</a> |  | The document's parsed body content. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_bibo:DocumentPart" title="#class_bibo:DocumentPart">DocumentPart</a> |
## Property Values

### <a id="propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id"></a> Property Value: #propertyValue_RO-Crate_Metadata_Descriptor.id

ID: #propertyValue_RO-Crate_Metadata_Descriptor.id

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">#propertyValue_RO-Crate_Metadata_Descriptor.id</a></td><td></td><td><div><strong>Literal String</strong><pre><code>ro-crate-metadata.json</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>


