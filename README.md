# Survey Automation

An AI-driven workflow that turns a described UX problem directly into a live
Google Form — no manually-written survey, no manually-built form.

Instead of a researcher drafting questions by hand and then clicking through
the Google Forms UI, this workflow is:

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

The result: describe a problem, get a real, published Google Form — with no
manual form-building step.

## How it works

```
cases/<case>.md          -- you describe the current condition + goal
        |
        v  (AI reads the case file)
specs/<case>.spec.gs      -- AI-generated question spec (a SURVEY_SPEC object)
        |
        v  (scripts/generate-form.sh <case>)
apps-script/               -- clasp-managed Apps Script project
  Code.gs                  -- fixed engine: reads SURVEY_SPEC, builds the form
  Spec.gs                  -- the active case's spec, copied in before push
        |
        v  clasp push && clasp run createFormFromSpec
Google Form (live, in your Drive)
```

## Repo structure

- `cases/` — one markdown file per problem/case (input side, written by you).
- `specs/` — one generated `.spec.gs` file per case (AI output, question set).
- `apps-script/` — the Apps Script project: the fixed form-building engine
  plus the currently active spec.
- `scripts/generate-form.sh` — copies a case's spec into the Apps Script
  project, pushes it, and runs the form-creation function.
- `docs/SETUP.md` — one-time setup for Gemini CLI, clasp, and the Apps
  Script project.

## Usage

1. Copy `cases/TEMPLATE.md` to `cases/<your-case>.md` and fill it in: current
   condition, current UI (screenshots/links), and your research goal.
2. Ask an AI assistant to turn that case file into a spec, saved as
   `specs/<your-case>.spec.gs` (see `specs/README.md` for the format).
3. Run:
   ```bash
   ./scripts/generate-form.sh <your-case>
   ```
4. The script prints the edit URL and published URL of the new Google Form.

See `docs/SETUP.md` for the one-time Gemini CLI / clasp / Apps Script setup.

## Why this exists

Digging into a UX problem and turning it into a well-structured survey, then
manually building that survey in Google Forms, is slow and repetitive. This
repo captures that workflow so the survey design work goes through an AI
step instead of a manual one, and the form itself is generated rather than
clicked together by hand. Feel free to fork and adapt it to your own
research workflow.
