export default function UnitToggle({ unit, onChange }) {
  return (
    <div className="glass-panel inline-flex rounded-full p-1 shadow-glow">
      {[
        { label: 'C', value: 'celsius' },
        { label: 'F', value: 'fahrenheit' },
      ].map((option) => {
        const active = unit === option.value;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              active
                ? 'bg-white text-slate-950 shadow-lg'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
