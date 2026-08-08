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

${rules.all}
