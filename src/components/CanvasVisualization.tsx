/**
 * CanvasVisualization Component
 *
 * Displays the random points on a canvas.
 * Blue dots = inside the quarter circle
 * Red dots = outside the quarter circle
 *
 * We only render the first 5000 points for performance reasons.
 */

import type { RefObject } from "react";
import { useLanguage } from "../i18n";

interface Props {
  canvasRef: RefObject<HTMLCanvasElement | null>;
}

// Canvas size in pixels
const SIZE = 280;

export function CanvasVisualization({ canvasRef }: Props) {
  const { t } = useLanguage();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center">
      <h3 className="text-sm font-semibold text-slate-500 mb-4 self-start">
        {t("visualization")}
      </h3>

      {/* The canvas container with coordinate markers */}
      <div className="relative border-2 border-slate-300 w-[280px] h-[280px] bg-white">
        <canvas
          ref={canvasRef}
          width={SIZE}
          height={SIZE}
          className="absolute top-0 left-0"
        />

        {/* Axis lines (dashed) */}
        <div className="absolute bottom-0 left-0 w-full border-t border-dashed border-slate-400" />
        <div className="absolute top-0 left-0 h-full border-r border-dashed border-slate-400" />

        {/* Axis labels */}
        <span className="absolute bottom-1 right-2 text-xs font-mono text-slate-400">
          x=1
        </span>
        <span className="absolute top-2 left-1 text-xs font-mono text-slate-400">
          y=1
        </span>
      </div>

      {/* Legend */}
      <p className="text-xs text-slate-400 mt-2 text-center">
        {t("blueInside")}
        <br />
        {t("redOutside")}
      </p>
    </div>
  );
}
