# Prompt Workbench

Prompt Workbench turns what you need into a clear, ready-to-paste prompt for the AI tool you use. It's one HTML page with no build step and no dependencies, so anyone can use it, technical or not.

## What it covers

**Types of AI tool**, each with its own form and output format:

| Type | Platforms |
| --- | --- |
| Text & chat | ChatGPT, Claude, Gemini, Copilot, any AI |
| Image | Midjourney, ChatGPT images, Stable Diffusion, Adobe Firefly, Ideogram |
| Video | Sora, Google Veo, Runway, Kling |
| Music & voice | Suno, Udio, ElevenLabs |
| Coding agent | Claude Code, Cursor, GitHub Copilot, ChatGPT / Codex |

**Tasks by role.** You pick a role and a task, and the form shows only the fields that task needs:

- **QA / Tester:** test cases (table, Gherkin, CSV for Azure DevOps / Jira / TestRail), UI automation scripts (TypeScript, JavaScript, Java, C#, Python with Playwright, Selenium, Cypress, WebdriverIO, Appium, Robot Framework), API and integration tests, bug reports, test plans, test data, performance tests (k6, JMeter, Gatling, Locust)
- **Developer:** write code, debug an error, code review, unit tests, API design, SQL queries, documentation
- **UI / UX designer:** user flows, UX copy, design reviews, accessibility checks, usability test plans, component specs, prompts for AI UI generators
- **Business analyst:** user stories, requirements documents, process flows, use cases, gap analysis, stakeholder questions
- **HR:** job descriptions, interview questions, onboarding plans, policy drafts, performance reviews, announcements
- **Project manager:** project plans, sprint planning, status reports, risk registers, meeting agendas, notes to actions, retrospectives
- **Sales & marketing, Customer support, Teacher & student, Office & admin**
- **Everyday (non-technical):** write a message, summarize something, explain simply, plan something, compare options, learn something new, improve my writing

## Features

- **Prompts formatted for each tool.** For example, `--ar` and `--no` parameters for Midjourney, XML-style tags for Claude, a separate negative prompt for Stable Diffusion, and `@file` / `#file:` references for coding agents.
- **Prompt anatomy.** Each part of the prompt (role, task, context, format, rules) is color-coded, so people learn what makes a prompt good.
- **Strength meter.** Shows a 0–100 score and the next thing worth adding.
- **Essentials / All options.** Essentials hides the advanced fields for people who want a quick result.
- **Examples** for every type and task. **Saved prompts** are kept in your browser.
- **AI features:**
  - **Describe in words:** AI fills in the form from one plain sentence.
  - **From an image or video:** upload a picture or clip and get a prompt that recreates it. For a video, a few frames are sent for the AI to study.
  - **Polish with AI:** rewrites the built prompt for the chosen tool.

  These use Claude through the Claude artifact runtime, so they only appear when the page is opened as a Claude artifact. Opened anywhere else, they're hidden and the form still works fully.

## Run it

Open `index.html` in any modern browser. That's all.

To host it, turn on **GitHub Pages**: go to Settings → Pages, choose Deploy from a branch, then `main`, folder `/ (root)`.

## Project structure

| File | What it is |
| --- | --- |
| `src/prompt-workbench.html` | **The source. Edit this one.** It's published as the Claude page, so it starts at `<title>` with no `<html>`, `<head>` or `<body>` (Claude adds those itself). |
| `index.html` | A standalone copy for browsers and GitHub Pages, generated from the source. Don't edit it by hand. |
| `build.mjs` | Regenerates `index.html` from the source. Run `node build.mjs` (needs Node.js 18 or later). |

To update the app:

1. Edit `src/prompt-workbench.html`.
2. Run `node build.mjs`.
3. Republish the Claude page from the source file.
4. Commit both files and push to `main`.

## Add a role or a task

The code is in `src/prompt-workbench.html`:

- `WF` is the library of form fields. Fields with a `say` function become a line under "What to deliver". The others are listed under "Details".
- `WORK` is the list of roles. Each role has a `persona` and `tasks`. Each task has a main-field label (`subj`), a `goal`, the field IDs it uses (`fields`), fixed `deliver` lines, and an example (`ex`).

To add a new task, append an object to a role's `tasks` array. Reuse existing `WF` fields where you can. Then run `node build.mjs`.
