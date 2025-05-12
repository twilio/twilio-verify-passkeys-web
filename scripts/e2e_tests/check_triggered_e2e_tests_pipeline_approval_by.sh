#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 <TRIGGERED_WORKFLOW> <JOB_NAME_TO_CHECK>"
    exit 1
fi

TRIGGERED_WORKFLOW=$1
JOB_NAME_TO_CHECK=$2

# Fetch the job's approval for the triggered workflow
TRIGGERED_JOB_APPROVAL_BY=$(curl --request GET \
  --url "https://circleci.com/api/v2/workflow/${TRIGGERED_WORKFLOW}/job" \
  --header "Circle-Token: $CIRCLE_TOKEN" \
  --header "Content-Type: application/json" | \
  jq -r --arg JOB_NAME "$JOB_NAME_TO_CHECK" \
  '.items[] | select(.type == "approval") | select(.name == $JOB_NAME) | .approved_by')

if [ -z "$TRIGGERED_JOB_APPROVAL_BY" ]; then
    echo "Error: Workflow '$JOB_NAME_TO_CHECK' not found in workflow '$TRIGGERED_WORKFLOW'."
    exit 1
fi

# Get approver
WHO_APPROVED=$(curl --request GET \
  --url "https://circleci.com/api/v2/user/${TRIGGERED_JOB_APPROVAL_BY}" \
  --header "Circle-Token: $CIRCLE_TOKEN" \
  --header "Content-Type: application/json" | \
  jq -r .login)

echo $WHO_APPROVED