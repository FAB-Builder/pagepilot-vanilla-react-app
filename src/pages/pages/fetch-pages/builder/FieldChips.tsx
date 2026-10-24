interface FieldChipsProps {
  options: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}

function FieldChips({ options, selected, onChange }: FieldChipsProps) {
  const toggle = (field: string) =>
    onChange(
      selected.includes(field)
        ? selected.filter((f) => f !== field)
        : options.filter((f) => f === field || selected.includes(f)),
    );

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((field) => {
        const on = selected.includes(field);
        return (
          <button
            key={field}
            type="button"
            aria-pressed={on}
            onClick={() => toggle(field)}
            className={[
              'rounded-full border px-2.5 py-1 font-mono text-xs transition-colors',
              on
                ? 'border-brand bg-brand-tint text-brand'
                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-ink',
            ].join(' ')}
          >
            {field}
          </button>
        );
      })}
    </div>
  );
}

export default FieldChips;
