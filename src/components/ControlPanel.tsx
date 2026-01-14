/**
 * ControlPanel Component
 *
 * Displays current simulation stats and the "Run" button.
 * Shows: current N, estimated Pi, reference Pi, and progress bar.
 */

import { Activity, Play } from "lucide-react";
import { PI_REFERENCE } from "../hooks/useMonteCarloSimulation";
import { useLanguage } from "../i18n";

interface Props {
  isRunning: boolean;
  totalPoints: number;
  currentPi: number;
  progress: number;
  targetN: number;
  onTargetNChange: (n: number) => void;
  onRun: () => void;
}

export function ControlPanel({
  isRunning,
  totalPoints,
  currentPi,
  progress,
  targetN,
  onTargetNChange,
  onRun,
}: Props) {
  const { t } = useLanguage();

  const handleTargetNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      onTargetNChange(value);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Activity size={20} className="text-blue-600" />
        {t("controlPanel")}
      </h2>

      <div className="space-y-4">
        {/* Target number of trials input */}
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
          <label htmlFor="targetN" className="text-sm font-medium text-slate-500">
            {t("targetN")}
          </label>
          <input
            id="targetN"
            type="number"
            min="1"
            max="100000000"
            value={targetN}
            onChange={handleTargetNChange}
            disabled={isRunning}
            className="font-mono text-lg font-bold w-36 text-right bg-white border border-gray-300 rounded px-2 py-1 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>

        {/* Current sample size */}
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-slate-500">{t("currentN")}</span>
          <span className="font-mono text-lg font-bold">
            {totalPoints.toLocaleString()}
          </span>
        </div>

        {/* Current Pi estimate (highlighted) */}
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
          <span className="text-sm font-medium text-blue-600">{t("calculatedPi")}</span>
          <span className="font-mono text-xl font-bold text-blue-700">
            {currentPi.toFixed(6)}
          </span>
        </div>

        {/* Reference Pi value */}
        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
          <span className="text-sm font-medium text-slate-500">{t("referenceValue")}</span>
          <span className="font-mono text-sm text-slate-600">
            {PI_REFERENCE.toFixed(6)}...
          </span>
        </div>

        {/* Progress bar */}
        <div className="pt-2">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-right text-slate-400">{t("simulationProgress")}</p>
        </div>

        {/* Run button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
            isRunning
              ? "bg-slate-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
        >
          {isRunning ? (
            <>{t("processing")}</>
          ) : (
            <>
              <Play size={18} /> {t("runSimulation")}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
