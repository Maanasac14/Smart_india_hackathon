import React from 'react';
import { Globe, Compass, Info, ShieldCheck, Sparkles, Activity } from 'lucide-react';

interface TeleconnectionsTabProps {
  ensoVal: number;
  iodVal: number;
  mjoPhase: number;
  mjoAmp: number;
}

export const TeleconnectionsTab: React.FC<TeleconnectionsTabProps> = ({
  ensoVal,
  iodVal,
  mjoPhase,
  mjoAmp
}) => {
  const ensoState =
    ensoVal > 0.5
      ? 'El Niño (Dry/Erratic Bias)'
      : ensoVal < -0.5
      ? 'La Niña (Enhanced Convection)'
      : 'Neutral ENSO Mode';

  const ensoColor =
    ensoVal > 0.5 ? 'text-red-600' : ensoVal < -0.5 ? 'text-blue-700' : 'text-emerald-700';

  const iodState =
    iodVal > 0.4
      ? 'Positive IOD (+DMI Favorable)'
      : iodVal < -0.4
      ? 'Negative IOD (-DMI Suppressed)'
      : 'Neutral Dipole Mode';

  const iodColor =
    iodVal > 0.4 ? 'text-emerald-700' : iodVal < -0.4 ? 'text-red-600' : 'text-slate-700';

  const mjoConvection =
    [2, 3, 4, 5].includes(mjoPhase)
      ? 'Active Convection: Indian Ocean & Bay of Bengal Basin'
      : 'Suppressed Convection: Pacific Phase Space';

  // Wheeler-Hendon RMM Phase coordinates
  const angle = (mjoPhase - 1) * (2 * Math.PI / 8) + Math.PI / 8;
  const rmm1 = mjoAmp * Math.cos(angle);
  const rmm2 = mjoAmp * Math.sin(angle);

  const mapCoordX = (val: number) => 180 + (val / 3.2) * 150;
  const mapCoordY = (val: number) => 180 - (val / 3.2) * 150;

  const currentX = mapCoordX(rmm1);
  const currentY = mapCoordY(rmm2);
  const centerX = mapCoordX(0);
  const centerY = mapCoordY(0);
  const radius1 = (1.0 / 3.2) * 150;

  return (
    <div className="space-y-6">
      {/* Section 1: Teleconnections Cards */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-purple-200">
            COUPLED OCEAN-ATMOSPHERE DYNAMICS
          </span>
          <span className="text-xs font-mono text-slate-500">GLOBAL CLIMATE TELECONNECTIONS</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Coupled Ocean-Atmosphere Modes: ENSO, IOD &amp; MJO
        </h2>
        
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          Large-scale planetary drivers modulate regional circulation and boundary-layer moisture flux. 
          While IMD duty forecasters use teleconnections manually in synoptic briefings, ML pipelines almost never encode them as model features.
          Integrating them provides physical grounding and significantly differentiates this solution.
        </p>

        {/* 3 KPI Teleconnection Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          {/* ENSO */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">
                PACIFIC BASIN &bull; NIÑO 3.4 / ONI
              </span>
              <div className={`text-2xl font-black mt-2 font-mono ${ensoColor}`}>
                {ensoVal > 0 ? `+${ensoVal.toFixed(1)}` : ensoVal.toFixed(1)} &deg;C
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 font-masthead">{ensoState}</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Modulates Walker Circulation; positive anomalies suppress monsoon trough and increase forecast bust probability.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              NOAA CPC Sourced
            </div>
          </div>

          {/* IOD */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">
                INDIAN OCEAN &bull; DIPOLE MODE INDEX (DMI)
              </span>
              <div className={`text-2xl font-black mt-2 font-mono ${iodColor}`}>
                {iodVal > 0 ? `+${iodVal.toFixed(1)}` : iodVal.toFixed(1)} &deg;C
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 font-masthead">{iodState}</div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Zonal sea surface temperature gradient across tropical Indian Ocean influencing cross-equatorial low-level jet.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              BoM / IMD Dipole Metric
            </div>
          </div>

          {/* MJO */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono">
                TROPICAL INTRASEASONAL &bull; MJO
              </span>
              <div className="text-2xl font-black text-purple-900 mt-2 font-mono">
                Phase {mjoPhase}{' '}
                <span className="text-xs text-slate-500 font-normal">| Amp {mjoAmp.toFixed(1)}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 mt-1 font-masthead">
                Wheeler-Hendon RMM State
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Eastward propagating convective wave; Phases 2–5 over Indian basin induce high convective precipitation errors.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              {mjoConvection}
            </div>
          </div>
        </div>
      </div>

      {/* Wheeler-Hendon RMM Phase Space Diagram */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-200/80 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 font-masthead">
              Wheeler-Hendon Real-time Multivariate MJO (RMM) Phase Space
            </h3>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Circle radius = 1.0 (threshold for active MJO wave). Points outside circle indicate strong propagating convective pulse.
            </p>
          </div>
          <span className="bg-purple-50 border border-purple-200 px-3 py-1 rounded-full text-xs font-mono font-bold text-purple-900">
            RMM1: {rmm1.toFixed(2)}, RMM2: {rmm2.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-2">
          {/* Embedded SVG Canvas */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <svg viewBox="0 0 360 360" className="w-72 h-72 sm:w-80 sm:h-80 select-none">
              {/* Polar Grid Circles */}
              <circle cx={centerX} cy={centerY} r={radius1} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx={centerX} cy={centerY} r={radius1 * 2} fill="none" stroke="#cbd5e1" strokeWidth="1" />
              
              {/* Unit Circle (Threshold of Active Wave) */}
              <circle cx={centerX} cy={centerY} r={radius1} fill="#e0e7ff" fillOpacity="0.25" />

              {/* Axes */}
              <line x1="20" y1={centerY} x2="340" y2={centerY} stroke="#64748b" strokeWidth="1.5" />
              <line x1={centerX} y1="20" x2={centerX} y2="340" stroke="#64748b" strokeWidth="1.5" />

              {/* Diagonal Octant Dividers */}
              <line x1="60" y1="60" x2="300" y2="300" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="60" y1="300" x2="300" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />

              {/* Phase Labels (1 to 8) */}
              <text x="320" y="210" className="text-[10px] font-mono font-bold fill-slate-500">Ph 1</text>
              <text x="270" y="320" className="text-[10px] font-mono font-bold fill-purple-700">Ph 2 (Ind Oc)</text>
              <text x="180" y="350" className="text-[10px] font-mono font-bold fill-purple-700">Ph 3 (Ind Oc)</text>
              <text x="60" y="320" className="text-[10px] font-mono font-bold fill-purple-700">Ph 4 (Maritime)</text>
              <text x="25" y="210" className="text-[10px] font-mono font-bold fill-purple-700">Ph 5 (Maritime)</text>
              <text x="60" y="55" className="text-[10px] font-mono font-bold fill-slate-500">Ph 6 (W Pac)</text>
              <text x="180" y="25" className="text-[10px] font-mono font-bold fill-slate-500">Ph 7 (W Pac)</text>
              <text x="270" y="55" className="text-[10px] font-mono font-bold fill-slate-500">Ph 8 (W Hem)</text>

              {/* Center Unit Circle Label */}
              <text x={centerX} y={centerY - 5} textAnchor="middle" className="text-[9px] font-mono font-bold fill-slate-400">
                Weak (&lt;1.0)
              </text>

              {/* Current Active MJO Vector */}
              <line
                x1={centerX}
                y1={centerY}
                x2={currentX}
                y2={currentY}
                stroke="#6d28d9"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <circle
                cx={currentX}
                cy={currentY}
                r="7"
                fill="#7c3aed"
                stroke="#ffffff"
                strokeWidth="2"
                className="filter drop-shadow-md"
              />
            </svg>
          </div>

          {/* Analytical Explanation Card */}
          <div className="bg-slate-50/80 p-4 sm:p-5 rounded-xl border border-slate-200 max-w-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-purple-900 font-mono">
              <Compass className="w-4 h-4 text-purple-700" />
              PHYSICAL REGIME INFERENCE
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Current state is in <strong className="text-purple-950 font-bold">Phase {mjoPhase}</strong> with amplitude{' '}
              <strong className="text-purple-950 font-bold">{mjoAmp.toFixed(1)}</strong>.
            </p>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-800 space-y-1">
              <div>&bull; Convective Signal: {mjoAmp >= 1.0 ? 'Active Planetary Wave' : 'Suppressed / Weak'}</div>
              <div>&bull; Indian Monsoon Impact: {[2,3,4,5].includes(mjoPhase) ? 'High Bias (+Convective Error)' : 'Low Teleconnection Bias'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
