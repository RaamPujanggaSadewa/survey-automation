# Survey Automation

An AI-driven pipeline that goes from a described UX problem all the way to a
synthesized findings deck: **describe the problem → AI writes a Google Apps
Script → you paste it in and run it, creating a live Google Form →
responses come in → AI synthesizes them → another pasted-and-run script
builds the Google Slides deck.** No manual survey writing, no manual
question-by-question form building, no manual deck building — the parts
that take thought (question design, synthesis) go through AI, the parts
that are just execution (creating the Form/Slides) are a script you run
once.

The one manual step in the loop: Google doesn't give an AI CLI a way to
call the Forms/Slides APIs directly on your behalf, so you copy the
AI-generated script and run it yourself in the Apps Script web editor.
That's a couple of clicks, not a survey built by hand.

1. **Describe the case.** Write down the current condition (what's
   happening, what the UI looks like, evidence/screenshots) and the research
   goal (what you're trying to find out) in a markdown file.
2. **AI generates the form script.** An AI assistant (e.g. Claude or
   Gemini CLI) reads the case file and writes a complete, self-contained
   Apps Script file — no fixed question template, the question set is
   designed per case.
3. **You paste and run it.** In the Apps Script editor
   ([script.google.com](https://script.google.com)), paste the script and
   run its one function — that creates the actual Google Form.
4. **Responses come in**, then get pulled back out as JSON the same way:
   paste and run a second AI-generated script.
5. **AI synthesizes the responses** into a slides script — again no fixed
   structure, the AI decides what sections and findings the data supports.
6. **You paste and run that too**, creating the Google Slides deck.

## How it works

```
cases/<case>.md                  -- you describe the current condition + goal
        |
        v  (AI reads the case file)
specs/<case>.form.gs               -- AI-generated, self-contained form script
        |
        v  paste into script.google.com, run createForm()
Google Form (live, in your Drive)
        |
        v  people fill it out
        |
        v  (AI writes specs/<case>.responses.gs with the form ID filled in)
        v  paste into script.google.com, run exportResponses()
responses/<case>.json              -- raw response export, copied from the execution log
        |
        v  (AI reads the responses + original case file)
specs/<case>.slides.gs             -- AI-generated, self-contained slides script
        |
        v  paste into script.google.com, run createSlides()
Google Slides deck (live, in your Drive)
```

## Repo structure

- `cases/` — one markdown file per problem/case (input side, written by you).
- `specs/` — AI output per case: `<case>.form.gs`, `<case>.responses.gs`,
  `<case>.slides.gs` — each a complete script you paste and run, see
  `specs/README.md` for all three formats.
- `responses/` — raw response exports per case (git-ignored, respondent data).
- `docs/SETUP.md` — how to paste/run a script in the Apps Script editor.

## Usage

1. Copy `cases/TEMPLATE.md` to `cases/<your-case>.md` and fill it in: current
   condition, current UI (screenshots/links), and your research goal.
2. Ask an AI assistant to turn that case file into
   `specs/<your-case>.form.gs` (see `specs/README.md`).
3. Paste it into a new Apps Script project and run `createForm()` — see
   `docs/SETUP.md`. Note the form's edit URL it logs.
4. Once responses are in, ask an AI assistant to write
   `specs/<your-case>.responses.gs` with the form ID (from that edit URL)
   filled in. Paste and run `exportResponses()`, then save the logged JSON
   as `responses/<your-case>.json`.
5. Ask an AI assistant to synthesize that JSON (plus the original case file)
   into `specs/<your-case>.slides.gs`.
6. Paste and run `createSlides()` — that's the findings deck.

## Why this exists

Digging into a UX problem, turning it into a well-structured survey,
manually building that survey in Google Forms, then manually turning
responses into a findings deck, is slow and repetitive. This repo captures
that whole loop so the thinking (question design, synthesis) goes through
an AI step instead of a manual one, and both the form and the deck are
generated scripts rather than clicked together by hand. Feel free to fork
and adapt it to your own research workflow.
