# Language Resources

The profile specifies Classes and Properties used in creating collections of Aboriginal and Torres Strait Islander language resources.

Also includes a mode file for specifying configuration of the Resources2Crate tool (defined in crate-o-mode.json).

## Types of entities (specializations of Classes) and expected Properties


### <a id="class_RepositoryCollection" title="#class_RepositoryCollection"></a> Class: RepositoryCollection

The root dataset: a collection of language resources.

At least 1 instances of this type MUST be present in the crate.

 A maximum of 1 instances of this type  MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| 1 | 1 |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://pcdm.org/models#Collection" title="http://pcdm.org/models#Collection" target="_blank" rel="noopener">Collection</a> |
| <a href="#prop_datePublished_RepositoryCollection" title="#prop_datePublished_RepositoryCollection">datePublished</a> |  | Yes | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> |  |
| <a href="#prop_description_RepositoryCollection" title="#prop_description_RepositoryCollection">description</a> |  | Yes | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_name_RepositoryCollection" title="#prop_name_RepositoryCollection">name</a> |  | Yes | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_creator_RepositoryCollection" title="#prop_creator_RepositoryCollection">creator</a> |  | No | Person(s) who compiled/created this collection. | <a href="#class_Person" title="#class_Person">Person</a> |  |
| <a href="#prop_portalDescription_RepositoryCollection" title="#prop_portalDescription_RepositoryCollection">custom:portalDescription</a> |  | No | Description shown in the portal popup, if different from the collection description. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_portalName_RepositoryCollection" title="#prop_portalName_RepositoryCollection">custom:portalName</a> |  | No | Name shown in the portal popup, if different from the collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_inLanguage_RepositoryCollection" title="#prop_inLanguage_RepositoryCollection">inLanguage</a> |  | No | The language(s) the collection documents. | <a href="#class_Language" title="#class_Language">Language</a> |  |
| <a href="#prop_license_RepositoryCollection" title="#prop_license_RepositoryCollection">license</a> |  | No | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> |  |


### <a id="class_Person" title="#class_Person"></a> Class: Person

A contributor, compiler, or participant.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Person" title="http://schema.org/Person" target="_blank" rel="noopener">Person</a> |
| <a href="#prop_name_Person" title="#prop_name_Person">name</a> |  | Yes |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_Language" title="#class_Language"></a> Class: Language

A language documented in this collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Language" title="http://schema.org/Language" target="_blank" rel="noopener">Language</a> |
| <a href="#prop_name_Language" title="#prop_name_Language">name</a> |  | Yes |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_custom:austlangCode_Language" title="#prop_custom:austlangCode_Language">custom:austlangCode</a> |  | No | The AUSTLANG code for this language. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_custom:iso639-3_Language" title="#prop_custom:iso639-3_Language">custom:iso639-3</a> |  | No | The ISO 639-3 code for this language. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


### <a id="class_Place" title="#class_Place"></a> Class: Place

A location referenced by items in the collection.

Instances of this type MAY be present in the crate.

| Min Count | Max Count |
| --------- | --------- |
| N/A | N/A |

| Property | Specialization Of | Required | Description | Range | Value |
| -------- | ----------------- | -------- | ----------- | ----- | ----- |
| @type |  | Yes |  |  | <a href="http://schema.org/Place" title="http://schema.org/Place" target="_blank" rel="noopener">Place</a> |
| <a href="#prop_name_Place" title="#prop_name_Place">name</a> |  | Yes |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |
| <a href="#prop_description_Place" title="#prop_description_Place">description</a> |  | No |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> |  |


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
### <a id="prop_creator_RepositoryCollection" title="#prop_creator_RepositoryCollection"></a> Property: creator

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_creator_RepositoryCollection" title="#prop_creator_RepositoryCollection">creator</a> |  | Person(s) who compiled/created this collection. | <a href="#class_Person" title="#class_Person">Person</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_custom:austlangCode_Language" title="#prop_custom:austlangCode_Language"></a> Property: custom:austlangCode

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_custom:austlangCode_Language" title="#prop_custom:austlangCode_Language">custom:austlangCode</a> |  | The AUSTLANG code for this language. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Language" title="#class_Language">Language</a> |
### <a id="prop_custom:iso639-3_Language" title="#prop_custom:iso639-3_Language"></a> Property: custom:iso639-3

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_custom:iso639-3_Language" title="#prop_custom:iso639-3_Language">custom:iso639-3</a> |  | The ISO 639-3 code for this language. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Language" title="#class_Language">Language</a> |
### <a id="prop_portalDescription_RepositoryCollection" title="#prop_portalDescription_RepositoryCollection"></a> Property: custom:portalDescription

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_portalDescription_RepositoryCollection" title="#prop_portalDescription_RepositoryCollection">custom:portalDescription</a> |  | Description shown in the portal popup, if different from the collection description. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_portalName_RepositoryCollection" title="#prop_portalName_RepositoryCollection"></a> Property: custom:portalName

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_portalName_RepositoryCollection" title="#prop_portalName_RepositoryCollection">custom:portalName</a> |  | Name shown in the portal popup, if different from the collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_datePublished_RepositoryCollection" title="#prop_datePublished_RepositoryCollection"></a> Property: datePublished

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_datePublished_RepositoryCollection" title="#prop_datePublished_RepositoryCollection">datePublished</a> |  | Date published (YYYY-MM-DD). | <a href="http://schema.org/Date" title="http://schema.org/Date" target="_blank" rel="noopener">Date</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_description_RepositoryCollection" title="#prop_description_RepositoryCollection"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_description_RepositoryCollection" title="#prop_description_RepositoryCollection">description</a> |  | A short summary of the collection. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_description_Place" title="#prop_description_Place"></a> Property: description

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_description_Place" title="#prop_description_Place">description</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Place" title="#class_Place">Place</a> |
### <a id="prop_inLanguage_RepositoryCollection" title="#prop_inLanguage_RepositoryCollection"></a> Property: inLanguage

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_inLanguage_RepositoryCollection" title="#prop_inLanguage_RepositoryCollection">inLanguage</a> |  | The language(s) the collection documents. | <a href="#class_Language" title="#class_Language">Language</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_license_RepositoryCollection" title="#prop_license_RepositoryCollection"></a> Property: license

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_license_RepositoryCollection" title="#prop_license_RepositoryCollection">license</a> |  | A URL identifying the licence. | <a href="http://schema.org/URL" title="http://schema.org/URL" target="_blank" rel="noopener">URL</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_name_RepositoryCollection" title="#prop_name_RepositoryCollection"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_RepositoryCollection" title="#prop_name_RepositoryCollection">name</a> |  | Collection title. | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_RepositoryCollection" title="#class_RepositoryCollection">RepositoryCollection</a> |
### <a id="prop_name_Person" title="#prop_name_Person"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Person" title="#prop_name_Person">name</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Person" title="#class_Person">Person</a> |
### <a id="prop_name_Language" title="#prop_name_Language"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Language" title="#prop_name_Language">name</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Language" title="#class_Language">Language</a> |
### <a id="prop_name_Place" title="#prop_name_Place"></a> Property: name

| Property | Specialization Of | Description | Range | Occurs in Domain(s) |
| -------- | ----------------- | ----------- | ----------- | ----------- |
| <a href="#prop_name_Place" title="#prop_name_Place">name</a> |  |  | <a href="http://schema.org/Text" title="http://schema.org/Text" target="_blank" rel="noopener">Text</a> | <a href="#class_Place" title="#class_Place">Place</a> |
## Property Values

### <a id="propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id"></a> Property Value: #propertyValue_RO-Crate_Metadata_Descriptor.id

ID: #propertyValue_RO-Crate_Metadata_Descriptor.id

<table>
<thead><tr><th>Property Value</th><th>Description</th><th>Value</th><th>Min Count</th><th>Max Count</th></tr></thead>
<tbody>
<tr><td><a href="#propertyValue_RO-Crate_Metadata_Descriptor.id" title="#propertyValue_RO-Crate_Metadata_Descriptor.id">#propertyValue_RO-Crate_Metadata_Descriptor.id</a></td><td></td><td><div><strong>Literal String</strong><pre><code>ro-crate-metadata.json</code></pre></div></td><td>1</td><td>1</td></tr>
</tbody></table>

