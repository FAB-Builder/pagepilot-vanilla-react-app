import { useEffect, useState } from 'react';
import DocLayout, { type DocSection } from '../components/DocLayout';
import { SpinnerIcon, ToursIcon, TooltipsIcon, DemosIcon, AppBannerIcon, PagesIcon } from '../components/Icons';
import type { IconComponent } from '../navItems';
import { PAGEPILOT_API_HOST } from '../lib/ahd';
import { AlertCircle, LayoutTemplate } from 'lucide-react';

/** Maps a global-template `type` to the icon used elsewhere for that module. */
const TYPE_ICONS: Record<string, IconComponent> = {
  tour: ToursIcon,
  tooltip: TooltipsIcon,
  demo: DemosIcon,
  'app-banner': AppBannerIcon,
  page: PagesIcon,
  block: LayoutTemplate,
};

const SECTIONS: DocSection[] = [{ id: 'overview', label: 'Overview' }];

const TEMPLATES_ENDPOINT = `${PAGEPILOT_API_HOST}/global-template?orderBy=&offset=0`;

interface GlobalTemplateImage {
  publicUrl: string;
}

interface GlobalTemplate {
  _id: string;
  name: string;
  description?: string;
  tags?: string[];
  type: string;
  image?: GlobalTemplateImage[];
}

interface GlobalTemplateResponse {
  rows: GlobalTemplate[];
  count: number;
}

type Status = 'loading' | 'success' | 'error';

function TemplateCard({ template }: { template: GlobalTemplate }) {
  const thumbnail = template.image?.[0]?.publicUrl;
  const TypeIcon = TYPE_ICONS[template.type] ?? LayoutTemplate;

  return (
    <div
      id={`template-card-${template._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all duration-200 hover:border-brand/40 hover:shadow-lg"
    >
      <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-slate-50">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={template.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <LayoutTemplate className="h-8 w-8 text-slate-300" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-sm font-bold text-ink">{template.name}</span>
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-brand-tint px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand">
            <TypeIcon className="h-3 w-3" />
            {template.type}
          </span>
        </div>
        {template.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-muted">
            {template.description}
          </p>
        )}
        {template.tags && template.tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Templates() {
  const [templates, setTemplates] = useState<GlobalTemplate[]>([]);
  const [status, setStatus] = useState<Status>('loading');

  useEffect(() => {
    let cancelled = false;

    setStatus('loading');
    fetch(TEMPLATES_ENDPOINT)
      .then((r) => r.json())
      .then((data: GlobalTemplateResponse) => {
        if (cancelled) return;
        setTemplates(Array.isArray(data.rows) ? data.rows : []);
        setStatus('success');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <DocLayout title="Templates" sections={SECTIONS}>
      <article id="templates-article">
        <header id="templates-header" className="mb-8 border-b border-slate-200 pb-6">
          <h1 id="templates-title" className="mt-1 text-3xl font-bold" style={{ width: 'fit-content' }}>
            Templates
          </h1>
          <p id="templates-intro" className="mt-3 text-lg leading-relaxed text-slate-600">
            Every global template available in your Page Pilot workspace — tours, tooltips,
            demos, banners, and pages — ready to reuse.
          </p>
        </header>

        <section id="overview" className="scroll-mt-24">
          {status === 'loading' && (
            <div id="templates-loading" className="flex items-center justify-center py-16">
              <SpinnerIcon className="h-6 w-6 animate-spin text-brand" />
            </div>
          )}

          {status === 'error' && (
            <div
              id="templates-error"
              className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
            >
              <AlertCircle size={16} />
              Couldn't load templates. Please try again later.
            </div>
          )}

          {status === 'success' && templates.length === 0 && (
            <div
              id="templates-empty"
              className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center"
            >
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand-tint text-brand">
                <LayoutTemplate size={26} />
              </span>
              <h2 className="mt-4 text-lg font-bold">No templates yet</h2>
              <p className="mt-1 text-sm text-slate-500">
                Global templates published in Page Pilot will show up here.
              </p>
            </div>
          )}

          {status === 'success' && templates.length > 0 && (
            <div
              id="templates-grid"
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {templates.map((template) => (
                <TemplateCard key={template._id} template={template} />
              ))}
            </div>
          )}
        </section>
      </article>
    </DocLayout>
  );
}

export default Templates;
