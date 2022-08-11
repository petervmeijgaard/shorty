# ==================================
# Base stage
# ==================================

FROM node:16-alpine3.15 as base

ARG S6_OVERLAY_VERSION=3.1.0.1

LABEL maintainer="pvanmeijgaard@anwb.nl"

WORKDIR /var/www

RUN apk add --no-cache \
    git \
    curl

# Enable corepack and install PNPM
RUN corepack enable && \
    corepack prepare pnpm@v7.9.1 --activate

# Add S6 to keep the container running
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-noarch.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-noarch.tar.xz
ADD https://github.com/just-containers/s6-overlay/releases/download/v${S6_OVERLAY_VERSION}/s6-overlay-x86_64.tar.xz /tmp
RUN tar -C / -Jxpf /tmp/s6-overlay-x86_64.tar.xz

ENV S6_BEHAVIOUR_IF_STAGE2_FAILS=2

COPY docker/base /

ENTRYPOINT ["/init"]

# ==================================
# Local development stage
# ==================================
FROM base as local
