import type { ReactNode } from 'react';
import DocLayout, { type DocSection } from '../../../components/DocLayout';
import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import ApiTable from '../../../components/ApiTable';
import WorkspaceIdNote, { WorkspaceIdLink } from '../../../components/WorkspaceIdNote';
import { PAGES_SUBMODULES } from '../subModules';
import {
  CHECK_ENDPOINT,
  ACK_ENDPOINT,
  CURL_CHECK,
  CURL_ACK,
  CURL_HARDENED,
  PLAIN_SHELL,
  GHA_MINIMAL,
  GHA_GATE,
  GHA_ACK,
  GHA_COMPOSITE,
  GHA_COMPOSITE_USE,
  GHA_NEUTRAL,
  GHA_MATRIX,
  GHA_RACE_SAFE,
  DEPLOY_FIREBASE,
  DEPLOY_PAGES,
  DEPLOY_S3,
  DEPLOY_HOOK,
  GITLAB_CI,
  JENKINS,
  CRON_SHELL,
  CRON_TABLE,
  NEXT_EXPORT,
  MANUAL_RESET,
} from './snippets';

const SECTIONS: DocSection[] = [
  { id: 'overview', label: 'What this does' },
  { id: 'when', label: 'Do you need this?' },
  { id: 'lifecycle', label: 'How the flag works' },
  { id: 'api', label: 'The two endpoints' },
  { id: 'pattern', label: 'The idea in one script' },
  { id: 'quickstart', label: 'Set it up in 5 minutes' },
  { id: 'anatomy', label: 'What each step does' },
  { id: 'deploy-targets', label: 'Your deploy step' },
  { id: 'recipes', label: 'Going further' },
  { id: 'other-ci', label: 'Not using GitHub?' },
  { id: 'cron', label: 'Picking a schedule' },
  { id: 'operating', label: 'Day-to-day & fixing problems' },
  { id: 'pitfalls', label: 'Mistakes to avoid' },
];

/* ------------------------------------------------------------------ */
/* Small presentational helpers — keep the prose below readable.       */
/* ------------------------------------------------------------------ */

/** Callout box. `tone` picks the colour: neutral tip vs amber warning. */
function Note({
  tone = 'default',
  label,
  children,
}: {
  tone?: 'default' | 'warn';
  label: string;
  children: ReactNode;
}) {
  const styles =
    tone === 'warn' ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-white';
  return (
    <div className={`my-4 rounded-xl border p-4 text-sm text-slate-600 ${styles}`}>
      <strong className="text-ink">{label}</strong> {children}
    </div>
  );
}

/** Bordered card used inside bullet lists. */
function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <li className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-semibold text-ink">{title}</p>
      <div className="mt-1 space-y-2">{children}</div>
    </li>
  );
}

/** Numbered step inside a walkthrough list. */
function Step({ n, title, children }: { n: number; title: string; children?: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
        {n}
      </span>
      <div>
        <p className="font-semibold text-ink">{title}</p>
        {children ? <div className="mt-1 space-y-2">{children}</div> : null}
      </div>
    </li>
  );
}

/** Wrapper for a list of <Step>s. */
function Steps({ children }: { children: ReactNode }) {
  return (
    <ol className="my-4 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
      {children}
    </ol>
  );
}

/** Sub-heading inside a section — lighter than the section <h2>. */
function H3({ children }: { children: ReactNode }) {
  return <p className="mt-6 mb-2 font-semibold text-ink">{children}</p>;
}

export default function BuildTriggers() {
  return (
    <DocLayout
      title="Automated Build Triggers"
      sections={SECTIONS}
      subModules={PAGES_SUBMODULES}
      subModulesLabel="Pages"
    >
      <article>
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Automated Build Triggers
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-slate-600">
            Rebuild your website automatically when someone edits a page in Page Pilot — and
            <strong className="text-ink"> only</strong> when someone edits a page. No wasted
            builds, no “did anyone change anything?” guessing.
          </p>

          <div className="mt-5 rounded-xl border border-indigo-200 bg-indigo-50 p-5">
            <p className="text-sm font-semibold text-ink">In one sentence</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
              Page Pilot keeps a little “something changed” switch for your workspace. Your build
              pipeline checks the switch before it does anything, and flips it back off once the
              new version is live.
            </p>
          </div>
        </header>

        {/* ================================================================ */}
        <Section id="overview" title="What this does">
          <H3>The problem</H3>
          <p>
            If your website is <strong>statically generated</strong> — Next.js export, Gatsby,
            Astro, Hugo — the page content gets baked into HTML files when the site is built. That
            build happens once, then the files sit on a server.
          </p>
          <p>
            So when an editor publishes a page in Page Pilot, the new content is live in the API
            straight away, but your website still shows the old version. Someone has to rebuild
            the site before visitors see the change.
          </p>

          <H3>The fix</H3>
          <p>
            Page Pilot tracks one yes/no value per workspace: <em>has anything changed since the
            last time we rebuilt?</em> Your pipeline runs on a timer, checks that value first, and
            only builds when the answer is yes.
          </p>

          <Steps>
            <Step n={1} title="Someone edits a page">
              <p>
                An editor publishes or re-saves a page in Page Pilot. Behind the scenes the switch
                flips to <Code>true</Code>. Nobody has to remember to do anything.
              </p>
            </Step>
            <Step n={2} title="Your timer fires">
              <p>Every night (or every hour — your call), your pipeline wakes up.</p>
            </Step>
            <Step n={3} title="It asks Page Pilot: anything new?">
              <p>
                One request to <Code>check-data-changed</Code>. If the answer isn't{' '}
                <Code>true</Code>, the pipeline stops immediately — nothing installed, nothing
                built, nothing deployed.
              </p>
            </Step>
            <Step n={4} title="It builds and deploys">
              <p>Your normal pipeline, completely unchanged. Only reached when there was a change.</p>
            </Step>
            <Step n={5} title="It flips the switch back off">
              <p>
                One request to <Code>acknowledged-data-changed</Code>. Tomorrow's run will do
                nothing unless somebody edits again.
              </p>
            </Step>
          </Steps>

          <Note label="The one rule to remember:">
            flip the switch off <em>last</em>, and only if the deploy actually worked. If you flip
            it off too early and the deploy then fails, Page Pilot thinks the change is already
            published — so no future run will fix it, and your site quietly stays out of date.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="when" title="Do you need this?">
          <H3>Yes, if…</H3>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              Your site is <strong>built once and served as files</strong> — Next.js export,
              Gatsby, Astro, Hugo, Eleventy.
            </li>
            <li>
              Your content editors <strong>never touch the code</strong>, so there's no commit to
              kick off a build.
            </li>
            <li>
              Waiting a few minutes or hours between publishing and going live is fine.
            </li>
          </ul>

          <H3>No, if…</H3>
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              Your site <strong>fetches Page Pilot content when a visitor loads the page</strong>{' '}
              (client-side, server-rendered, or ISR with a short revalidate). Your content is
              already live — there's nothing to rebuild.
            </li>
            <li>
              You need changes live <strong>within seconds</strong>. A timer is the wrong tool for
              that; fetch at runtime instead.
            </li>
          </ul>

          <H3>Why not just rebuild every night anyway?</H3>
          <p>
            Fair question — it's simpler. But it costs you in three real ways:
          </p>
          <ul className="my-3 space-y-4 text-sm text-slate-600">
            <Card title="You pay for builds that change nothing">
              <p>
                A full install plus build, every night, 365 nights a year — and most of those
                produce an identical website. On a private repo, those minutes are on your bill.
              </p>
            </Card>
            <Card title="Your deploy history becomes noise">
              <p>
                Every build creates a new release and clears CDN caches. When every night has a
                deploy, you can't answer “when did this page actually change?” by looking at the
                history.
              </p>
            </Card>
            <Card title="More builds, more ways to break">
              <p>
                Every build re-downloads your dependencies. One bad package release can break a
                deploy that had no reason to run in the first place.
              </p>
            </Card>
          </ul>
          <p>
            The switch turns “rebuild on a timer” into “rebuild on a timer, but only when there's
            something to rebuild” — with no extra servers, webhooks or queues to maintain.
          </p>
        </Section>

        {/* ================================================================ */}
        <Section id="lifecycle" title="How the flag works">
          <p>
            The switch belongs to your <strong>whole workspace</strong>, not to one page. Editing
            any page anywhere turns it on. One acknowledgement turns it off for everything.
          </p>

          <div className="scroll-slim my-4 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-5">
            <pre className="font-mono text-xs leading-relaxed text-slate-600">{`  someone publishes a page
           │
           ▼
   switch ── ON ─────────────────────────────────┐
           │                                     │
  02:17    ▼                            02:17    ▼
   "anything new?" → yes                 "anything new?" → no
           │                                     │
        build                                  stop
           │                                     │
        deploy                        (nothing built or deployed,
           │                           switch stays off)
   "we've published it" → DONE
           │
   switch ── OFF`}</pre>
          </div>

          <ul className="my-3 space-y-4 text-sm text-slate-600">
            <Card title="Turns it ON">
              <p>
                Publishing a page, re-saving a published page, and other content edits made in
                Page Pilot. There's no way to switch it on by hand — it happens as a result of
                editing.
              </p>
            </Card>
            <Card title="Turns it OFF">
              <p>
                Only <Code>acknowledged-data-changed</Code>. Calling it when it's already off is
                harmless — you get <Code>DONE</Code> and nothing changes.
              </p>
            </Card>
            <Card title="Does NOT turn it on">
              <p>
                Pushing code. The switch only watches Page Pilot content. Change a template or some
                CSS and the switch stays off — see{' '}
                <a className="text-brand hover:underline" href="#pitfalls">
                  Mistakes to avoid
                </a>
                .
              </p>
            </Card>
            <Card title="A missed run costs you nothing">
              <p>
                If a scheduled run never happens, the switch just stays on and the next run picks
                the change up. Nothing depends on any single run succeeding.
              </p>
            </Card>
          </ul>
        </Section>

        {/* ================================================================ */}
        <Section id="api" title="The two endpoints">
          <p>
            Both are plain <Code>GET</Code> requests. No body, no auth header, no JSON — they
            answer with a bare word like <Code>true</Code>. Compare it as text.
          </p>
          <WorkspaceIdNote />

          <H3>1. Check — “has anything changed?”</H3>
          <CodeSnippet code={CHECK_ENDPOINT} language="http" title="check-data-changed" />
          <p className="mt-2 text-sm text-slate-500">
            Just reads the switch. Safe to call as often as you like, including by hand while
            you're debugging.
          </p>

          <H3>2. Acknowledge — “we've published it”</H3>
          <CodeSnippet code={ACK_ENDPOINT} language="http" title="acknowledged-data-changed" />
          <p className="mt-2 text-sm text-slate-500">
            The only thing that turns the switch off. Call it once, after a deploy has succeeded.
          </p>

          <H3>What you send</H3>
          <ApiTable
            rows={[
              {
                property: 'workspaceId',
                description:
                  'Your Page Pilot workspace id — the long string in your dashboard URL. Goes in the path. Required.',
                type: 'string (path)',
              },
            ]}
          />

          <H3>What you get back</H3>
          <ApiTable
            rows={[
              {
                property: 'true',
                description:
                  'From check — something changed since your last build. Go ahead and rebuild.',
                type: 'text',
              },
              {
                property: 'false',
                description: 'From check — nothing changed. Skip the build.',
                type: 'text',
              },
              {
                property: 'DONE',
                description:
                  'From acknowledge — the switch is now off. Anything else means it did not work, so stop the pipeline and let someone know.',
                type: 'text',
              },
            ]}
          />

          <H3>Try it yourself</H3>
          <p>Paste your workspace id and run these in a terminal:</p>
          <CodeSnippet code={CURL_CHECK} language="bash" title="read the switch" />
          <div className="mt-3" />
          <CodeSnippet code={CURL_ACK} language="bash" title="turn the switch off" />
          <Note tone="warn" label="Heads up:">
            that second command is real — it turns the switch off for your live workspace. If a
            change was waiting, your next scheduled build will skip it and your site stays out of
            date until someone edits another page.
          </Note>

          <H3>Making the request more reliable</H3>
          <p>
            A plain <Code>curl</Code> returns an empty response if the network hiccups, which looks
            exactly like a real <Code>false</Code> in your logs. For production, add a few flags so
            you can tell the difference:
          </p>
          <CodeSnippet code={CURL_HARDENED} language="bash" title="safer version" />
        </Section>

        {/* ================================================================ */}
        <Section id="pattern" title="The idea in one script">
          <p>
            Before any CI-specific config, here's the whole thing as a shell script. Everything
            later in this page is just this script written in a different pipeline language — get
            this and you can set it up anywhere.
          </p>
          <CodeSnippet code={PLAIN_SHELL} language="bash" title="scheduled-build.sh" />
          <ul className="my-4 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <Code>set -euo pipefail</Code> at the top is what keeps this safe: if the build or
              deploy fails, the script stops there and never reaches the acknowledge line. Every
              example below does the same thing in its own way.
            </li>
            <li>
              Here the gate exits with <Code>0</Code> (success), because a skipped run on your own
              machine isn't an error. On GitHub the convention is the opposite — explained in{' '}
              <a className="text-brand hover:underline" href="#recipes">
                Going further
              </a>
              .
            </li>
          </ul>
        </Section>

        {/* ================================================================ */}
        <Section id="quickstart" title="Set it up in 5 minutes">
          <p>Three things to do, then you're done.</p>

          <Steps>
            <Step n={1} title="Save your workspace id">
              <p>
                Grab it from <WorkspaceIdLink /> — open your workspace and copy the long string
                from the address bar.
              </p>
              <p>
                Then in your repo: <strong>Settings → Secrets and variables → Actions → Variables
                → New variable</strong>. Name it <Code>PAGEPILOT_WORKSPACE_ID</Code> and paste the
                id in.
              </p>
            </Step>
            <Step n={2} title="Add the workflow file">
              <p>
                Copy the YAML below into{' '}
                <Code>.github/workflows/scheduled-content-build.yml</Code>.
              </p>
            </Step>
            <Step n={3} title="Drop in your deploy step">
              <p>
                Replace the commented line with however you ship your site. Ready-made snippets for
                Firebase, GitHub Pages, S3 and others are in{' '}
                <a className="text-brand hover:underline" href="#deploy-targets">
                  Your deploy step
                </a>
                .
              </p>
            </Step>
          </Steps>

          <CodeSnippet
            code={GHA_MINIMAL}
            language="yaml"
            title=".github/workflows/scheduled-content-build.yml"
          />

          <p className="mt-4">
            The <Code>npm run build</Code> line should be whatever produces your static files — for
            a Next.js export that's:
          </p>
          <CodeSnippet code={NEXT_EXPORT} language="json" title="package.json" />

          <Note label="Why a variable and not a secret?">
            Your workspace id isn't sensitive — it's visible in dashboard URLs. Storing it as a
            variable means it shows up in your build logs, which makes debugging much easier. A
            secret would just print as <Code>***</Code>.
          </Note>

          <Note label="Test it before you trust it.">
            Edit any page in Page Pilot, then hit <strong>Run workflow</strong> in the Actions tab.
            It should build and deploy. Run it again straight away without editing anything — this
            time it should stop at the first step. If both happen, you're set.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="anatomy" title="What each step does">
          <p>Four parts. Here's what each one is for, and what breaks if you get it wrong.</p>

          <H3>1. The timer</H3>
          <p>
            <Code>schedule</Code> runs the pipeline on a clock instead of on a commit — which is
            what you want, because content changes don't produce commits.
          </p>
          <p>
            Add <Code>workflow_dispatch</Code> too. It gives you a <strong>Run workflow</strong>{' '}
            button in the Actions tab. It's safe: the check still runs first, so pressing it when
            nothing has changed correctly does nothing.
          </p>

          <H3>2. The check (the gate)</H3>
          <CodeSnippet code={GHA_GATE} language="yaml" title="the gate step" />
          <ul className="my-3 space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">
            <li>
              <strong className="text-ink">The <Code>echo</Code> line matters.</strong> It prints
              the raw answer into your build log. When a build unexpectedly skips, that's the first
              thing you'll look at.
            </li>
            <li>
              <strong className="text-ink">
                It checks for exactly <Code>true</Code>
              </strong>{' '}
              — on purpose. Anything else stops the job: <Code>false</Code>, an error page, or an
              empty response from a network problem. If Page Pilot is having a bad day, you skip
              the build rather than deploy something based on a garbled answer.
            </li>
            <li>
              <strong className="text-ink">
                <Code>exit 1</Code> stops everything after it.
              </strong>{' '}
              GitHub skips the remaining steps automatically, so the build, deploy and acknowledge
              never run.
            </li>
            <li>
              <strong className="text-ink">Put it before checkout.</strong> No point downloading
              your repo if you're about to stop anyway.
            </li>
          </ul>

          <H3>3. Build and deploy</H3>
          <p>
            Nothing Page Pilot-specific here — this is just your existing pipeline. The one thing
            that matters is that these steps <strong>fail properly</strong> when something goes
            wrong, because the acknowledge step relies on GitHub stopping the job after a failure.
          </p>
          <Note tone="warn" label="Don't add">
            <Code>continue-on-error: true</Code> to your build or deploy step. It lets the pipeline
            carry on after a failure — so the switch gets turned off even though nothing was
            published, and the change is lost.
          </Note>

          <H3>4. The acknowledge</H3>
          <CodeSnippet code={GHA_ACK} language="yaml" title="the acknowledge step" />
          <p>
            Goes last, with no <Code>if:</Code> condition — GitHub's default behaviour is already
            exactly right.
          </p>
          <p>
            Checking for <Code>DONE</Code> and failing otherwise is worth the extra three lines.
            Without it, a broken acknowledge would leave the switch stuck on, and you'd rebuild
            every night forever without realising.
          </p>
          <Note tone="warn" label="Never put">
            <Code>if: always()</Code> on this step. That turns the switch off even when the build
            failed — the exact thing this whole setup exists to prevent.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="deploy-targets" title="Your deploy step">
          <p>
            The check and the acknowledge never change. Only the bit in the middle does. Pick
            whichever matches your hosting and drop it into the workflow.
          </p>

          <H3>Firebase Hosting</H3>
          <CodeSnippet code={DEPLOY_FIREBASE} language="yaml" title="firebase" />

          <H3>GitHub Pages</H3>
          <CodeSnippet code={DEPLOY_PAGES} language="yaml" title="github pages" />
          <p className="mt-2 text-sm text-slate-500">
            Also add <Code>permissions: {'{ pages: write, id-token: write }'}</Code> to the job.
          </p>

          <H3>S3 + CloudFront</H3>
          <CodeSnippet code={DEPLOY_S3} language="yaml" title="aws" />

          <H3>Vercel, Netlify, Cloudflare Pages</H3>
          <CodeSnippet code={DEPLOY_HOOK} language="yaml" title="deploy hook" />
          <Note tone="warn" label="These behave differently — read this one.">
            A deploy hook replies the moment your build is <em>queued</em>, not when it's live. So
            if you acknowledge right after, you're turning the switch off before anything has
            actually been published. Either wait for the provider's API to report the deploy as
            ready, or move the whole check/acknowledge pair into a scheduled function on their
            side that runs after the build.
          </Note>
        </Section>

        {/* ================================================================ */}
        <Section id="recipes" title="Going further">
          <H3>Share the check across several repos</H3>
          <p>
            If you run more than one site this way, write the check once as a composite action
            rather than copy-pasting shell into every workflow.
          </p>
          <CodeSnippet code={GHA_COMPOSITE} language="yaml" title="the shared action" />
          <p className="mt-3">Then in each workflow, it's two lines:</p>
          <CodeSnippet code={GHA_COMPOSITE_USE} language="yaml" title="using it" />

          <H3>Stop the red Xs in your Actions tab</H3>
          <p>
            Because the gate uses <Code>exit 1</Code>, a skipped run shows up as a failed run. Your
            Actions tab fills with red marks that actually mean “nothing to do”. That's fine if
            your team knows to ignore them, and risky if it trains people to ignore real failures.
          </p>
          <p>
            To make skipped runs finish green, split the check into its own job:
          </p>
          <CodeSnippet code={GHA_NEUTRAL} language="yaml" title="green skips" />
          <p className="mt-2 text-sm text-slate-500">
            The catch: correctness now depends on that <Code>if:</Code> being right. Get it wrong
            and the acknowledge could run without a build. The <Code>exit 1</Code> version can't
            fail that way — which is why it's the default recommendation.
          </p>

          <H3>Several sites in one workflow</H3>
          <p>
            Each workspace has its own switch, so you can loop over them. Use{' '}
            <Code>fail-fast: false</Code> so one skipped site doesn't cancel the others.
          </p>
          <CodeSnippet code={GHA_MATRIX} language="yaml" title="multiple sites" />

          <H3>If editors publish while a build is running</H3>
          <p>
            There's a small gap: if someone publishes after your build has fetched content but
            before it acknowledges, that edit gets swallowed. Re-checking just before you
            acknowledge narrows the gap:
          </p>
          <CodeSnippet code={GHA_RACE_SAFE} language="yaml" title="re-check first" />
          <p className="mt-2 text-sm text-slate-500">
            It doesn't fully solve it — the switch is just on/off, so a change made mid-build looks
            identical to the one you already published. The real fixes are a faster build or a more
            frequent schedule, so the next run comes along soon.
          </p>
        </Section>

        {/* ================================================================ */}
        <Section id="other-ci" title="Not using GitHub?">
          <p>
            None of this is GitHub-specific — it's two web requests and an ordering rule. Whatever
            you use, keep the rule: <strong>check first, acknowledge last, acknowledge only if the
            deploy worked.</strong>
          </p>

          <H3>GitLab CI</H3>
          <CodeSnippet code={GITLAB_CI} language="yaml" title=".gitlab-ci.yml" />
          <p className="mt-2 text-sm text-slate-500">
            <Code>when: on_success</Code> on the last stage is what keeps it safe — GitLab's
            equivalent of GitHub skipping steps after a failure.
          </p>

          <H3>Jenkins</H3>
          <CodeSnippet code={JENKINS} language="groovy" title="Jenkinsfile" />
          <p className="mt-2 text-sm text-slate-500">
            Here it's <Code>post {'{ success { … } }'}</Code> doing the work. Using{' '}
            <Code>always</Code> instead would turn the switch off after a failed deploy. Marking
            skipped runs <Code>NOT_BUILT</Code> keeps them visually separate from real failures.
          </p>

          <H3>Plain cron on your own server</H3>
          <CodeSnippet code={CRON_SHELL} language="bash" title="crontab -e" />
          <p className="mt-2 text-sm text-slate-500">
            Runs the script from{' '}
            <a className="text-brand hover:underline" href="#pattern">
              The idea in one script
            </a>
            . Unlike GitHub, your own crontab uses the server's local time.
          </p>
        </Section>

        {/* ================================================================ */}
        <Section id="cron" title="Picking a schedule">
          <p>
            Your schedule decides the worst-case wait: on a nightly build, a page published at 9am
            goes live that night. Pick the slowest interval your editors are happy with — then tell
            them what it is, so nobody files a bug about it.
          </p>
          <CodeSnippet code={CRON_TABLE} language="bash" title="cron examples" />
          <ul className="my-3 space-y-4 text-sm text-slate-600">
            <Card title="GitHub always uses UTC">
              <p>
                Not your timezone, and it doesn't shift for daylight saving.{' '}
                <Code>0 22 * * *</Code> is 22:00 UTC all year — which lands at a different local
                hour in summer than in winter.
              </p>
            </Card>
            <Card title="Scheduled runs are “roughly on time”">
              <p>
                GitHub delays them when it's busy, sometimes by tens of minutes, and drops them
                during outages. Don't build anything that assumes a run happened. The switch stays
                on through a missed run, so the next one still catches up.
              </p>
            </Card>
            <Card title="Don't use the top of the hour">
              <p>
                <Code>0 * * * *</Code> is the busiest slot on GitHub's scheduler. Shift a few
                minutes — <Code>17 2 * * *</Code> — and your runs start sooner. Jenkins does this
                for you if you write <Code>H</Code> instead of a number.
              </p>
            </Card>
            <Card title="Checking is cheap; building is not — but runs aren't free">
              <p>
                Even a run that stops at the gate is billed as a whole minute.{' '}
                <Code>*/30 * * * *</Code> is around 1,440 minutes a month just to ask a question.
                Hourly, or every few hours, suits most content sites.
              </p>
            </Card>
            <Card title="Public repos get paused after 60 days">
              <p>
                GitHub switches off scheduled workflows in public repositories if there's been no
                commit for 60 days — easy to hit on a content-only site. Either keep the repo
                private, or re-enable it from the Actions tab when GitHub emails you.
              </p>
            </Card>
          </ul>
        </Section>

        {/* ================================================================ */}
        <Section id="operating" title="Day-to-day & fixing problems">
          <H3>“I published a page — when will it be live?”</H3>
          <p>
            At the next scheduled run. Tell your editors the schedule in plain terms (“content goes
            live overnight”), or give them the <strong>Run workflow</strong> button so they can
            trigger it themselves.
          </p>

          <H3>I need it live right now</H3>
          <p>
            Press <strong>Run workflow</strong> in the Actions tab. If the switch happens to be
            off, the gate will stop it — so re-save any page in Page Pilot first (that turns the
            switch on), then run the workflow.
          </p>

          <H3>Turning the switch on or off by hand</H3>
          <CodeSnippet code={MANUAL_RESET} language="bash" title="manual control" />

          <H3>A run finished but nothing happened</H3>
          <Steps>
            <Step n={1} title="Open the run and expand the first step">
              <p>
                The <Code>check-data-changed:</Code> line shows exactly what Page Pilot answered.
              </p>
            </Step>
            <Step n={2} title="It says false">
              <p>Working as designed — nothing changed since your last deploy.</p>
            </Step>
            <Step n={3} title="It's empty, or full of HTML">
              <p>
                The request failed: wrong workspace id, a network problem, or Page Pilot being
                unavailable. Run the same curl by hand to confirm.
              </p>
            </Step>
            <Step n={4} title="It says true but the job still stopped">
              <p>The problem is in a later step, not the check.</p>
            </Step>
          </Steps>

          <H3>My site rebuilds every single night</H3>
          <p>
            The switch is stuck on, which means the acknowledge isn't running or isn't working.
            Check that the step is there, that it's last, and that it printed <Code>DONE</Code>.
          </p>

          <H3>A published change never went live</H3>
          <p>
            Check the switch by hand. If it says <Code>false</Code> but your site is out of date,
            something acknowledged without deploying — usually <Code>if: always()</Code>, a{' '}
            <Code>continue-on-error</Code> deploy step, or a second pipeline acknowledging the same
            workspace. Re-save the page to turn the switch back on, fix the ordering, and run
            again.
          </p>
        </Section>

        {/* ================================================================ */}
        <Section id="pitfalls" title="Mistakes to avoid">
          <ul className="space-y-4 text-sm text-slate-600">
            <Card title="Acknowledging before the deploy finishes">
              <p>
                The worst one. The switch goes off, the deploy then fails, and now no future run
                will ever pick that change up — your site stays stale until someone happens to edit
                another page. Acknowledge last, and only on success.
              </p>
            </Card>
            <Card title="Edits that land mid-build">
              <p>
                Anything published after your build fetched content but before it acknowledged gets
                swallowed. The window is as long as your build takes. See the re-check recipe above;
                the lasting fixes are a faster build or a tighter schedule.
              </p>
            </Card>
            <Card title="Two pipelines sharing one workspace">
              <p>
                The switch belongs to the workspace, not the repo. If staging and production both
                acknowledge the same workspace, whichever runs first turns it off and the other
                never builds. Only one pipeline per workspace should acknowledge.
              </p>
            </Card>
            <Card title="Treating the response as JSON">
              <p>
                It's plain text — <Code>true</Code>, <Code>false</Code>, <Code>DONE</Code>. Piping
                it through <Code>jq</Code> will fail or give you null. Just compare the string.
              </p>
            </Card>
            <Card title="Mistaking a network error for “no change”">
              <p>
                A failed <Code>curl</Code> returns nothing, which stops the job correctly — but in
                the log it looks the same as a genuine <Code>false</Code>. Add{' '}
                <Code>--fail --max-time 30</Code> so you can tell them apart.
              </p>
            </Card>
            <Card title="Expecting code changes to trigger a build">
              <p>
                The switch only watches Page Pilot content. Push a template or CSS change and the
                scheduled run will skip straight past it. Keep a separate push-triggered workflow
                for code deploys.
              </p>
            </Card>
            <Card title="Invisible whitespace">
              <p>
                If something adds a newline to the response, <Code>"true"</Code> stops matching and
                every build silently skips. If you're using a shell other than the examples here,
                trim the value before comparing it.
              </p>
            </Card>
          </ul>
        </Section>
      </article>
    </DocLayout>
  );
}
