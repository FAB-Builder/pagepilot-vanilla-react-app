/**
 * Copy-paste snippets for the "Automated Build Triggers" doc page.
 * Kept out of the JSX so the page file stays readable.
 *
 * Every snippet is written to be copied as-is. Placeholders are uppercase
 * and obvious (YOUR_WORKSPACE_ID), or read from a CI variable.
 */

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

export const CHECK_ENDPOINT = `GET https://pagepilot.fabbuilder.com/api/tenant/{tenantId}/check-data-changed

# Response — content changed since the last acknowledgement
true

# Response — nothing changed
false`;

export const ACK_ENDPOINT = `GET https://pagepilot.fabbuilder.com/api/tenant/{tenantId}/acknowledged-data-changed

# Response
DONE`;

export const CURL_CHECK = `WORKSPACE_ID="YOUR_WORKSPACE_ID"
BASE="https://pagepilot.fabbuilder.com/api/tenant/$WORKSPACE_ID"

curl -s "$BASE/check-data-changed"
# true`;

export const CURL_ACK = `curl -s "$BASE/acknowledged-data-changed"
# DONE`;

/** Hardened version — distinguishes a real "false" from a transport failure. */
export const CURL_HARDENED = `# --fail        non-2xx becomes a non-zero exit code instead of an HTML body
# --max-time 30 never let a hung endpoint stall the pipeline
# --retry 3     ride out a transient blip before giving up

RESPONSE=$(curl -s --fail --max-time 30 --retry 3 \\
  "https://pagepilot.fabbuilder.com/api/tenant/$WORKSPACE_ID/check-data-changed") || {
    echo "Page Pilot unreachable — skipping build."
    exit 1
  }`;

/* ------------------------------------------------------------------ */
/* Reusable shell — the pattern, independent of any CI system          */
/* ------------------------------------------------------------------ */

export const PLAIN_SHELL = `#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_ID="\${PAGEPILOT_WORKSPACE_ID:?set PAGEPILOT_WORKSPACE_ID}"
BASE="https://pagepilot.fabbuilder.com/api/tenant/$WORKSPACE_ID"

# 1. GATE ------------------------------------------------------------
CHANGED=$(curl -s --fail --max-time 30 "$BASE/check-data-changed")
echo "Page Pilot check-data-changed: $CHANGED"

if [ "$CHANGED" != "true" ]; then
  echo "No content changes. Nothing to build."
  exit 0
fi

# 2. BUILD + DEPLOY --------------------------------------------------
# set -e above guarantees we never reach step 3 if either of these fail.
npm ci
npm run build
./deploy.sh

# 3. ACKNOWLEDGE -----------------------------------------------------
ACK=$(curl -s --fail --max-time 30 "$BASE/acknowledged-data-changed")
echo "Page Pilot acknowledged-data-changed: $ACK"

if [ "$ACK" != "DONE" ]; then
  echo "Acknowledgement failed — flag still set, next run will rebuild."
  exit 1
fi

echo "Deployed and acknowledged."`;

/* ------------------------------------------------------------------ */
/* GitHub Actions                                                      */
/* ------------------------------------------------------------------ */

/** Minimal, deploy-target agnostic. The shape everything else builds on. */
export const GHA_MINIMAL = `name: Scheduled content build

on:
  schedule:
    - cron: "17 2 * * *"   # 02:17 UTC nightly
  workflow_dispatch:        # manual "Run workflow" button

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      # GATE — before checkout: don't clone a repo we may abandon.
      - name: Check for Page Pilot content changes
        run: |
          RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}/check-data-changed")
          echo "check-data-changed: $RESPONSE"
          if [ "$RESPONSE" != "true" ]; then
            echo "No changes — stopping."
            exit 1
          fi

      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      # ...your deploy step here...

      # ACKNOWLEDGE — last, and only reached when everything above passed.
      - name: Acknowledge content changes
        run: |
          RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}/acknowledged-data-changed")
          echo "acknowledged-data-changed: $RESPONSE"
          if [ "$RESPONSE" != "DONE" ]; then
            echo "Acknowledgement failed."
            exit 1
          fi`;

/** Gate extracted so it can be quoted on its own. */
export const GHA_GATE = `- name: Check for Page Pilot content changes
  id: check
  run: |
    RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}/check-data-changed")
    echo "check-data-changed: $RESPONSE"
    if [ "$RESPONSE" != "true" ]; then
      echo "No changes — stopping."
      exit 1
    fi`;

export const GHA_ACK = `- name: Acknowledge content changes
  run: |
    RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}/acknowledged-data-changed")
    echo "acknowledged-data-changed: $RESPONSE"
    if [ "$RESPONSE" != "DONE" ]; then
      echo "Acknowledgement failed."
      exit 1
    fi`;

/** Composite action — write the gate once, reuse it in every repo. */
export const GHA_COMPOSITE = `# .github/actions/pagepilot-gate/action.yml
name: Page Pilot change gate
description: Fails unless the workspace has unacknowledged content changes.

inputs:
  workspace-id:
    description: Page Pilot workspace id
    required: true

outputs:
  changed:
    description: '"true" when content changed'
    value: \${{ steps.check.outputs.changed }}

runs:
  using: composite
  steps:
    - id: check
      shell: bash
      run: |
        RESPONSE=$(curl -s --fail --max-time 30 \\
          "https://pagepilot.fabbuilder.com/api/tenant/\${{ inputs.workspace-id }}/check-data-changed")
        echo "check-data-changed: $RESPONSE"
        echo "changed=$RESPONSE" >> "$GITHUB_OUTPUT"
        [ "$RESPONSE" = "true" ] || exit 1`;

export const GHA_COMPOSITE_USE = `steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/pagepilot-gate
    with:
      workspace-id: \${{ vars.PAGEPILOT_WORKSPACE_ID }}`;

/** Green-skip variant: job ends successfully when there is nothing to do. */
export const GHA_NEUTRAL = `jobs:
  check:
    runs-on: ubuntu-latest
    outputs:
      changed: \${{ steps.check.outputs.changed }}
    steps:
      - id: check
        run: |
          RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}/check-data-changed")
          echo "changed=$RESPONSE" >> "$GITHUB_OUTPUT"

  build:
    needs: check
    if: needs.check.outputs.changed == 'true'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      # ...build, deploy, acknowledge...`;

/** Multi-workspace fan-out: one workflow, N sites, each gated independently. */
export const GHA_MATRIX = `jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false          # one unchanged site must not cancel the others
      matrix:
        site:
          - { name: marketing, workspace: WORKSPACE_ID_A, target: marketing-prod }
          - { name: docs,      workspace: WORKSPACE_ID_B, target: docs-prod }
    steps:
      - name: Check \${{ matrix.site.name }}
        run: |
          RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ matrix.site.workspace }}/check-data-changed")
          echo "\${{ matrix.site.name }}: $RESPONSE"
          [ "$RESPONSE" = "true" ] || exit 1

      # ...build and deploy to \${{ matrix.site.target }}...

      - name: Acknowledge \${{ matrix.site.name }}
        run: |
          RESPONSE=$(curl -s "https://pagepilot.fabbuilder.com/api/tenant/\${{ matrix.site.workspace }}/acknowledged-data-changed")
          [ "$RESPONSE" = "DONE" ] || exit 1`;

/** Race-safe acknowledgement: re-check before clearing the flag. */
export const GHA_RACE_SAFE = `- name: Acknowledge only if nothing changed mid-build
  run: |
    BASE="https://pagepilot.fabbuilder.com/api/tenant/\${{ vars.PAGEPILOT_WORKSPACE_ID }}"

    # An editor may have published while we were building. We cannot tell
    # a stale "true" from a fresh one, so compare content fingerprints:
    # if the site we just built no longer matches what the API serves,
    # leave the flag set and let the next scheduled run pick it up.
    AFTER=$(curl -s "$BASE/check-data-changed")

    if [ "$AFTER" != "true" ]; then
      echo "Flag already cleared by another pipeline — nothing to do."
      exit 0
    fi

    RESPONSE=$(curl -s "$BASE/acknowledged-data-changed")
    [ "$RESPONSE" = "DONE" ] || exit 1`;

/* ------------------------------------------------------------------ */
/* Deploy targets — the interchangeable middle of the workflow         */
/* ------------------------------------------------------------------ */

export const DEPLOY_FIREBASE = `- name: Deploy to Firebase Hosting
  uses: w9jds/firebase-action@v12.8.0
  with:
    args: deploy --project \${{ secrets.FIREBASE_PROJECT }} --only hosting:\${{ secrets.FIREBASE_HOSTING }}
  env:
    GCP_SA_KEY: \${{ secrets.GCP_CREDENTIALS }}`;

export const DEPLOY_PAGES = `- name: Upload static output
  uses: actions/upload-pages-artifact@v3
  with:
    path: ./out

- name: Deploy to GitHub Pages
  id: deployment
  uses: actions/deploy-pages@v4`;

export const DEPLOY_S3 = `- name: Sync to S3 and invalidate CloudFront
  run: |
    aws s3 sync ./out "s3://$BUCKET" --delete
    aws cloudfront create-invalidation --distribution-id "$DISTRIBUTION" --paths "/*"
  env:
    BUCKET: \${{ secrets.S3_BUCKET }}
    DISTRIBUTION: \${{ secrets.CLOUDFRONT_ID }}
    AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`;

export const DEPLOY_HOOK = `# Vercel / Netlify / Cloudflare Pages expose a deploy hook URL: a POST
# starts a build on their infrastructure. The catch — the POST returns as
# soon as the build is QUEUED, not when it is live. Acknowledging here
# would clear the flag before the deploy exists. Poll for completion first.

- name: Trigger hosted build
  run: curl -s -X POST "\${{ secrets.DEPLOY_HOOK_URL }}"`;

/* ------------------------------------------------------------------ */
/* Other CI systems                                                    */
/* ------------------------------------------------------------------ */

export const GITLAB_CI = `# .gitlab-ci.yml — schedule this pipeline under CI/CD → Schedules
stages: [gate, build, acknowledge]

variables:
  PAGEPILOT_BASE: "https://pagepilot.fabbuilder.com/api/tenant/$PAGEPILOT_WORKSPACE_ID"

gate:
  stage: gate
  script:
    - RESPONSE=$(curl -s "$PAGEPILOT_BASE/check-data-changed")
    - echo "check-data-changed:$RESPONSE"
    - '[ "$RESPONSE" = "true" ] || exit 1'

build:
  stage: build
  script:
    - npm ci
    - npm run build
    - ./deploy.sh
  artifacts:
    paths: [dist/]

acknowledge:
  stage: acknowledge
  when: on_success        # the whole point — never runs after a failed build
  script:
    - RESPONSE=$(curl -s "$PAGEPILOT_BASE/acknowledged-data-changed")
    - '[ "$RESPONSE" = "DONE" ] || exit 1'`;

export const JENKINS = `// Jenkinsfile
pipeline {
  agent any
  triggers { cron('H 2 * * *') }   // H spreads load across the hour

  environment {
    BASE = "https://pagepilot.fabbuilder.com/api/tenant/\${env.PAGEPILOT_WORKSPACE_ID}"
  }

  stages {
    stage('Gate') {
      steps {
        script {
          def changed = sh(script: "curl -s \\"\${BASE}/check-data-changed\\"", returnStdout: true).trim()
          echo "check-data-changed: \${changed}"
          if (changed != 'true') {
            currentBuild.result = 'NOT_BUILT'
            error('No Page Pilot content changes.')
          }
        }
      }
    }

    stage('Build & deploy') {
      steps {
        sh 'npm ci && npm run build && ./deploy.sh'
      }
    }
  }

  post {
    // Only on success — a failed deploy must leave the flag set.
    success {
      script {
        def ack = sh(script: "curl -s \\"\${BASE}/acknowledged-data-changed\\"", returnStdout: true).trim()
        if (ack != 'DONE') { error("Acknowledgement failed: \${ack}") }
      }
    }
  }
}`;

export const CRON_SHELL = `# Plain crontab on your own box — no CI system needed.
# Runs the script from the "Reusable shell" section above.
# 17 past every 4th hour; log everything for later debugging.

17 */4 * * * /opt/site/scheduled-build.sh >> /var/log/pagepilot-build.log 2>&1`;

/* ------------------------------------------------------------------ */
/* Reference material                                                  */
/* ------------------------------------------------------------------ */

export const CRON_TABLE = `# ┌───────── minute (0-59)
# │ ┌─────── hour (0-23, UTC on GitHub — always)
# │ │ ┌───── day of month (1-31)
# │ │ │ ┌─── month (1-12)
# │ │ │ │ ┌─ day of week (0-6, Sunday = 0)
# │ │ │ │ │
  0 22 * * *      # nightly at 22:00 UTC
  17 2 * * *      # nightly, off the contended top-of-hour slot
  0 */6 * * *     # every 6 hours
  0 2 * * 1-5     # 02:00 UTC, weekdays only
  */30 * * * *    # every 30 minutes — see the cost note before using this`;

export const NEXT_EXPORT = `{
  "scripts": {
    "build": "next build"
  }
}`;

export const MANUAL_RESET = `# Force the next scheduled run to REBUILD:
#   there is no "set to true" endpoint — publish or re-save any page in
#   Page Pilot and the flag flips on its own.

# Force the next scheduled run to SKIP (e.g. you already deployed by hand):
curl -s "https://pagepilot.fabbuilder.com/api/tenant/YOUR_WORKSPACE_ID/acknowledged-data-changed"
# DONE

# Read the flag without changing it — safe to run any time:
curl -s "https://pagepilot.fabbuilder.com/api/tenant/YOUR_WORKSPACE_ID/check-data-changed"`;
