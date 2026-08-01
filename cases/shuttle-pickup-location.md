# Case: shuttle-pickup-location

## Current Condition

Booking a Bandung–Jakarta shuttle/travel ticket in the app, across all three
screens a user sees before and during booking:

1. **Search results** — bus/shuttle options list boarding and arrival points
   only by name (e.g. "Stop Point Pasteur", "Pasteur Trans Grogol", "Pool
   Bhinneka Shuttle Buah Batu"). No address, no map, no distance.
2. **Bus Details** — shows fleet specs (seat capacity, layout), facilities
   (AC, reclining seat), and reschedule/refund policy. Nothing about where
   the pickup/drop-off point actually is.
3. **Fill in Details (booking/review)** — shows date, route, time, operator,
   class, and refund/reschedule policy. Again, no pickup/drop-off location
   detail.

These pickup points are informal shuttle "pools" (a shophouse, a parking
lot on a named street) rather than proper terminals — the name alone
("Stop Point Pasteur") doesn't tell you where on that street it is.
Departures are often early morning (e.g. 04:00–05:30).

## Current UI

Three screens from the booking flow (search results list, Bus Details
modal, Fill in Details/booking review) — none of them include an address,
static map, map deep-link, or photo for the boarding or arrival point.

## Research Goal

Validate whether this is a real problem before building anything: do
frequent Bandung–Jakarta travelers actually struggle to find the exact
pickup/drop-off pool, has it ever caused them to be late or miss their
shuttle, and — if it is a real problem — which kind of location info
(full address, static map thumbnail, "open in Google Maps" button, photo
of the pickup point) would actually help them, so we know what's worth
building rather than assuming a map is the answer.
