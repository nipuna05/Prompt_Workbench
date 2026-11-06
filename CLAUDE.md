# Prompt Workbench

A single-page prompt generator, published both as a Claude artifact and from this GitHub repo.

## Every change goes to both places

The owner wants every update to show up in the Claude artifact and in GitHub. Do all four steps for every change, however small:

1. Edit `src/prompt-workbench.html`. Never edit `index.html` by hand.
2. Run `node build.mjs` to regenerate `index.html`.
3. Publish `src/prompt-workbench.html` with the Artifact tool, passing `url: https://claude.ai/artifact/CUWTafbEV6QF9sasFcKGi5` so the link stays the same. Leave `capabilities` out, so the existing declaration (`sample` with images) carries forward. The artifact is shared with the owner's organization, and viewers see updates immediately.
4. Commit `src/prompt-workbench.html` and `index.html` together and push to `main`. The owner may host `main` with GitHub Pages.

## Files

- `src/prompt-workbench.html`: the source, in artifact format. It starts at `<title>` with no doctype, `<html>`, `<head>` or `<body>`, because the artifact runtime adds the wrapper. All CSS and JS are inline.
- `index.html`: generated standalone page. `build.mjs` puts everything up to the first `</style>` line into `<head>` and the rest into `<body>`.
- `build.mjs`: the build script (Node 18+, no dependencies).

## Code map (in the source file)

- `CATS`: the six tool types (chat, work, image, video, audio, code). Each has platforms, fields (or `fieldsFor`), score items, presets, and a `build(values, platform)` function that returns colored prompt parts.
- `WF` and `WORK`: the role-based tasks. `WF` is the field library (fields with `say` go under "What to deliver"); `WORK` lists roles, each with a persona and tasks (`subj`, `goal`, `fields`, `deliver`, `ex`).
- AI features call `claude.use('sample')`. They hide themselves when that resolves `null`, so `index.html` works without them.
- Per-viewer state (the draft and saved prompts) is kept in `localStorage`, wrapped in try/catch.
