type MeasurementGuideProps = {
  title: string;
  fields: string[];
  values: Record<string, string>;
  onChange: (field: string, value: string) => void;
};

export function MeasurementGuide({ title, fields, values, onChange }: MeasurementGuideProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <label key={field} className="block">
            <span className="text-sm font-bold text-slate-700">{field}</span>
            <input
              value={values[field] ?? ""}
              onChange={(event) => onChange(field, event.target.value)}
              inputMode="decimal"
              placeholder="cm"
              className="mt-1 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </label>
        ))}
      </div>
    </section>
  );
}
