/**
 * Paste this whole file into a new Apps Script project at
 * script.google.com, then run createForm() once. The first run will ask
 * you to authorize it to create a Form in your Drive.
 */
const SURVEY = {
  title: "Finding Your Shuttle Pickup Point (Bandung–Jakarta Travelers)",
  description:
    "A few quick questions for people who travel between Bandung and Jakarta by shuttle/travel service regularly. This will help us understand whether finding the exact pickup/drop-off point is actually a problem worth fixing. Takes about 2 minutes.",
  questions: [
    {
      type: "LIST",
      title: "How often do you travel between Bandung and Jakarta by shuttle/travel service?",
      choices: [
        "Every week",
        "A few times a month",
        "About once a month",
        "Less often than that"
      ],
      required: true
    },
    {
      type: "TEXT",
      title: "Which shuttle/travel service do you use most often for this route?",
      required: false
    },
    {
      type: "MULTIPLE_CHOICE",
      title: "Have you ever had trouble finding the exact pickup point (pool) for your shuttle?",
      choices: ["Yes, almost every time", "Sometimes", "Rarely", "Never"],
      required: true
    },
    {
      type: "PARAGRAPH_TEXT",
      title: "If you have had trouble finding it, what happened? What made it hard to locate?",
      required: false
    },
    {
      type: "CHECKBOX",
      title: "What do you currently do to find the pickup point?",
      choices: [
        "Call/chat the driver or operator",
        "Ask friends who've used it before",
        "Search for it myself on Google Maps",
        "Rely on landmarks mentioned in the booking",
        "Just go early and look around",
        "Other"
      ],
      required: true
    },
    {
      type: "MULTIPLE_CHOICE",
      title: "Have you ever arrived late to the pickup point, or missed your shuttle, because you couldn't find it?",
      choices: ["Yes, more than once", "Yes, once", "No, never"],
      required: true
    },
    {
      type: "MULTIPLE_CHOICE",
      title: "Have you had the same difficulty finding the drop-off point at your destination?",
      choices: ["Yes, often", "Sometimes", "Rarely", "Never"],
      required: true
    },
    {
      type: "SCALE",
      title: "How helpful would it be if the app showed the exact address and a map for the pickup/drop-off point?",
      lower: 1,
      upper: 5,
      lowerLabel: "Not helpful at all",
      upperLabel: "Extremely helpful",
      required: true
    },
    {
      type: "CHECKBOX",
      title: "If the app showed pickup/drop-off location info, which of these would actually help you?",
      choices: [
        "Full street address",
        "A static map thumbnail",
        "\"Open in Google Maps\" button for directions",
        "A photo of the pickup point/landmark",
        "None of these, it's not needed"
      ],
      required: true
    },
    {
      type: "PARAGRAPH_TEXT",
      title: "Anything else about finding pickup/drop-off points you'd want us to know?",
      required: false
    }
  ]
};

function createForm() {
  const form = FormApp.create(SURVEY.title);
  if (SURVEY.description) form.setDescription(SURVEY.description);
  SURVEY.questions.forEach(function (question) {
    addQuestion(form, question);
  });
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
}

function addQuestion(form, question) {
  const required = !!question.required;
  switch (question.type) {
    case 'TEXT':
      form.addTextItem().setTitle(question.title).setRequired(required);
      break;
    case 'PARAGRAPH_TEXT':
      form.addParagraphTextItem().setTitle(question.title).setRequired(required);
      break;
    case 'MULTIPLE_CHOICE':
      form.addMultipleChoiceItem().setTitle(question.title).setChoiceValues(question.choices).setRequired(required);
      break;
    case 'CHECKBOX':
      form.addCheckboxItem().setTitle(question.title).setChoiceValues(question.choices).setRequired(required);
      break;
    case 'LIST':
      form.addListItem().setTitle(question.title).setChoiceValues(question.choices).setRequired(required);
      break;
    case 'SCALE':
      form.addScaleItem().setTitle(question.title).setBounds(question.lower, question.upper)
        .setLabels(question.lowerLabel || '', question.upperLabel || '').setRequired(required);
      break;
    default:
      throw new Error('Unsupported question type: ' + question.type);
  }
}
