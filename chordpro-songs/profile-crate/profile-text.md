# ChordPro Songs & Setlists

The profile specifies metadata for a songbook harvested from a folder of ChordPro song
charts (`.cho`/`.pro`) and Markdown setlists (`.setlist.md`).

A song file is described as a `MusicComposition` with a copy of its ChordPro source in a `text` property.

Setlists are described using `MusicPlaylist`, to list the songs for a particular event, optionally divided in sets, via a nested `MusicPlaylist`. MusicPlaylist enties may also have parts that are `MusicComposition` entries which are specializations of a song, referenced via `specializationOf`, which may have their own key and capo information



${rules.all}
