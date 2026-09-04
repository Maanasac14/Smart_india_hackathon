import React from 'react';
import { IndiaMap } from '../IndiaMap';
import { RegionData } from '../../types';
import { AlertOctagon, AlertTriangle, CheckCircle, Compass, Activity, ShieldCheck, Gauge, Layers, Radio, Cpu } from 'lucide-react';

interface OverviewTabProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
  regions: RegionData[];
  bustProb: number;
  predictedError: number;
  confidenceLevel: number;
  lowerB: number;
  upperB: number;
  confPhys: number;
  lamVal: number;
  selectedRegime: string;
  isComplexTerrain: boolean;
  leadTime: number;
  leadMultiplier: number;
  teleconnectionRisk: number;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  selectedRegion,
  onSelectRegion,
  regions,
  bustProb,
  predictedError,
  confidenceLevel,
  lowerB,
  upperB,
  confPhys,
  lamVal,
  selectedRegime,
  isComplexTerrain,
  leadTime,
  leadMultiplier,
  teleconnectionRisk
}) => {
  const threshold = 5.0;
  const isBust = bustProb >= 0.60 || predictedError >= threshold;
  const isModerate = (bustProb >= 0.35 && bustProb < 0.60) || (predictedError >= 3.5 && predictedError < threshold);

  const regionNameClean = selectedRegion.split(' (')[0];

  return (
    <div className="space-y-4">
      {/* IMD Operational Warning Status Bar */}
      {isBust ? (
        <div className="bg-white rounded-xl p-4 sm:p-5 border-l-6 border-l-red-600 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs bg-gradient-to-r from-red-50/60 to-white">
          <div className="space-y-1">
            <div className="font-black text-base sm:text-lg flex items-center gap-2 text-red-950 font-masthead">
              <span className="w-3 h-3 rounded-full bg-red-600 animate-ping"></span>
              <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
              <span>STAGE-4 WARNING: HIGH BUST DIVERGENCE &bull; {regionNameClean.toUpperCase()}</span>
            </div>
            <div className="text-xs sm:text-sm text-red-900 font-medium">
              Operational NWP divergence exceeds tolerance:{' '}
              <strong className="font-mono">{(bustProb * 100).toFixed(1)}% bust probability</strong>{' '}
              (Expected Error: <strong className="font-mono">{predictedError.toFixed(2)} mm</strong> &gt; {threshold} mm threshold).
            </div>
          </div>
          <div className="bg-red-50 border border-red-200 px-4 py-2 text-center shrink-0 self-start sm:self-auto rounded-xl">
            <span className="text-[9px] font-mono font-bold text-red-800 uppercase block tracking-wider">
              PROTOCOL DIRECTIVE
            </span>
            <span className="text-xs font-black text-red-700 font-mono">
              FLAG FOR NWFC DUTY REVIEW
            </span>
          </div>
        </div>
      ) : isModerate ? (
        <div className="bg-white rounded-xl p-4 sm:p-5 border-l-6 border-l-amber-500 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs bg-gradient-to-r from-amber-50/60 to-white">
          <div className="space-y-1">
            <div className="font-black text-base sm:text-lg flex items-center gap-2 text-amber-950 font-masthead">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse"></span>
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>STAGE-3 WATCH: ELEVATED ENSEMBLE SPREAD &bull; {regionNameClean.toUpperCase()}</span>
            </div>
            <div className="text-xs sm:text-sm text-amber-900 font-medium">
              Moderate atmospheric bifurcation detected:{' '}
              <strong className="font-mono">{(bustProb * 100).toFixed(1)}% bust probability</strong>{' '}
              (Expected Error: <strong className="font-mono">{predictedError.toFixed(2)} mm</strong>).
            </div>
          </div>
          <div className="bg-amber-50 border border-amber-200 px-4 py-2 text-center shrink-0 self-start sm:self-auto rounded-xl">
            <span className="text-[9px] font-mono font-bold text-amber-800 uppercase block tracking-wider">
              PROTOCOL DIRECTIVE
            </span>
            <span className="text-xs font-black text-amber-700 font-mono">
              MONITOR EPS PERTURBATIONS
            </span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl p-4 sm:p-5 border-l-6 border-l-emerald-600 border border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-xs bg-gradient-to-r from-emerald-50/60 to-white">
          <div className="space-y-1">
            <div className="font-black text-base sm:text-lg flex items-center gap-2 text-emerald-950 font-masthead">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>STAGE-1 OPERATIONAL GREEN: HIGH FORECAST FIDELITY &bull; {regionNameClean.toUpperCase()}</span>
            </div>
            <div className="text-xs sm:text-sm text-emerald-900 font-medium">
              Synoptic state trajectory stable:{' '}
              <strong className="font-mono">{(bustProb * 100).toFixed(1)}% bust risk</strong>{' '}
              (Expected Error: <strong className="font-mono">{predictedError.toFixed(2)} mm</strong> &lt; {threshold} mm).
            </div>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 text-center shrink-0 self-start sm:self-auto rounded-xl">
            <span className="text-[9px] font-mono font-bold text-emerald-800 uppercase block tracking-wider">
              PROTOCOL DIRECTIVE
            </span>
            <span className="text-xs font-black text-emerald-700 font-mono">
              NORMAL DISSEMINATION
            </span>
          </div>
        </div>
      )}

      {/* KPI Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Bust Probability */}
        <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-xs">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <AlertOctagon className="w-3.5 h-3.5 text-slate-400" />
                BUST PROBABILITY
              </span>
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[9px] font-mono border border-slate-200">
                P(E&gt;5mm)
              </span>
            </div>
            
            {/* Readout Well */}
            <div className="bg-slate-50 border border-slate-200 p-3 my-2 text-center rounded-xl">
              <div
                className={`text-3xl sm:text-4xl font-black font-mono-telemetry tracking-tight ${
                  bustProb >= 0.60
                    ? 'text-red-600'
                    : bustProb >= 0.35
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {(bustProb * 100).toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between font-mono pt-1">
            <span>Critical Cutoff:</span>
            <strong className="text-slate-800">5.0 mm Precip</strong>
          </div>
        </div>

        {/* Card 2: Predicted Error Magnitude */}
        <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-xs">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <Activity className="w-3.5 h-3.5 text-slate-400" />
                EXPECTED ERROR &fnof;(X)
              </span>
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[9px] font-mono border border-slate-200">
                DISCREPANCY
              </span>
            </div>

            {/* Readout Well */}
            <div className="bg-slate-50 border border-slate-200 p-3 my-2 text-center rounded-xl">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono-telemetry tracking-tight">
                {predictedError.toFixed(2)}{' '}
                <span className="text-base font-semibold text-slate-500">mm</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between font-mono pt-1">
            <span>Meta-Model:</span>
            <strong className="text-slate-800">GBDT Regressor</strong>
          </div>
        </div>

        {/* Card 3: Conformal Prediction Bounds */}
        <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-xs">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-blue-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                CONFORMAL BOUND
              </span>
              <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold border border-blue-200">
                {(confidenceLevel * 100).toFixed(0)}% GUARANTEE
              </span>
            </div>

            {/* Readout Well */}
            <div className="bg-slate-50 border border-slate-200 p-3 my-2 text-center rounded-xl">
              <div className="text-2xl sm:text-3xl font-black text-blue-700 font-mono-telemetry tracking-tight">
                [{lowerB.toFixed(2)}, {upperB.toFixed(2)}]
                <span className="text-xs font-semibold text-slate-500 ml-1">mm</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between font-mono pt-1">
            <span>Coverage Valid:</span>
            <strong className="text-slate-800">1 - &alpha; = {confidenceLevel.toFixed(2)}</strong>
          </div>
        </div>

        {/* Card 4: Lorenz Chaos Confidence */}
        <div className="bg-white rounded-xl p-4 sm:p-5 flex flex-col justify-between border border-slate-200 shadow-xs">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-mono">
                <Gauge className="w-3.5 h-3.5 text-slate-400" />
                LORENZ CONFIDENCE
              </span>
              <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[9px] font-mono border border-slate-200">
                CHAOS METRIC
              </span>
            </div>

            {/* Readout Well */}
            <div className="bg-slate-50 border border-slate-200 p-3 my-2 text-center rounded-xl">
              <div
                className={`text-3xl sm:text-4xl font-black font-mono-telemetry tracking-tight ${
                  confPhys >= 70
                    ? 'text-emerald-600'
                    : confPhys >= 40
                    ? 'text-amber-600'
                    : 'text-red-600'
                }`}
              >
                {confPhys.toFixed(1)}%
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 flex items-center justify-between font-mono pt-1">
            <span>Lyapunov &lambda;:</span>
            <strong className="text-slate-800">{lamVal.toFixed(3)} /day</strong>
          </div>
        </div>
      </div>

      {/* Meteorological Map */}
      <IndiaMap
        regions={regions}
        selectedRegion={selectedRegion}
        onSelectRegion={onSelectRegion}
        leadTime={leadTime}
        confidenceLevel={confidenceLevel}
      />

      {/* Meteorological Diagnostic Enclosure */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3.5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span className="text-xs font-black uppercase tracking-wider text-slate-800 font-mono">
              OPERATIONAL TELEMETRY MATRIX &bull; {regionNameClean.toUpperCase()}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            NWP GRID POINT: 0.25° CELL &bull; CYCLE: 00 UTC
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          <div className="bg-slate-50/70 border border-slate-200 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              SYNOPTIC CIRCULATION
            </span>
            <div className="text-xs sm:text-sm font-black text-slate-900">
              {selectedRegime}
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              TERRAIN OROGRAPHY
            </span>
            <div
              className={`text-xs sm:text-sm font-black ${
                isComplexTerrain ? 'text-red-700' : 'text-emerald-700'
              }`}
            >
              {isComplexTerrain ? 'Complex Orographic Barrier' : 'Lowland / Flat Basin'}
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              ERROR GROWTH MULTIPLIER
            </span>
            <div className="text-xs sm:text-sm font-black text-blue-700 font-mono">
              Day {leadTime} (&times;{leadMultiplier.toFixed(2)} exp factor)
            </div>
          </div>

          <div className="bg-slate-50/70 border border-slate-200 p-3 rounded-xl space-y-1">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block">
              TELECONNECTION PERTURBATION
            </span>
            <div className="text-xs sm:text-sm font-black text-purple-800 font-mono">
              +{teleconnectionRisk.toFixed(2)} mm Synoptic Bias
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
