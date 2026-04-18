export default function UnitToggle({ unit, onChange }) {
  return (
    <div
      role="radiogroup"
      aria-label="Temperature unit"
      className="inline-flex rounded-full p-1 shadow-glow"
    >
      {[
        { label: '\u00B0C', value: 'celsius' },
        { label: '\u00B0F', value: 'fahrenheit' },
      ].map((option) => {
        const active = unit === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`min-w-[48px] rounded-full px-3 py-1.5 text-sm font-semibold transition ${
              active
                ? 'bg-white text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
