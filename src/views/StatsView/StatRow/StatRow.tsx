import "./StatRow.css";

interface StatRowProps {
  name: string;
  value: string | number;
}

export function StatRow({ name, value }: StatRowProps) {
  return (
    <div className="stat-row">
      <label className="stat-row-label">{name}</label>
      <span className="stat-row-value">{value}</span>
    </div>
  );
}
