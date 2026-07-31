# Survey Automation

An AI-driven pipeline that goes from a described UX problem all the way to a
synthesized findings deck: **describe the problem → AI writes the survey →
Apps Script publishes it as a Google Form → responses come in → AI
synthesizes them → Apps Script builds the Google Slides deck.** One
ecosystem, no manual survey writing, no manual form building, no manual
deck building.

Instead of a researcher drafting questions by hand, clicking through the
Google Forms UI, and then manually building a findings deck, this workflow
is:

1. **Describe the case.** Write down the current condition (what's
   happening, what the UI looks like, evidence/screenshots) and the research
   goal (what you're trying to find out) in a markdown file.
2. **AI generates the questions.** An AI assistant (e.g. Claude or Gemini)
   reads the case file and writes a question spec — no fixed template, the
   question set is designed per case.
3. **Apps Script builds the form.** The spec is pushed into a Google Apps
   Script project (via [`clasp`](https://github.com/google/clasp) / the
   Gemini CLI) and a script function creates the actual Google Form using
   the Forms API (`FormApp`).
4. **Responses come in**, then get pulled back out as JSON.
5. **AI synthesizes the responses** into a slides spec — again no fixed
   structure, the AI decides what sections and findings the data supports.
6. **Apps Script builds the deck.** The slides spec is pushed the same way
   and a script function creates the Google Slides deck (`SlidesApp`).

## How it works

```
cases/<case>.md            -- you describe the current condition + goal
        |
        v  (AI reads the case file)
specs/<case>.spec.gs        -- AI-generated question spec (SURVEY_SPEC)
        |
        v  scripts/generate-form.sh <case>
Google Form (live, in your Drive)
        |
        v  people fill it out
        |
        v  scripts/fetch-responses.sh <case>
responses/<case>.json       -- raw response export
        |
        v  (AI reads the responses + original case file)
specs/<case>.slides.gs      -- AI-generated findings spec (SLIDES_SPEC)
        |
        v  scripts/generate-slides.sh <case>
Google Slides deck (live, in your Drive)
```

All of the Apps Script steps live in one `clasp`-managed project:

- `apps-script/Code.gs` — reads `SURVEY_SPEC` (from `Spec.gs`), builds the form
- `apps-script/Responses.gs` — reads back a form's responses as JSON
- `apps-script/Slides.gs` — reads `SLIDES_SPEC` (from `SlidesSpec.gs`), builds the deck

## Repo structure

- `cases/` — one markdown file per problem/case (input side, written by you).
- `specs/` — AI output per case: `<case>.spec.gs` (questions) and
  `<case>.slides.gs` (findings), see `specs/README.md` for both formats.
- `responses/` — raw response exports per case (git-ignored, respondent data).
- `apps-script/` — the Apps Script project: fixed engines for forms,
  responses, and slides, plus the currently active specs.
- `scripts/` — `generate-form.sh`, `fetch-responses.sh`, `generate-slides.sh`.
- `docs/SETUP.md` — one-time setup for Gemini CLI, clasp, and the Apps
  Script project.

## Usage

1. Copy `cases/TEMPLATE.md` to `cases/<your-case>.md` and fill it in: current
   condition, current UI (screenshots/links), and your research goal.
2. Ask an AI assistant to turn that case file into a spec, saved as
   `specs/<your-case>.spec.gs` (see `specs/README.md`).
3. Run `./scripts/generate-form.sh <your-case>` — prints the edit and
   published URLs of the new Google Form.
4. Once responses are in, run
   `./scripts/fetch-responses.sh <your-case> > responses/<your-case>.json`.
5. Ask an AI assistant to synthesize `responses/<your-case>.json` (plus the
   original case file) into `specs/<your-case>.slides.gs`.
6. Run `./scripts/generate-slides.sh <your-case>` — prints the URL of the
   new Google Slides deck.

See `docs/SETUP.md` for the one-time Gemini CLI / clasp / Apps Script setup.

## Why this exists

Digging into a UX problem, turning it into a well-structured survey,
manually building that survey in Google Forms, then manually turning
responses into a findings deck, is slow and repetitive. This repo captures
that whole loop so the thinking (question design, synthesis) goes through
an AI step instead of a manual one, and both the form and the deck are
generated rather than clicked together by hand. Feel free to fork and adapt
it to your own research workflow.
