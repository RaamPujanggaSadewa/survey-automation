# Responses

Raw survey response exports go here, named `<case-name>.json` or
`<case-name>.csv` (Google Forms' own response export/spreadsheet download
works just as well as the `exportResponses()` script).

To get the `.json` version: run the `exportResponses()` function from a
`specs/<case-name>.responses.gs` script in the Apps Script editor (see
`docs/SETUP.md`), then copy the JSON printed in the execution log and save
it here as `<case-name>.json`.

`.json` exports are git-ignored by default — respondent data usually
shouldn't be committed. `shuttle-pickup-location.csv` is kept as a
worked, already-anonymized example of the whole pipeline (see
`synthesis/shuttle-pickup-location.md` for what came out of it). An AI
reads a response file (plus the original case file for context) to write
`synthesis/<case-name>.md` and then `specs/<case-name>.slides.gs`.
