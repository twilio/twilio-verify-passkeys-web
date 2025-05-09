#!/bin/bash

if [ $# -ne 3 ]; then
    echo "Usage: $0 <WEB_URL> <TRIGGERING_WORKFLOW_ID> <TRIGGERING_WORKFLOW_WAITING_JOB_NAME>"
    exit 1
fi

WEB_URL=$1
TRIGGERING_WORKFLOW_ID=$2
TRIGGERING_WORKFLOW_WAITING_JOB_NAME=$3

echo "trigger-web-workflow"
echo "triggering-workflow-id: $TRIGGERING_WORKFLOW_ID"
echo "triggering-workflow-waiting-job-name: $TRIGGERING_WORKFLOW_WAITING_JOB_NAME"
echo "web_url: $WEB_URL"