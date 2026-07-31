# Responses

Raw survey response exports go here, named `<case-name>.json`, produced by:

```bash
./scripts/fetch-responses.sh <case-name> > responses/<case-name>.json
```

This calls the `exportResponses` Apps Script function, which looks up the
case's form (stored by `createFormFromSpec` when the form was created) and
returns every response as JSON.

These files are git-ignored — they're respondent data, not something to
commit. An AI reads this file (plus the original case file for context) to
write `specs/<case-name>.slides.gs`.
