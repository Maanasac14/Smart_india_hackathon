import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Activity, Clock, ShieldCheck, Gauge } from 'lucide-react';

interface LyapunovTabProps {
  delta0: number;
  deltaT: number;
  leadTime: number;
}

export const LyapunovTab: React.FC<LyapunovTabProps> = ({ delta0, deltaT, leadTime }) => {
  const eps = 1e-6;
  const lam = (1.0 / Math.max(1, leadTime)) * Math.log(Math.abs(deltaT) / (Math.abs(delta0) + eps));
  const tPred = lam > 0 ? 1.0 / Math.max(0.01, lam) : 14.0;
  const confPhys = Math.min(98.0, Math.max(5.0, Math.exp(-Math.max(0.0, lam * leadTime)) * 100.0));

  const lamColor = lam > 0.35 ? 'text-red-600' : lam > 0.18 ? 'text-amber-700' : 'text-emerald-700';
  const strokeColor = lam > 0.35 ? '#dc2626' : lam > 0.18 ? '#d97706' : '#16a34a';

  // 10-day exponential divergence trajectory
  const chartData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((day) => {
    const pert = delta0 * Math.exp(lam * day);
    return {
      day: `Day ${day}`,
      trajectory: Number(pert.toFixed(2)),
      threshold: 5.0
    };
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-blue-100 text-blue-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-blue-200">
            DYNAMICAL CHAOS PHYSICS &bull; LORENZ SYSTEM
          </span>
          <span className="text-xs font-mono text-slate-500">CHAOS PHYSICS BASELINE</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Physics-Grounded Confidence Baseline: Local Lyapunov Exponent
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          Before training any machine learning model, the system computes a local finite-time Lyapunov exponent (&lambda;) 
          derived from the exponential rate of divergence between successive NWP runs.
          This produces a physics-based confidence estimate that exists independently of the ML model — serving both as a sanity-check baseline and a core model feature.
        </p>

        <GroundingBox
          scientist="Edward Lorenz (MIT, 1963)"
          concept="Deterministic Chaos &amp; Finite Predictability"
          role="Discovered extreme sensitivity to initial conditions ('the butterfly effect') in atmospheric convection equations. Introduced the Lyapunov exponent measuring how fast two nearly identical atmospheric trajectories separate in phase space."
        />

        {/* 3 KPI Metrics in Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-700" />
                Local Lyapunov Exponent (&lambda;)
              </span>
              <div className={`text-2xl font-black mt-2 font-mono ${lamColor}`}>
                {lam.toFixed(3)}{' '}
                <span className="text-xs text-slate-500 font-normal">day&minus;1</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Logarithmic growth rate of initial perturbation: &delta;(t) = &delta;0 &times; e^(&lambda;t).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              {lam > 0.35 ? 'Chaotic Instability (High Error)' : 'Quasi-Stable Flow'}
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-700" />
                Theoretical Predictability Horizon (1/&lambda;)
              </span>
              <div className="text-2xl font-black text-amber-900 mt-2 font-mono">
                {tPred.toFixed(1)}{' '}
                <span className="text-xs text-slate-500 font-normal">days</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Characteristic e-folding timescale before atmospheric memory decays into noise.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Lorenz Predictability Limit
            </div>
          </div>

          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                Physical Confidence Score
              </span>
              <div className="text-2xl font-black text-emerald-900 mt-2 font-mono">
                {confPhys.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Direct computational implementation of Lorenz chaos theory: Confidence = 100 &times; e^(&minus;&lambda; &times; lead_time).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Lead Time: Day {leadTime}
            </div>
          </div>
        </div>

        {/* Exponential Divergence Trajectory Chart */}
        <div className="bg-slate-50/70 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-300/80 pb-2">
            <h3 className="text-sm font-black text-slate-900 font-masthead">
              Exponential Phase Space Error Growth Trajectory: &delta;(t) = &delta;0 &times; e^(&lambda;t)
            </h3>
            <span className="text-xs font-mono font-bold text-blue-900">
              Initial Perturbation (&delta;0): {delta0.toFixed(2)} mm
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#475569' }} />
                <YAxis
                  label={{ value: 'Perturbation Amplitude (mm)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#475569' }}
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
                  y={5.0}
                  label={{ value: 'Forecast Bust Threshold (5 mm)', fill: '#dc2626', fontSize: 10, position: 'top' }}
                  stroke="#dc2626"
                  strokeDasharray="4 4"
                />
                <Line
                  type="monotone"
                  dataKey="trajectory"
                  name="Error Trajectory δ(t)"
                  stroke={strokeColor}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: strokeColor }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
