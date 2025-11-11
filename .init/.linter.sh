#!/bin/bash
cd /home/kavia/workspace/code-generation/weekly-status-report-dashboard-222256-222275/frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

