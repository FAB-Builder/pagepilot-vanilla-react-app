import { Section, Code } from '../../../components/DocSection';
import CodeSnippet from '../../../components/CodeSnippet';
import { REPO_URL } from '../constants';

export default function CloneAndRun() {
  return (
    <Section id="clone" title="Clone & run the template">
      <p>The repo is public. Clone it, install, and run:</p>
      <div className="my-3">
        <CodeSnippet
          language="bash"
          code={`git clone ${REPO_URL}.git
cd swagger-documentation-template

npm install
npm run dev     # http://localhost:3003
npm run build   # static export to out/`}
        />
      </div>
      <p className="text-sm text-slate-600">
        <Code>npm run dev</Code> will render the shell even before any content exists.{' '}
        <Code>npm run build</Code> exercises <Code>generateStaticParams</Code> — it is the
        only step that catches a missing <Code>documentation-top-menu</Code>, a page without{' '}
        <Code>groups</Code>, or a page that was never published.
      </p>
    </Section>
  );
}
