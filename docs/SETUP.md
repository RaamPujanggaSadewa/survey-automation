# Setup

No CLI, no login, no local Apps Script project to maintain. Each script in
`specs/` is self-contained — you paste it into the Apps Script web editor
and run it there.

## Running a `.form.gs`, `.responses.gs`, or `.slides.gs` script

1. Go to [script.google.com](https://script.google.com) and click **New project**.
2. Delete the placeholder code in the editor.
3. Open the relevant file from `specs/` and paste its entire contents in.
4. At the top of the editor, pick the function to run from the dropdown
   next to the **Run** button:
   - `createForm` for a `.form.gs` file
   - `exportResponses` for a `.responses.gs` file
   - `createSlides` for a `.slides.gs` file
5. Click **Run**.
6. The first time you run a given script, Google will prompt you to
   authorize it (it needs permission to create/read Forms or Slides in
   your Drive). Review and allow it.
7. Open **View → Logs** (or **Execution log**) to see the output — the
   form/deck URLs, or the exported responses JSON.

You can rename the project (top left) to whatever's convenient — it
doesn't need to persist between steps, and you can throw it away and paste
a fresh script next time.

## Getting the form ID for the responses step

After `createForm()` runs, the logged edit URL looks like:

```
https://docs.google.com/forms/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/edit
```

The part between `/d/` and `/edit` is the form ID. Paste that into the
`FORM_ID` constant at the top of the `.responses.gs` script an AI generates
for you.

## Using Gemini CLI (or any AI assistant) in this workflow

Gemini CLI does not connect to Google Forms/Slides directly — there's no
API integration it can drive on your behalf. Its role here is to *write*
the script (reading a case file, or later a responses export, and
producing the matching `.gs` file in `specs/`). You still do the
paste-and-run step yourself in the Apps Script editor, as described above.
