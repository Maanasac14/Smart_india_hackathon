import React from 'react';
import { REGION_OPTIONS, REGIME_OPTIONS } from '../data/regions';
import { GITHUB_REPO_URL } from '../data/groundings';
import { Sliders, Compass, Globe, ShieldCheck, MapPin, Clock, CloudRain, ExternalLink, Activity, Thermometer } from 'lucide-react';

interface SidebarProps {
  selectedRegion: string;
  onSelectRegion: (val: string) => void;
  leadTime: number;
  onLeadTimeChange: (val: number) => void;
  selectedRegime: string;
  onSelectRegime: (val: string) => void;
  ensoIndex: number;
  onEnsoChange: (val: number) => void;
  iodIndex: number;
  onIodChange: (val: number) => void;
  mjoPhase: number;
  onMjoPhaseChange: (val: number) => void;
  mjoAmp: number;
  onMjoAmpChange: (val: number) => void;
  confidenceLevel: number;
  onConfidenceChange: (val: number) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedRegion,
  onSelectRegion,
  leadTime,
  onLeadTimeChange,
  selectedRegime,
  onSelectRegime,
  ensoIndex,
  onEnsoChange,
  iodIndex,
  onIodChange,
  mjoPhase,
  onMjoPhaseChange,
  mjoAmp,
  onMjoAmpChange,
  confidenceLevel,
  onConfidenceChange
}) => {
  return (
    <aside className="w-full lg:w-84 shrink-0 bg-white rounded-xl p-4 sm:p-5 space-y-5 border border-slate-200 shadow-xs">
      {/* Title Card */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
        <span className="text-[10px] font-black text-blue-800 uppercase tracking-widest block font-mono">
          OPERATIONAL CONTROL CONSOLE
        </span>
        <span className="text-sm font-black text-slate-900 flex items-center gap-1.5 mt-0.5 font-masthead">
          <Sliders className="w-4 h-4 text-blue-700" />
          NWP Simulation Parameters
        </span>
      </div>

      {/* Target State / Geographical Zone */}
      <div className="space-y-1.5">
        <label className="text-xs font-black text-slate-800 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            Target Meteorological Zone
          </span>
          <span className="text-[9px] font-mono text-slate-500">31 REGIONS</span>
        </label>
        <div className="bg-slate-50 border border-slate-200 p-1 rounded-xl">
          <select
            value={selectedRegion}
            onChange={(e) => onSelectRegion(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-0 p-2 text-slate-900 font-bold outline-hidden cursor-pointer"
          >
            {REGION_OPTIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Forecast Lead Time */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-slate-800">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            Forecast Lead Time Horizon
          </span>
          <span className="bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-md font-mono text-xs font-black text-blue-900">
            Day {leadTime} / 10
          </span>
        </div>

        {/* Styled Slider Track */}
        <div className="bg-slate-50 border border-slate-200 p-2 rounded-xl">
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={leadTime}
            onChange={(e) => onLeadTimeChange(Number(e.target.value))}
            className="w-full h-2 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-700"
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-mono mt-1 px-1">
            <span>D1 (Nowcast)</span>
            <span>D5 (Synoptic)</span>
            <span>D10 (Extended)</span>
          </div>
        </div>
      </div>

      {/* Synoptic Weather Regime */}
      <div className="space-y-1.5">
        <label className="text-xs font-black text-slate-800 flex items-center gap-1.5">
          <CloudRain className="w-3.5 h-3.5 text-indigo-700" />
          Synoptic Regime Classification
        </label>
        <div className="bg-slate-50 border border-slate-200 p-1 rounded-xl">
          <select
            value={selectedRegime}
            onChange={(e) => onSelectRegime(e.target.value)}
            className="w-full text-xs sm:text-sm bg-transparent border-0 p-2 text-slate-900 font-bold outline-hidden cursor-pointer"
          >
            {REGIME_OPTIONS.map((regime) => (
              <option key={regime} value={regime}>
                {regime}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-px bg-slate-200"></div>

      {/* Teleconnection Indices (Coupled Modes) */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-sky-700" />
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
              TELECONNECTIONS
            </h3>
          </div>
          <span className="text-[9px] font-mono bg-sky-100 text-sky-900 px-1.5 py-0.5 rounded font-bold">
            PACIFIC &bull; INDIAN
          </span>
        </div>

        {/* ENSO */}
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>ENSO Niño 3.4 / ONI</span>
            <span
              className={`font-mono font-black ${
                ensoIndex > 0.5
                  ? 'text-red-600'
                  : ensoIndex < -0.5
                  ? 'text-blue-700'
                  : 'text-slate-700'
              }`}
            >
              {ensoIndex > 0 ? `+${ensoIndex.toFixed(1)}` : ensoIndex.toFixed(1)} °C
            </span>
          </div>
          <input
            type="range"
            min={-2.5}
            max={2.5}
            step={0.1}
            value={ensoIndex}
            onChange={(e) => onEnsoChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-700"
          />
        </div>

        {/* IOD */}
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-1">
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>IOD Dipole Mode Index</span>
            <span
              className={`font-mono font-black ${
                iodIndex > 0.4
                  ? 'text-emerald-700'
                  : iodIndex < -0.4
                  ? 'text-red-600'
                  : 'text-slate-700'
              }`}
            >
              {iodIndex > 0 ? `+${iodIndex.toFixed(1)}` : iodIndex.toFixed(1)} °C
            </span>
          </div>
          <input
            type="range"
            min={-1.5}
            max={1.5}
            step={0.1}
            value={iodIndex}
            onChange={(e) => onIodChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-blue-700"
          />
        </div>

        {/* MJO Phase & Amp */}
        <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-800">
            <span>MJO Wavefront State</span>
            <span className="font-mono text-purple-800 font-black">
              Phase {mjoPhase} (Amp: {mjoAmp.toFixed(1)})
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            step={1}
            value={mjoPhase}
            onChange={(e) => onMjoPhaseChange(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-300 rounded-lg appearance-none cursor-pointer accent-purple-700"
          />
          <div className="text-[10px] text-slate-600 font-medium leading-tight">
            {mjoPhase >= 2 && mjoPhase <= 5
              ? 'Active Convection: Indian Ocean Basin'
              : 'Suppressed / Pacific Wave Phase'}
          </div>
        </div>
      </div>

      <div className="h-px bg-slate-200"></div>

      {/* Conformal Guarantee Coverage (1 - alpha) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-slate-800">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            Conformal Guarantee (1 - &alpha;)
          </span>
          <span className="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-mono text-xs font-black text-blue-900">
            {(confidenceLevel * 100).toFixed(0)}%
          </span>
        </div>

        {/* Segment Buttons */}
        <div className="grid grid-cols-4 gap-1.5">
          {[0.80, 0.85, 0.90, 0.95].map((lvl) => (
            <button
              key={lvl}
              onClick={() => onConfidenceChange(lvl)}
              className={`py-2 text-xs font-black font-mono rounded-lg transition cursor-pointer ${
                confidenceLevel === lvl
                  ? 'bg-blue-600 text-white font-black border border-blue-700 shadow-xs'
                  : 'bg-white text-slate-700 hover:text-blue-700 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {(lvl * 100).toFixed(0)}%
            </button>
          ))}
        </div>
        <div className="text-[10px] text-slate-500 leading-tight">
          Finite-sample non-exchangeable conformal coverage guarantee.
        </div>
      </div>

      {/* Official Footnote / Operational Repository */}
      <div className="bg-slate-50 border border-slate-200 p-3 text-center space-y-1 rounded-xl">
        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
          OPERATIONAL ARTIFACTS
        </span>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition"
        >
          <span>📦 Preeti112007/sihdemo</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
