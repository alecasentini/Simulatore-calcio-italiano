#!/bin/bash
# Supervisor: rilancia tools/_play_50_seasons.js finché non arriva a DONE
# (50 stagioni raggiunte, stuck genuino, o troppi crash consecutivi).
# Il gioco si auto-salva (localStorage su un profilo Chromium persistente),
# quindi ogni restart riprende la carriera invece di ripartire da zero.
cd "$(dirname "$0")"

rm -rf _play_profile
node _play_50_seasons.js --fresh
FIRST_EXIT=$?

MAX_RESTARTS=40
i=0
while [ $i -lt $MAX_RESTARTS ]; do
  if grep -qE "^\[.*\] DONE$|Reached 50 seasons|genuinely stuck" _play_log.txt 2>/dev/null; then
    echo "SUPERVISOR: terminal condition reached, stopping."
    break
  fi
  i=$((i+1))
  echo "SUPERVISOR: restart #$i (previous run exited/crashed)"
  node _play_50_seasons.js
done

echo "SUPERVISOR: loop ended after $i restarts."
