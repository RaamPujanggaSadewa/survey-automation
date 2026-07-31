#!/usr/bin/env bash
# Copies specs/<case>.slides.gs into the Apps Script project, pushes it, and
# runs createSlidesFromSpec to create the Google Slides deck.
#
# Usage: ./scripts/generate-slides.sh <case-name>

set -euo pipefail

CASE_NAME="${1:-}"
if [ -z "$CASE_NAME" ]; then
  echo "Usage: $0 <case-name>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPEC_FILE="$ROOT_DIR/specs/${CASE_NAME}.slides.gs"

if [ ! -f "$SPEC_FILE" ]; then
  echo "Slides spec not found: $SPEC_FILE" >&2
  echo "Generate it first from the case's responses (see specs/README.md)." >&2
  exit 1
fi

cp "$SPEC_FILE" "$ROOT_DIR/apps-script/SlidesSpec.gs"

cd "$ROOT_DIR/apps-script"
clasp push
clasp run createSlidesFromSpec
