/**
 * ConvergenceChart Component
 *
 * Shows how our Pi estimate converges to the true value as N increases.
 * X-axis: log scale of sample size
 * Y-axis: estimated Pi value
 * Red dashed line: true value of Pi
 */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { SimulationResult } from "../types";
import { useLanguage } from "../i18n";

interface Props {
  data: SimulationResult[];
}

// Format tick labels as powers of 10
function formatTick(val: number): string {
  return `10^${Math.log10(val)}`;
}

export function ConvergenceChart({ data }: Props) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{t("convergenceChart")}</h2>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            {/* Grid lines */}
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />

            {/* X axis: logarithmic scale for sample size */}
            <XAxis
              dataKey="n"
              scale="log"
              domain={["auto", "auto"]}
              type="number"
              tickFormatter={formatTick}
              label={{
                value: t("numberOfTrialsAxis"),
                position: "insideBottomRight",
                offset: -5,
              }}
            />

            {/* Y axis: Pi values (roughly 2.5 to 4) */}
            <YAxis domain={[2.5, 4]} allowDataOverflow={false} />

            {/* Hover tooltip */}
            <Tooltip
              formatter={(value) => (value as number).toFixed(5)}
              labelFormatter={(label) => `N = ${label}`}
            />

            <Legend />

            {/* Reference line at true Pi value */}
            <ReferenceLine
              y={Math.PI}
              label="π (ref)"
              stroke="red"
              strokeDasharray="3 3"
            />

            {/* Our estimated Pi line */}
            <Line
              type="monotone"
              dataKey="pi"
              stroke="#3b82f6"
              strokeWidth={2}
              name={t("calculatedPiLegend")}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
