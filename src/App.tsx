/**
 * Monte Carlo Pi Simulator - Main App
 *
 * A fun educational tool that estimates Pi by throwing random darts at a square.
 * The more darts you throw, the closer you get to the true value of Pi!
 *
 * Built as a small side project for physics class (WSB).
 */

import { useState } from "react";
import { useMonteCarloSimulation, DEFAULT_N } from "./hooks/useMonteCarloSimulation";
import {
  CanvasVisualization,
  ControlPanel,
  ConvergenceChart,
  LanguageSelector,
  ResultsTable,
} from "./components";
import { useLanguage } from "./i18n";

export function App() {
  const { t } = useLanguage();
  const [targetN, setTargetN] = useState(DEFAULT_N);

  // All simulation logic lives in this hook
  const {
    isRunning,
    progress,
    currentPi,
    totalPoints,
    results,
    canvasRef,
    runSimulation,
  } = useMonteCarloSimulation();

  return (
    <div className="min-h-screen bg-gray-50 p-4 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header with title and explanation */}
        <header className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {t("title")}
            </h1>
            <LanguageSelector />
          </div>
          <p className="text-slate-600">
            {t("description")}
          </p>
        </header>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Controls and visualization */}
          <div className="lg:col-span-1 space-y-6">
            <ControlPanel
              isRunning={isRunning}
              totalPoints={totalPoints}
              currentPi={currentPi}
              progress={progress}
              targetN={targetN}
              onTargetNChange={setTargetN}
              onRun={() => runSimulation(targetN)}
            />

            <CanvasVisualization canvasRef={canvasRef} />
          </div>

          {/* Right column: Chart and results table */}
          <div className="lg:col-span-2 space-y-6">
            <ConvergenceChart data={results} />
            <ResultsTable data={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
