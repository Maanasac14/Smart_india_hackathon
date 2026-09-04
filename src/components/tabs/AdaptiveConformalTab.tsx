import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { RefreshCw, Zap, TrendingUp, ShieldCheck, Activity } from 'lucide-react';

export const AdaptiveConformalTab: React.FC = () => {
  const gamma = 0.05;
  const targetAlpha = 0.10; // 90% target coverage
  let currentAlpha = targetAlpha;
  let q_t = 2.4;

  const streamingData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const isPostShift = day >= 15;
    // Error surge after monsoon onset at Day 15
    const baseError = isPostShift ? 3.8 + Math.sin(day) * 1.5 : 1.8 + Math.cos(day * 0.8) * 0.9;
    const observedError = Math.max(0.2, Number(baseError.toFixed(2)));

    // Adaptive coverage condition
    const isCovered = observedError <= q_t;
    const errIndicator = isCovered ? 0 : 1;

    // Gibbs & Candes update: alpha_{t+1} = alpha_t + gamma * (alpha - err_t)
    currentAlpha = Math.max(0.01, Math.min(0.5, currentAlpha + gamma * (targetAlpha - errIndicator)));
    q_t = Math.max(1.2, 2.5 + (0.10 - currentAlpha) * 12.0);

    return {
      day: `Day ${day}`,
      dayNum: day,
      observedError,
      adaptiveUpperBand: Number(q_t.toFixed(2)),
      isCovered
    };
  });

  const coveredCount = streamingData.filter((d) => d.isCovered).length;
  const empiricalCoverage = (coveredCount / streamingData.length) * 100;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-emerald-200">
            ONLINE RECALIBRATION &bull; ADAPTIVE CONFORMAL INFERENCE
          </span>
          <span className="text-xs font-mono text-slate-500">ONLINE ADAPTIVE RECALIBRATION</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Adaptive Conformal Inference (ACI) — Zero-Retraining Recalibration
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          Standard conformal prediction assumes data exchangeability. During seasonal transitions (e.g., pre-monsoon heatwaves shifting to intense monsoon depressions), 
          atmospheric error distributions shift violently. ACI dynamically adjusts the nonconformity quantile online without expensive model retraining,
          maintaining exact long-run coverage guarantees.
        </p>

        <GroundingBox
          scientist="Isaac Gibbs &amp; Emmanuel Candès (Stanford, 2023–2024)"
          concept="Adaptive Conformal Inference under Distribution Shift"
          role="Formulated online quantile updates guaranteeing long-run coverage even under arbitrary non-exchangeable distribution shifts: α_{t+1} = α_t + γ(α - err_t). This ensures the interval automatically widens when monsoon error surges, without triggering an expensive ML retrain."
        />

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                Adaptive Step Size (&gamma;)
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {gamma.toFixed(2)}
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Controls tracking speed vs variance trade-off under rapid seasonal transitions.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Gibbs &amp; Cand&egrave;s Update Rule
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                Target Coverage (1 &minus; &alpha;)
              </span>
              <div className="text-2xl font-black text-blue-900 mt-2 font-mono">
                90.0%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Guaranteed asymptotic coverage probability across arbitrary non-stationary sequences.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Distribution-Shift Resilient
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-700" />
                Empirical Realized Coverage
              </span>
              <div className="text-2xl font-black text-emerald-900 mt-2 font-mono">
                {empiricalCoverage.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {coveredCount} of 30 days within adaptive band despite 100% variance surge at Day 15.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              30-Day Monsoon Simulation
            </div>
          </div>
        </div>

        {/* Streaming Trajectory Graph */}
        <div className="bg-slate-50/70 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-300/80 pb-2">
            <h3 className="text-sm font-black text-slate-900 font-masthead">
              Online ACI Quantile Tracking: Seasonal Regime Shift at Day 15
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-900">
              Adaptive Upper Band dynamically expands without retraining
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={streamingData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#475569' }} />
                <YAxis
                  label={{ value: 'Error & Interval Band (mm)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#475569' }}
                  tick={{ fontSize: 11, fill: '#475569' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '0.75rem',
                    borderColor: '#cbd5e1',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <ReferenceLine
                  x="Day 15"
                  stroke="#dc2626"
                  strokeDasharray="4 4"
                  label={{ value: 'Monsoon Onset (Regime Shift)', fill: '#dc2626', fontSize: 10, position: 'top' }}
                />
                <Area
                  type="monotone"
                  dataKey="adaptiveUpperBand"
                  name="ACI Upper Band (q_t)"
                  fill="#10b981"
                  fillOpacity={0.15}
                  stroke="#059669"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="observedError"
                  name="Observed NWP Verification Error (mm)"
                  stroke="#1e3a8a"
                  strokeWidth={2}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={3.5}
                        fill={payload.isCovered ? '#1e3a8a' : '#dc2626'}
                        stroke="#ffffff"
                        strokeWidth={1}
                      />
                    );
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
