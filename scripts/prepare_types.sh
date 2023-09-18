#!/bin/bash

PACKAGE="@allensarkisyan/schwab-td-ameritrade-streamer"
DECLARATIONS="index.d.ts"

sed -i \
-e "s|'td-streamer'|'$PACKAGE'|g" \
-e "s|'td-constants'|'$PACKAGE/td-constants'|g" \
-e "s|'td-notifications'|'$PACKAGE/td-notifications'|g" \
-e "s|'td-stream-event-processor'|'$PACKAGE/td-stream-event-processor'|g" \
-e "s|'utils'|'$PACKAGE/utils'|g" \
-e "s|'@types/index'|'$PACKAGE/@types'|g" \
"$DECLARATIONS"