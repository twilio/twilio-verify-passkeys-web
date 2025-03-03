#!/bin/bash

if [ $# -ne 5 ]; then
    echo "Usage: $0 <WEB_URL> <TRIGGERING_WORKFLOW_ID> <TRIGGERING_WORKFLOW_WAITING_JOB_NAME>"
    exit 1
fi

APP_DOWNLOAD_URL=$1
TRIGGERING_WORKFLOW_ID=$2
TRIGGERING_WORKFLOW_WAITING_JOB_NAME=$3

DATA_PAYLOAD=$(jq -n \
--arg triggering_workflow_id "$TRIGGERING_WORKFLOW_ID" \
--arg triggering_workflow_waiting_job_name "$TRIGGERING_WORKFLOW_WAITING_JOB_NAME" \
'{
    "branch": "main",
    "parameters": {
        "trigger-web-workflow": true,
        "triggering-workflow-id": $triggering_workflow_id,
        "triggering-workflow-waiting-job-name": $triggering_workflow_waiting_job_name
    }
}')

DATA_PAYLOAD=$(echo "$DATA_PAYLOAD" | jq --arg web_url "$WEB_URL" '.parameters["web-url"]=$web_url')

TRIGGERED_PIPELINE=$(curl --request POST \
  --url https://circleci.com/api/v2/project/gh/twilio/twilio-verify-passkeys-tests/pipeline \
  --header "Circle-Token: $CIRCLE_TOKEN" \
  --header "Content-Type: application/json" \
  --data "$DATA_PAYLOAD" | jq -r '.id')

# Check if the pipeline creation was successful
if [ -z "$TRIGGERED_PIPELINE" ]; then
    echo "Failed to create pipeline"
    exit 1
fi

echo "$TRIGGERED_PIPELINE"