#!/usr/bin/env bash
# Copies specs/<case>.spec.gs into the Apps Script project, pushes it, and
# runs createFormFromSpec to create the live Google Form.
#
# Usage: ./scripts/generate-form.sh <case-name>

set -euo pipefail

CASE_NAME="${1:-}"
if [ -z "$CASE_NAME" ]; then
  echo "Usage: $0 <case-name>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SPEC_FILE="$ROOT_DIR/specs/${CASE_NAME}.spec.gs"

if [ ! -f "$SPEC_FILE" ]; then
  echo "Spec not found: $SPEC_FILE" >&2
  echo "Generate it first (see specs/README.md)." >&2
  exit 1
fi

cp "$SPEC_FILE" "$ROOT_DIR/apps-script/Spec.gs"

cd "$ROOT_DIR/apps-script"
clasp push
clasp run createFormFromSpec
