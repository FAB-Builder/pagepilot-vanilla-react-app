import type { BrandIcon } from '../../lib/aiAssistants';

const isDarkHex = (hex: string) => {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.299 * r + 0.587 * g + 0.114 * b < 60;
};

/** Brand logo; near-black logos use currentColor so they stay visible in dark mode. */
function BrandGlyph({ icon, size = 16 }: { icon: BrandIcon; size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className="shrink-0" aria-hidden="true">
      <path d={icon.path} fill={isDarkHex(icon.hex) ? 'currentColor' : `#${icon.hex}`} />
    </svg>
  );
}

export default BrandGlyph;
