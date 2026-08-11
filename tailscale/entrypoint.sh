#!/bin/sh
set -e

tailscaled --state=/var/lib/tailscale/tailscaled.state --socket=/var/run/tailscale/tailscaled.sock &

# Wait for tailscaled to come up before talking to it.
until tailscale status --json >/dev/null 2>&1; do
  sleep 0.5
done

tailscale up \
  --authkey="${TS_AUTHKEY}" \
  --hostname="${TS_HOSTNAME:-gpu-store-api}" \
  --accept-dns=false

# Vercel Hobby has no Secure Compute, so the API has to be reachable over the
# public internet. Funnel terminates HTTPS on this node and proxies to the
# api container, which shares this container's network namespace
# (network_mode: service:ts-api). CORS_ORIGIN on the api locks this down to
# requests from your Vercel origin, but the endpoint itself is public - real
# auth secrets matter here.
tailscale funnel --bg --https=443 http://127.0.0.1:3001

wait
