#!/bin/sh
if ($(docker ps | grep -q local-dev-proxy)); then
  echo "Development hosts proxy is already running."
  exit 0
fi

echo "Starting development hosts proxy... "
docker network create local-dev-proxy > /dev/null 2>&1 || true
(docker run \
    -d \
    --rm \
    -p 80:80 \
    -p 443:443 \
    -p 8080:8080 \
    -v /var/run/docker.sock:/var/run/docker.sock:ro \
    --name local-dev-proxy \
    --network local-dev-proxy \
    traefik:v2.4 \
    --api.insecure=true \
    --providers.docker=true \
    --providers.docker.exposedbydefault=false \
    --entrypoints.web.address=:80 \
    --entrypoints.web-secure.address=:443 \
    --entrypoints.traefik.address=:8080 > /dev/null && echo "started")
