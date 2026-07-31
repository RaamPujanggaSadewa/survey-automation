#!/usr/bin/env bash
# Prints the responses for a case's form as JSON (via the Apps Script
# exportResponses function). Redirect to responses/<case>.json yourself,
# or let your AI CLI capture and save it.
#
# Usage: ./scripts/fetch-responses.sh <case-name> [> responses/<case-name>.json]

set -euo pipefail

CASE_NAME="${1:-}"
if [ -z "$CASE_NAME" ]; then
  echo "Usage: $0 <case-name>" >&2
  exit 1
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

cd "$ROOT_DIR/apps-script"
clasp run exportResponses --params "[\"${CASE_NAME}\"]"
