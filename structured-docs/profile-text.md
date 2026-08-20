# Structured Docs

The profile specifies metadata and workflows used in creating person-centred collections.

Includes a mode file for specifying configuration for the Resources2Crate tool (defined in tool-config.json). Using this config, Resources2Crate will parse document contents and package those contents in [bibo:DocumentPart](http://purl.org/ontology/bibo/DocumentPart).

Headings in the source documents become a nesting structure: Heading 1 becomes a
[bibo:DocumentPart](http://purl.org/ontology/bibo/DocumentPart) and Heading 2/3
become [bibo:Chapter](http://purl.org/ontology/bibo/Chapter) entities beneath it.
Containment runs downward through `hasPart` — a RepositoryCollection holds DocumentParts, a
DocumentPart holds Chapters, and Chapters may nest within one another. A Chapter
is always *part of* the document above it, so it links back up with `isPartOf`
rather than holding a DocumentPart of its own. Images and audio found in a
document are attached to the enclosing Chapter or DocumentPart as `ImageObject`
and `AudioObject` entities, each pointing at the `File` copied into the crate.

The root dataset has exactly two members: `#derivedContent`, whose `hasPart` is
one `RepositoryCollection` per top-level folder — the parsed Chapter/DocumentPart
structure described above — and `#sourceDocuments`, whose `hasPart` is one
`SourceDocumentGroup` per top-level folder, holding that folder's original .docx
files verbatim as `File` entities rather than discarding them after parsing. The
two mirror the same topic grouping; the generated site only ever navigates into
`#derivedContent`, so `#sourceDocuments` exists for completeness/download and has
no page of its own.

The Build panel's **Set menu names and order** widget allows each top-level collection folder
to be given a friendlier navigation label and dragged into the desired display order. The
resulting label map and collection order are passed to the builder, which processes
collections in the specified order and stores them in `#derivedContent`'s `hasPart` array in
that order. The structured-docs site template reads that order to determine the navigation menu
sequence, so dragging rows in the widget directly controls the rendered menu order.

${rules.all}
