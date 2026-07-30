# Specs

Each file here is the AI-generated output for one case in `cases/`, named
`<case-name>.spec.gs`. It's a plain `.gs` (Apps Script) file that defines a
single global object, `SURVEY_SPEC`, which `apps-script/Code.gs` reads to
build the Google Form.

There's no fixed set of questions or count — the AI decides the mix of
question types per case based on the condition and goal described in the
matching case file.

## Format

```js
const SURVEY_SPEC = {
  title: "Form title",
  description: "Shown at the top of the form.",
  questions: [
    { type: "TEXT", title: "Short answer question", required: true },
    { type: "PARAGRAPH_TEXT", title: "Long answer question", required: false },
    {
      type: "MULTIPLE_CHOICE",
      title: "Single-select question",
      choices: ["Option A", "Option B", "Option C"],
      required: true
    },
    {
      type: "CHECKBOX",
      title: "Multi-select question",
      choices: ["Option A", "Option B", "Option C"]
    },
    {
      type: "LIST",
      title: "Dropdown question",
      choices: ["Option A", "Option B"]
    },
    {
      type: "SCALE",
      title: "Rating question",
      lower: 1,
      upper: 5,
      lowerLabel: "Not at all",
      upperLabel: "Extremely"
    }
  ]
};
```

Supported `type` values match what `apps-script/Code.gs` implements:
`TEXT`, `PARAGRAPH_TEXT`, `MULTIPLE_CHOICE`, `CHECKBOX`, `LIST`, `SCALE`.
