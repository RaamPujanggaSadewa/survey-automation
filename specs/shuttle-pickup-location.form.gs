/**
 * Traveloka UX Survey Generator (FIXED)
 * Run this script in Google Apps Script (https://script.google.com).
 */
function createTravelokaSurvey() {
  // 1. Create the Form
  var form = FormApp.create('Traveloka Bus & Shuttle Experience Survey (Bandung ↔ Jakarta)');
  form.setDescription('Help us improve the Traveloka Bus & Shuttle booking experience! If you travel between Bandung and Jakarta using shuttles/buses booked on Traveloka, we’d love 3 minutes of your feedback.');

  // --- SECTION 1: Profile ---
  form.addMultipleChoiceItem()
    .setTitle('1. How often do you travel between Bandung and Jakarta?')
    .setRequired(true)
    .setChoiceValues([
      '2+ times a week',
      'Once a week (weekend commuter)',
      '2–3 times a month',
      'Once a month or less'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('2. How often do you use Traveloka to book your shuttle/bus tickets for this route?')
    .setRequired(true)
    .setChoiceValues([
      'Always (Traveloka is my main app)',
      'Frequently',
      'Occasionally (I compare Traveloka with other apps)',
      'Rarely'
    ]);

  // --- SECTION 2: Current Experience ---
  form.addPageBreakItem().setTitle('SECTION 2: Current Experience & Location Friction');

  form.addSectionHeaderItem()
    .setTitle('📸 Reference Image 1: Shuttle Search Results Card')
    .setHelpText('Refer to the shuttle options list in Traveloka showing stop names like "Stop Point Pasteur" and "Pasteur Trans Grogol".');

  form.addMultipleChoiceItem()
    .setTitle('3. When looking at shuttle options on Traveloka (like Image 1), how often are you unsure of the EXACT physical location of the pool?')
    .setRequired(true)
    .setChoiceValues([
      'Always — Pool names like "Stop Point Pasteur" are too vague',
      'Sometimes — Depends on whether I\'ve been to that pool before',
      'Rarely — I usually know where the pool is',
      'Never — I am completely familiar with all stop points'
    ]);

  form.addMultipleChoiceItem()
    .setTitle('4. While using Traveloka, do you ever leave the app to search for the pool location on Google Maps or Gojek/Grab before paying?')
    .setRequired(true)
    .setChoiceValues([
      'Yes, almost every time',
      'Yes, if it\'s an unfamiliar pool name',
      'No, I just book and figure it out later',
      'No, I already know the location'
    ]);

  form.addCheckboxItem()
    .setTitle('5. Have you ever experienced any of these issues when booking a shuttle on Traveloka?')
    .setChoiceValues([
      'Went to the wrong pool (e.g., went to DayTrans Pasteur instead of Pasteur Trans)',
      'Struggled to order Gojek/Grab to/from the pool because Traveloka didn\'t show the street address',
      'Arrived late or almost missed the vehicle due to location confusion',
      'Got dropped off at a spot far from my actual destination in Jakarta/Bandung',
      'None of the above'
    ]);

  // --- SECTION 3: Proposed Enhancements ---
  form.addPageBreakItem().setTitle('SECTION 3: Proposed Enhancements & Feature Validation');

  form.addSectionHeaderItem()
    .setTitle('📸 Reference Image 3: Current Traveloka Bus Details Page')
    .setHelpText('Refer to Traveloka\'s Bus Details page showing vehicle specs and policies, but no street address or map pin.');

  form.addGridItem()
    .setTitle('6. As shown in Image 3, the Bus Details page currently displays vehicle specs and policies. How important is it for Traveloka to add the following location details BEFORE booking?')
    .setRows([
      'Full Street Address & Landmark (e.g., Jl. Dr. Djunjunan No. 127, across BTC Mall)',
      'Interactive Google Maps Pin / Preview directly inside Traveloka',
      '"Open in Google Maps / Waze" button on the e-ticket & details',
      '"Set as destination in Gojek / Grab" shortcut'
    ])
    .setColumns(['1 (Not needed)', '2', '3', '4', '5 (Must-have)']);

  form.addMultipleChoiceItem()
    .setTitle('7. Would adding full street addresses and interactive Google Maps make you more likely to book shuttle tickets on Traveloka instead of other platforms?')
    .setRequired(true)
    .setChoiceValues([
      'Yes, definitely',
      'Probably yes',
      'No difference / Neutral',
      'No'
    ]);

  // --- SECTION 4: Open Feedback ---
  form.addPageBreakItem().setTitle('SECTION 4: Open Feedback');

  form.addParagraphTextItem()
    .setTitle('8. What is one feature or information piece Traveloka is currently missing that would make your Bandung ↔ Jakarta commute much easier?');

  Logger.log('==================================================');
  Logger.log('SUCCESS! Form Created.');
  Logger.log('Edit URL: ' + form.getEditUrl());
  Logger.log('Published URL: ' + form.getPublishedUrl());
  Logger.log('==================================================');
}
