/**
 * Fixed engine: builds a Google Slides deck from the SLIDES_SPEC object
 * defined in SlidesSpec.gs. SlidesSpec.gs is swapped out per case by
 * scripts/generate-slides.sh — this file never changes between cases.
 */
function createSlidesFromSpec() {
  var spec = SLIDES_SPEC;
  var deck = SlidesApp.create(spec.title);

  var titleSlide = deck.getSlides()[0];
  setPlaceholderText(titleSlide, SlidesApp.PlaceholderType.TITLE, spec.title);
  if (spec.subtitle) {
    setPlaceholderText(titleSlide, SlidesApp.PlaceholderType.SUBTITLE, spec.subtitle);
  }

  (spec.sections || []).forEach(function (section) {
    var slide = deck.appendSlide(SlidesApp.PredefinedLayout.TITLE_AND_BODY);
    setPlaceholderText(slide, SlidesApp.PlaceholderType.TITLE, section.heading);
    setPlaceholderText(slide, SlidesApp.PlaceholderType.BODY, (section.bullets || []).join('\n'));
  });

  var url = deck.getUrl();
  Logger.log('Slides URL: ' + url);
  return url;
}

function setPlaceholderText(slide, placeholderType, text) {
  var placeholder = slide.getPlaceholder(placeholderType);
  if (placeholder && text) {
    placeholder.asShape().getText().setText(text);
  }
}
