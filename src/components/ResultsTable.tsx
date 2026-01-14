/**
 * ResultsTable Component
 *
 * Shows a table of simulation results at each milestone.
 * Displays: N (sample size), estimated Pi, absolute error, relative error
 */

import { FileText } from "lucide-react";
import type { SimulationResult } from "../types";
import { useLanguage } from "../i18n";

interface Props {
  data: SimulationResult[];
}

// Helper: format large numbers nicely (e.g., 1000000 -> "10^6")
function formatN(n: number): string {
  if (n >= 1_000_000) {
    return `10^${Math.log10(n).toFixed(0)}`;
  }
  return n.toString();
}

export function ResultsTable({ data }: Props) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <FileText size={20} className="text-slate-500" />
        {t("resultsTable")}
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th className="px-6 py-3">{t("numberOfTrials")}</th>
              <th className="px-6 py-3">{t("piValue")}</th>
              <th className="px-6 py-3">{t("absoluteError")}</th>
              <th className="px-6 py-3">{t("relativeError")}</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              // Empty state - show helpful message
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-slate-400">
                  {t("runSimulationToSeeResults")}
                </td>
              </tr>
            ) : (
              // Actual results
              data.map((row, index) => (
                <tr key={index} className="bg-white border-b hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono font-medium">
                    {formatN(row.n)}
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-bold font-mono">
                    {row.pi.toFixed(6)}
                  </td>
                  <td className="px-6 py-4 font-mono">{row.error.toFixed(6)}</td>
                  <td className="px-6 py-4 font-mono">
                    {row.percentError.toFixed(4)}%
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
