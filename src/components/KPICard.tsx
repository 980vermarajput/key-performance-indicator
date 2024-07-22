import { useRef } from "react";
import Chart from "./Chart";
import { KPICardType } from "../types/api/local";

const KPICard: React.FC<{ card: KPICardType; onEdit: () => void }> = ({
  card,
  onEdit,
}) => {
  const chartContainer = useRef<any>(null);
  return (
    <div
      className="cursor-pointer flex flex-col min-h-[120px] justify-between"
      onClick={onEdit}
    >
      <p className="text-sm font-medium">
        {card.metric || "-"}, {card?.segment}
      </p>
      <div className="flex justify-between">
        <div className="flex flex-col justify-end gap-2">
          <span className="text-2xl font-medium">
            {card.metric ? "52.5K" : "-"}
          </span>
          <span className={`text-sm`}>{card.metric ? "+ 3% Δ7d" : "-"}</span>
        </div>
        <div className="max-w-xl overflow-hidden" ref={chartContainer}>
          <Chart
            width={chartContainer?.current?.offsetWidth}
            values={card?.values as any}
          />
        </div>
      </div>
    </div>
  );
};
export default KPICard;
