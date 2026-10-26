import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useToast } from '../../../../components/Toast';

function UrlPreview({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  const toast = useToast();

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.show('Endpoint copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-2">
        <span className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-emerald-700">
            GET
          </span>
          Your endpoint
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-ink"
        >
          {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
          {copied ? 'Copied' : 'Copy URL'}
        </button>
      </div>
      <p className="break-all px-4 py-3 font-mono text-[13px] leading-relaxed text-ink">{url}</p>
    </div>
  );
}

export default UrlPreview;
