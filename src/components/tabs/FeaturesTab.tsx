import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { BarChart3, GitFork, Clock, CloudRain, MoveRight, Mountain, ShieldCheck } from 'lucide-react';

interface FeaturesTabProps {
  ensembleSpread: number;
  forecastJump: number;
  leadTime: number;
  synopticRegime: string;
  pressureGrad: number;
  moistureGrad: number;
  terrainRegion: string;
  isComplexTerrain: boolean;
}

export const FeaturesTab: React.FC<FeaturesTabProps> = ({
  ensembleSpread,
  forecastJump,
  leadTime,
  synopticRegime,
  pressureGrad,
  moistureGrad,
  terrainRegion,
  isComplexTerrain
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-blue-200">
            METEOROLOGICAL FEATURE MATRIX
          </span>
          <span className="text-xs font-mono text-slate-500">FEATURE ENGINEERING</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Standard Meteorological Feature Construction
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          Builds 6 standard meteorological feature groups per grid cell and lead time to capture uncertainty generators across synoptic dynamics and complex terrain.
        </p>

        <GroundingBox
          scientist="Tim Palmer (ECMWF / Oxford)"
          concept="Stochastic Parameterization"
          role="ECMWF research leader who pioneered representing unresolved sub-grid atmospheric processes (clouds, turbulence) probabilistically. His work established ensemble spread as a rigorous physical proxy for atmospheric uncertainty."
        />

        <GroundingBox
          scientist="Edward Epstein &amp; Cecil Leith (1969)"
          concept="Stochastic-Dynamic Forecasting"
          role="First to propose running perturbed model ensembles and treating their spread as a direct, quantitative measure of uncertainty."
        />

        {/* 6 Features Grid in Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {/* 1. Ensemble Spread */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <BarChart3 className="w-3.5 h-3.5 text-blue-700" />
                1. Multi-Model Disagreement
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {ensembleSpread.toFixed(2)}{' '}
                <span className="text-xs text-slate-500 font-normal">mm std</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Spread across GFS, ECMWF &amp; ICON models as proxy for true ensemble variance.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Palmer (ECMWF) / Epstein &amp; Leith
            </div>
          </div>

          {/* 2. Forecast Jump */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-purple-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <GitFork className="w-3.5 h-3.5 text-purple-700" />
                2. Forecast Jump (00Z vs 12Z)
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {forecastJump.toFixed(2)}{' '}
                <span className="text-xs text-slate-500 font-normal">mm &Delta;</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Run-to-run inconsistency for identical valid verification timestamp.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Model Initialization Sensitivity
            </div>
          </div>

          {/* 3. Synoptic Regime */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-indigo-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <CloudRain className="w-3.5 h-3.5 text-indigo-700" />
                3. Synoptic Regime
              </span>
              <div className="text-base font-black text-indigo-950 mt-2 line-clamp-1 font-masthead">
                {synopticRegime}
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Dynamic weather state classification (Monsoon Depression / Western Disturbance / Heatwave).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Charney Baroclinic Instability
            </div>
          </div>

          {/* 4. Spatial Gradients */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-sky-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <MoveRight className="w-3.5 h-3.5 text-sky-700" />
                4. Spatial Gradients (&nabla;P &amp; &nabla;q)
              </span>
              <div className="text-sm font-bold text-slate-900 mt-2 space-y-0.5 font-mono">
                <div>&nabla;P: {pressureGrad.toFixed(2)} hPa/100km</div>
                <div>&nabla;q: {moistureGrad.toFixed(2)} g/kg/100km</div>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Steep local pressure and moisture gradients strongly correlate with rapid convective error growth.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Baroclinicity Indicator
            </div>
          </div>

          {/* 5. Terrain & Orography Flag */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-amber-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Mountain className="w-3.5 h-3.5 text-amber-700" />
                5. Terrain / Orography Flags
              </span>
              <div className="text-base font-black text-slate-900 mt-2 flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                    isComplexTerrain
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {isComplexTerrain ? 'HIGH OROGRAPHIC VULNERABILITY' : 'Standard Terrain'}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Flags Western Ghats, Himalayan foothills, and Northeast India where sub-grid relief causes high error.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Zone: {terrainRegion}
            </div>
          </div>

          {/* 6. Lead Time Horizon */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-blue-800 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                <Clock className="w-3.5 h-3.5 text-blue-700" />
                6. Monotonic Lead Time Horizon
              </span>
              <div className="text-2xl font-black text-blue-900 mt-2 font-mono">
                Day {leadTime}{' '}
                <span className="text-xs text-slate-500 font-normal">/ 10</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Atmospheric error compounds exponentially with forecast lead time; mandatory monotonic baseline feature.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Lorenz Predictability Barrier
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
