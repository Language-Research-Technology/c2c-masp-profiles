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

The Build panel's **Set menu names and order** widget allows each top-level collection folder
to be given a friendlier navigation label and dragged into the desired display order. The
resulting label map and collection order are passed to the builder, which processes
collections in the specified order and stores them in the root `hasPart` array in that order.
The structured-docs site template reads the `hasPart` order to determine the navigation menu
sequence, so dragging rows in the widget directly controls the rendered menu order.

${rules.all}
