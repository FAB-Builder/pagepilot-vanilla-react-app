/**
 * Copy-paste snippets for the "Runtime Scripts & Animations" doc page.
 * Script URLs mirror `pageScripts.ts` in ahd-fe — keep them in sync.
 */

export const SCRIPTS_BASE = 'https://pagepilot.fabbuilder.com/scripts';

export const SCRIPT_TAGS = `<!-- Only include the ones your page actually uses. -->
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotTabs.js" defer></script>
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotCarousel.js" defer></script>
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotPagination.js" defer></script>
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotTimer.js" defer></script>
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotAnimation.js" defer></script>
<script src="https://pagepilot.fabbuilder.com/scripts/pagePilotDemoScale.js" defer></script>`;

export const NEXT_APP_ROUTER = `// app/layout.tsx — App Router
import Script from 'next/script';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        {/* strategy="afterInteractive" runs the script once the page is
            interactive — early enough that a visitor rarely sees a static
            carousel, late enough that it never blocks first paint. */}
        <Script
          src="https://pagepilot.fabbuilder.com/scripts/pagePilotCarousel.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://pagepilot.fabbuilder.com/scripts/pagePilotAnimation.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}`;

export const REACT_SPA = `// A plain React app that injects page HTML itself.
// Load each script once, at app level — not per page render.
import { useEffect } from 'react';

const SCRIPTS = [
  'https://pagepilot.fabbuilder.com/scripts/pagePilotTabs.js',
  'https://pagepilot.fabbuilder.com/scripts/pagePilotAnimation.js',
];

function usePagePilotScripts() {
  useEffect(() => {
    SCRIPTS.forEach((src) => {
      // Guard against double-injection on re-mount / fast refresh.
      if (document.querySelector(\`script[src="\${src}"]\`)) return;

      const el = document.createElement('script');
      el.src = src;
      el.defer = true;
      document.body.appendChild(el);
    });
  }, []);
}

export default function App() {
  usePagePilotScripts();
  return <YourRoutes />;
}`;

export const DANGEROUS_HTML = `// Injecting page HTML this way is fine — but any <script> tag INSIDE
// that HTML will not run. The browser ignores scripts inserted via
// innerHTML, by design. So "Inject script" alone is not enough here.
<div dangerouslySetInnerHTML={{ __html: pageInfo.content }} />

// THE FIX — keep the markup injection exactly as it is, and load the
// script yourself from your app shell (see the React / Next.js examples).
// It finds the markup by data attributes, so order does not matter.`;

export const RE_INIT = `// Content that arrives AFTER the script loaded — a client-side route
// change, a fetch that resolves late, a modal — needs no extra work.
//
// Each script attaches a MutationObserver to the document and re-runs its
// own initialisation whenever new nodes appear. Already-initialised
// elements are skipped, so re-binding is cheap and safe.

export default function PageView({ slug }) {
  const html = usePageContent(slug);   // resolves whenever

  // No init call, no cleanup, no re-run on slug change.
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}`;

export const CSP = `# If your site sends a Content-Security-Policy header, allow the script host.
Content-Security-Policy: script-src 'self' https://pagepilot.fabbuilder.com;`;

export const ANIMATION_MARKUP = `<!-- What the editor emits for an animated block. The runtime script
     reads these attributes; the stylesheet defines the motion. -->
<div
  data-animate-type="slide-up"
  data-animate-trigger="scroll"
  data-animate-speed="medium"
  data-animate-delay="200"
>
  ...your block...
</div>`;

export const REDUCED_MOTION = `/* Animations are suppressed automatically for visitors who ask
   their OS to reduce motion. Nothing to configure. */
@media (prefers-reduced-motion: reduce) { /* animations disabled */ }`;
