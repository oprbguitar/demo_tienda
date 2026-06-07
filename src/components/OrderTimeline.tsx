import { CheckCircle2, Circle } from "lucide-react";

type OrderTimelineProps = {
  statuses: string[];
  currentIndex?: number;
};

export function OrderTimeline({ statuses, currentIndex = 3 }: OrderTimelineProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <ol className="space-y-4">
        {statuses.map((status, index) => {
          const done = index <= currentIndex;
          return (
            <li key={status} className="flex gap-3">
              <span className={done ? "text-blue-700" : "text-slate-300"}>
                {done ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </span>
              <div>
                <p className={`font-bold ${done ? "text-slate-950" : "text-slate-500"}`}>{status}</p>
                <p className="text-sm text-slate-500">{done ? "Actualizado por el taller" : "Pendiente de confirmación"}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
