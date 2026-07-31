# Setup

One-time setup to let `scripts/generate-form.sh`, `scripts/fetch-responses.sh`,
`scripts/generate-slides.sh` (or the Gemini CLI) push to Apps Script and
create Google Forms / Slides — all three run against the same Apps Script
project set up below.

## 1. Install clasp

`clasp` is Google's CLI for pushing code to Apps Script projects.

```bash
npm install -g @google/clasp
```

## 2. Enable the Apps Script API

Visit https://script.google.com/home/usersettings and turn on the
**Google Apps Script API** toggle for your Google account. Without this,
`clasp` cannot create or push to script projects.

## 3. Log in

```bash
clasp login
```

This opens a browser OAuth flow and stores credentials locally
(`~/.clasprc.json`) — it is not part of this repo.

## 4. Create the Apps Script project

From the repo root:

```bash
cd apps-script
clasp create --title "Survey Automation" --type standalone --rootDir .
```

This generates a `.clasp.json` in `apps-script/` containing your project's
`scriptId`. It's user-specific, so it's git-ignored — anyone forking this
repo runs this step themselves to get their own script project.

## 5. Push and run

```bash
cd apps-script
clasp push
clasp run createFormFromSpec
```

Or use the wrapper scripts from the repo root, which do the copy/push/run in
one step:

- `scripts/generate-form.sh <case-name>` — builds the Google Form
- `scripts/fetch-responses.sh <case-name>` — pulls back that form's responses as JSON
- `scripts/generate-slides.sh <case-name>` — builds the Google Slides deck

The first `clasp run` of each function may prompt you to authorize the
script (it needs permission to create Forms/Slides and read form responses
in your Drive).

## Using the Gemini CLI instead of running clasp by hand

The Gemini CLI can shell out to `clasp` the same way you would manually —
point it at this repo and ask it to run the wrapper script for whichever
step you're on (form creation, fetching responses, or slides creation), or
the underlying `clasp push` / `clasp run` commands directly. It needs the
same one-time login (steps 1–4 above) done on the machine/environment it
runs in.
