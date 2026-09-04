import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { ShieldCheck, Target, Layers, Sparkles, CheckCircle } from 'lucide-react';

interface ConformalTabProps {
  fX: number;
  qVal: number;
  lowerB: number;
  upperB: number;
  confidenceLevel: number;
  onSelectConfidence: (lvl: number) => void;
}

export const ConformalTab: React.FC<ConformalTabProps> = ({
  fX,
  qVal,
  lowerB,
  upperB,
  confidenceLevel,
  onSelectConfidence
}) => {
  const levels = [
    { level: 0.80, multiplier: 0.72 },
    { level: 0.85, multiplier: 0.85 },
    { level: 0.90, multiplier: 1.00 },
    { level: 0.95, multiplier: 1.28 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-blue-200">
            CONFORMAL INFERENCE &bull; STATISTICAL GUARANTEES
          </span>
          <span className="text-xs font-mono text-slate-500">DISTRIBUTION-FREE STATISTICAL GUARANTEES</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Calibrated Uncertainty Quantification (MAPIE Conformal Prediction)
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          Applies inductive split conformal prediction to deliver <strong className="text-slate-950 font-bold">distribution-free, finite-sample statistical coverage guarantees</strong>. 
          Regardless of the underlying distribution of rainfall error, the true verification error is mathematically guaranteed to lie within the prediction interval with probability at least 1 &minus; &alpha;.
        </p>

        <GroundingBox
          scientist="Norbert Wiener (MIT, Cybernetics 1948)"
          concept="Extrapolation, Interpolation, and Smoothing of Stationary Time Series"
          role="Pioneered the statistical theory of prediction under noise and uncertainty (the Wiener filter). Conformal prediction formalizes Wiener's insight into modern distribution-free finite-sample guarantees, moving beyond arbitrary heuristics."
        />

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-blue-700" />
                Predicted Error Magnitude &fnof;(X)
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {fX.toFixed(2)}{' '}
                <span className="text-sm font-semibold text-slate-500">mm</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Point prediction output by the LightGBM/Gradient Boosting regressor.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Point Estimate
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-700" />
                Conformal Quantile (q_val)
              </span>
              <div className="text-2xl font-black text-purple-900 mt-2 font-mono">
                &plusmn;{qVal.toFixed(2)}{' '}
                <span className="text-sm font-semibold text-slate-500">mm</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Empirical (1 &minus; &alpha;)(1 + 1/n) quantile of non-conformity scores on calibration fold.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Coverage: {(confidenceLevel * 100).toFixed(0)}%
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Guaranteed Prediction Interval
              </span>
              <div className="text-2xl font-black text-emerald-900 mt-2 font-mono">
                [{lowerB.toFixed(1)}, {upperB.toFixed(1)}]{' '}
                <span className="text-sm font-semibold text-slate-500">mm</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                P(actual &isin; [lower, upper]) &ge; {(confidenceLevel * 100).toFixed(0)}% mathematically guaranteed.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Distribution-Free
            </div>
          </div>
        </div>

        {/* Interactive Confidence Level Selector */}
        <div className="bg-slate-50/70 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-300/80 pb-2">
            <h3 className="text-sm font-black text-slate-900 font-masthead">
              Select Statistical Coverage Target (1 &minus; &alpha;)
            </h3>
            <span className="text-xs font-mono font-bold text-blue-900">
              Active: {(confidenceLevel * 100).toFixed(0)}% Coverage Guarantee
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {levels.map((lvl) => {
              const isSelected = confidenceLevel === lvl.level;
              const curQ = qVal * (lvl.multiplier / 1.0);
              const curLower = Math.max(0, fX - curQ);
              const curUpper = fX + curQ;

              return (
                <button
                  key={lvl.level}
                  onClick={() => onSelectConfidence(lvl.level)}
                  className={`p-3.5 rounded-xl text-left transition cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900 font-mono">
                      {(lvl.level * 100).toFixed(0)}%
                    </span>
                    {isSelected && <CheckCircle className="w-4 h-4 text-blue-700" />}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">
                    Quantile: &plusmn;{curQ.toFixed(2)} mm
                  </div>
                  <div className="text-xs font-mono font-bold text-blue-950 mt-1">
                    [{curLower.toFixed(1)}, {curUpper.toFixed(1)}] mm
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
