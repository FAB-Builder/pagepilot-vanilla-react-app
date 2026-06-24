import { useEffect, useRef, useState } from 'react';
import { createAhd, DEMO_APPLICATION_ID, type AhdInstance } from '../lib/ahd';
import type { BannerType } from './appBannerTypes';

function TypeBannerDemo({ type: bannerType }: { type: BannerType }) {
  const ahdRef = useRef<AhdInstance | null>(null);
  const [rendered, setRendered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const renderBanner = async () => {
    setError(null);
    setLoading(true);
    setRendered(true);
    try {
      const ahd = createAhd({ applicationId: DEMO_APPLICATION_ID });
      ahdRef.current = ahd;
      await ahd.initializeSiteMap(false);
      await ahd.renderAppBanner(bannerType.identifier, true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to render the banner.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bannerType.autoRender) {
      renderBanner();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="rounded-full bg-brand-tint px-2.5 py-0.5 text-xs font-semibold text-brand">
          {bannerType.identifier}
        </span>
        <button
          type="button"
          onClick={renderBanner}
          disabled={loading}
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-60"
        >
          {loading ? 'Fetching...' : bannerType.autoRender ? 'Re-fetch' : 'Fetch & render'}
        </button>
      </div>
      {error && <p className="text-sm font-semibold text-rose-600">{error}</p>}
      {bannerType.value !== 'modal' && (
        <div className="min-h-[60px] rounded-xl border border-dashed border-slate-300 bg-slate-50 p-3">
          <div id={bannerType.identifier} />
          {!rendered && !bannerType.autoRender && (
            <p className="text-sm text-slate-400">
              Click &quot;Fetch &amp; render&quot; to load the {bannerType.name.toLowerCase()}.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default TypeBannerDemo;
