#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
IMAGE="${DOCKER_IMAGE:-frontend-bucket:prod}"
BUILDER="${DOCKER_BUILDX_BUILDER:-frontend-bucket-prod}"

cd "$ROOT"

if [[ ! -f .env.production ]]; then
  echo "Errore: manca .env.production (NEXT_PUBLIC_* per il build Next)." >&2
  exit 1
fi

if ! docker buildx inspect "$BUILDER" >/dev/null 2>&1; then
  docker buildx create --name "$BUILDER" --driver docker-container --bootstrap --use
else
  docker buildx use "$BUILDER"
fi

docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t "$IMAGE" \
  --push \
  .
