# Responses

Raw survey response exports go here, named `<case-name>.json`.

To get one: run the `exportResponses()` function from a
`specs/<case-name>.responses.gs` script in the Apps Script editor (see
`docs/SETUP.md`), then copy the JSON printed in the execution log and save
it here as `<case-name>.json`.

These files are git-ignored — they're respondent data, not something to
commit. An AI reads this file (plus the original case file for context) to
write `specs/<case-name>.slides.gs`.
