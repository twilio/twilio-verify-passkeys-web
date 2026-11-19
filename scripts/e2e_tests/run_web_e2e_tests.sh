#!/bin/bash

# Prints the values needed to start the web E2E tests pipeline for this run.

# Usage: ./run_web_e2e_tests.sh <WORKFLOW_ID> <WAITING_JOB_NAME>

set -euo pipefail

WORKFLOW_ID="${1:?Usage: $0 <WORKFLOW_ID> <WAITING_JOB_NAME>}"
WAITING_JOB_NAME="${2:?Usage: $0 <WORKFLOW_ID> <WAITING_JOB_NAME>}"

echo "trigger-web"
echo "workflow-id: $WORKFLOW_ID"
echo "waiting-job-name: $WAITING_JOB_NAME"
