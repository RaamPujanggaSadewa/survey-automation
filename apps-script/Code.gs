/**
 * Fixed engine: builds a Google Form from the SURVEY_SPEC object defined in
 * Spec.gs. Spec.gs is swapped out per case by scripts/generate-form.sh — this
 * file never changes between cases.
 */
function createFormFromSpec() {
  var spec = SURVEY_SPEC;
  var form = FormApp.create(spec.title);

  if (spec.description) {
    form.setDescription(spec.description);
  }

  spec.questions.forEach(function (question) {
    addQuestion(form, question);
  });

  if (spec.caseName) {
    PropertiesService.getScriptProperties().setProperty('form_' + spec.caseName, form.getId());
  }

  var editUrl = form.getEditUrl();
  var publishedUrl = form.getPublishedUrl();
  Logger.log('Edit URL: ' + editUrl);
  Logger.log('Published URL: ' + publishedUrl);

  return { editUrl: editUrl, publishedUrl: publishedUrl };
}

function addQuestion(form, question) {
  var required = !!question.required;

  switch (question.type) {
    case 'TEXT':
      form.addTextItem().setTitle(question.title).setRequired(required);
      break;

    case 'PARAGRAPH_TEXT':
      form.addParagraphTextItem().setTitle(question.title).setRequired(required);
      break;

    case 'MULTIPLE_CHOICE':
      form.addMultipleChoiceItem()
        .setTitle(question.title)
        .setChoiceValues(question.choices)
        .setRequired(required);
      break;

    case 'CHECKBOX':
      form.addCheckboxItem()
        .setTitle(question.title)
        .setChoiceValues(question.choices)
        .setRequired(required);
      break;

    case 'LIST':
      form.addListItem()
        .setTitle(question.title)
        .setChoiceValues(question.choices)
        .setRequired(required);
      break;

    case 'SCALE':
      form.addScaleItem()
        .setTitle(question.title)
        .setBounds(question.lower, question.upper)
        .setLabels(question.lowerLabel || '', question.upperLabel || '')
        .setRequired(required);
      break;

    default:
      throw new Error('Unsupported question type: ' + question.type);
  }
}
