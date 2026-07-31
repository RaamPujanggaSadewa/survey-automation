/**
 * Reads back the responses for a case's form (looked up by the caseName
 * that createFormFromSpec stored) so an AI can synthesize them into a
 * slides spec.
 */
function exportResponses(caseName) {
  var formId = PropertiesService.getScriptProperties().getProperty('form_' + caseName);
  if (!formId) {
    throw new Error('No stored form ID for case: ' + caseName);
  }

  var form = FormApp.openById(formId);
  var responses = form.getResponses().map(function (response) {
    var answers = {};
    response.getItemResponses().forEach(function (itemResponse) {
      answers[itemResponse.getItem().getTitle()] = itemResponse.getResponse();
    });
    return { timestamp: response.getTimestamp(), answers: answers };
  });

  var json = JSON.stringify(
    { caseName: caseName, formId: formId, responseCount: responses.length, responses: responses },
    null,
    2
  );

  Logger.log(json);
  return json;
}
