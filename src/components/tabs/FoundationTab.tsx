import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { Map, AlertOctagon, Mountain, HelpCircle, Wind, Layers, Cpu, ShieldCheck } from 'lucide-react';

export const FoundationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Section 1: Problem Reframing */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-blue-200">
            METEOROLOGICAL FOUNDATIONS &bull; OPERATIONAL PARADIGM
          </span>
          <span className="text-xs font-mono text-slate-500">OPERATIONAL FRAMING</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Problem Reframing: Meta-Forecasting vs Numerical Weather Prediction
        </h2>
        
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          The system does not forecast the weather itself. Instead, it predicts{' '}
          <strong className="text-slate-950 font-bold">how reliable an operational NWP forecast (GFS / ECMWF / NCUM) is</strong> — 
          this is a <em className="text-blue-800 font-semibold not-italic">meta-forecasting problem</em>, quantifying the state-dependent probability of catastrophic model divergence.
        </p>

        <GroundingBox
          scientist="Lewis Fry Richardson (1922)"
          concept="Weather Prediction by Numerical Process"
          role="Formulated the mathematical framework for solving atmospheric Navier-Stokes primitive equations on discrete grids. This operational module completes Richardson's vision: not merely generating a forecast, but mathematically bounding how much that forecast can be trusted."
        />

        <div className="pt-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 mb-3 font-mono">
            THE 4 MANDATORY OPERATIONAL DELIVERABLES
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Deliverable 1 */}
            <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-blue-800 uppercase tracking-widest block font-mono">
                  DELIVERABLE 1
                </span>
                <div className="text-base font-black text-blue-900 flex items-center gap-2 mt-1">
                  <Map className="w-4 h-4 text-blue-700" />
                  Forecast Confidence Map
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Spatial, per lead time (Day 1–10) geographical uncertainty visualization across Indian states, union territories, and synoptic zones.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Output: High-res GeoTIFF / Vector</span>
                <span className="text-blue-700 font-bold">Active in Map View</span>
              </div>
            </div>

            {/* Deliverable 2 */}
            <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-red-800 uppercase tracking-widest block font-mono">
                  DELIVERABLE 2
                </span>
                <div className="text-base font-black text-red-700 flex items-center gap-2 mt-1">
                  <AlertOctagon className="w-4 h-4 text-red-600" />
                  Forecast Bust Probability
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  A calibrated probability score P(Error &gt; 5.0 mm threshold) quantifying catastrophic forecast failure likelihood.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Output: Calibrated Risk [0, 1]</span>
                <span className="text-red-600 font-bold">Isotonic Calibrated</span>
              </div>
            </div>

            {/* Deliverable 3 */}
            <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest block font-mono">
                  DELIVERABLE 3
                </span>
                <div className="text-base font-black text-amber-800 flex items-center gap-2 mt-1">
                  <Mountain className="w-4 h-4 text-amber-700" />
                  Error-Prone Area Detection
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Static and dynamic risk zones combining steep orography (Western Ghats, Himalayan foothills) with historical error density.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Output: Orographic Vulnerability Index</span>
                <span className="text-amber-700 font-bold">Terrain Profile</span>
              </div>
            </div>

            {/* Deliverable 4 */}
            <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black text-emerald-800 uppercase tracking-widest block font-mono">
                  DELIVERABLE 4
                </span>
                <div className="text-base font-black text-emerald-800 flex items-center gap-2 mt-1">
                  <HelpCircle className="w-4 h-4 text-emerald-700" />
                  Explainable Physical Output
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Transparent physical attribution explaining why uncertainty is elevated (ensemble divergence, shear gradients, synoptic transitions).
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                <span>Output: SHAP Physics Decomposition</span>
                <span className="text-emerald-700 font-bold">Operational Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Atmospheric Physics & Dynamical Instability */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-indigo-200">
            ATMOSPHERIC DYNAMICS &bull; CHAOTIC INSTABILITY
          </span>
          <span className="text-xs font-mono text-slate-500">GOVERNING LAWS</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Root Causes of Forecast Failure &amp; Chaotic Divergence
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          The atmosphere is a deterministic chaotic dynamical system governed by the Navier-Stokes equations on a rotating sphere.
          Infinitesimal errors in the initial state grow exponentially over time, limiting practical predictability.
        </p>

        <div className="space-y-3 pt-2">
          <GroundingBox
            scientist="Edward Lorenz (MIT, 1963)"
            concept="Deterministic Chaos &amp; Finite Predictability"
            role="Discovered that deterministic atmospheric models exhibit extreme sensitivity to initial conditions. Introduced Lyapunov divergence exponent quantifying how rapidly nearby atmospheric trajectories separate in phase space."
          />

          <GroundingBox
            scientist="Andrey Kolmogorov (1941)"
            concept="K41 Turbulence Cascade Theory"
            role="Developed the statistical theory of turbulence cascade, explaining how energy cascades from large synoptic planetary waves down to convective micro-scales — the exact physical mechanism fueling sub-grid forecast error growth."
          />

          <GroundingBox
            scientist="Jule Charney (1950)"
            concept="Baroclinic Instability &amp; Operational NWP"
            role="Father of modern dynamical meteorology who ran the first computer weather forecast (ENIAC, 1950). His theory of baroclinic instability explains how small thermal and wind shear perturbations grow explosively into monsoon depressions."
          />
        </div>
      </div>
    </div>
  );
};
