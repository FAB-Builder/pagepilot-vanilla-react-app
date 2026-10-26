const FLAG_CDN = 'https://flagcdn.com';

export function Flag({ code }: { code: string }) {
  return (
    <img
      src={`${FLAG_CDN}/${code}.svg`}
      alt=""
      width={20}
      height={15}
      loading="lazy"
      decoding="async"
      className="h-[15px] w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-slate-200"
    />
  );
}
