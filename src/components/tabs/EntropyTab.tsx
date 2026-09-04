import React from 'react';
import { GroundingBox } from '../GroundingBox';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Binary, Gauge, Award, Activity, Sparkles, ShieldCheck } from 'lucide-react';

interface EntropyTabProps {
  baseSpread: number;
  leadTime: number;
  confPhys: number;
}

export const EntropyTab: React.FC<EntropyTabProps> = ({ baseSpread, leadTime, confPhys }) => {
  const center = 12.0 + leadTime * 1.2;
  const numBins = 15;
  const binWidth = (baseSpread * 4.0) / numBins;
  const minVal = center - baseSpread * 2.0;

  // Gaussian PDF for predictive probability distribution
  const bins = Array.from({ length: numBins }, (_, i) => {
    const x = minVal + (i + 0.5) * binWidth;
    const z = (x - center) / (baseSpread || 1);
    const density = (1 / ((baseSpread || 1) * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * z * z);
    return {
      binLabel: `${x.toFixed(1)}`,
      density: density,
      prob: density * binWidth
    };
  });

  const totalProb = bins.reduce((acc, b) => acc + b.prob, 0);
  const normalizedBins = bins.map((b) => ({
    ...b,
    prob: b.prob / totalProb,
    densityFormatted: Number(b.density.toFixed(3))
  }));

  // Shannon Entropy: H = -sum(p * log2(p))
  const shannonEntropy = normalizedBins.reduce((acc, b) => {
    if (b.prob > 1e-9) {
      return acc - b.prob * Math.log2(b.prob);
    }
    return acc;
  }, 0);

  const maxEntropy = Math.log2(numBins);
  const normEntropy = Math.min(1.0, Math.max(0.0, shannonEntropy / maxEntropy));
  const infoConf = (1.0 - normEntropy) * 100.0;
  const dualConfidence = 0.5 * confPhys + 0.5 * infoConf;

  const dualColor =
    dualConfidence >= 70 ? 'text-emerald-700' : dualConfidence >= 45 ? 'text-amber-700' : 'text-red-600';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded uppercase tracking-widest font-mono border border-indigo-200">
            SHANNON INFORMATION THEORY &bull; DUAL CONFIDENCE
          </span>
          <span className="text-xs font-mono text-slate-500">INFORMATION THEORY</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-masthead">
          Information-Theoretic Uncertainty &amp; Dual-Grounded Confidence
        </h2>
        <p className="text-sm text-slate-700 leading-relaxed max-w-4xl font-medium">
          In parallel with the Lyapunov physical chaos measure, the system computes the Shannon entropy of the forecast&apos;s predictive distribution.
          A sharply peaked distribution exhibits low entropy (high confidence); a dispersed distribution exhibits high entropy (low confidence).
          Combining the Lyapunov chaos signal with Shannon entropy produces a <strong className="text-slate-950 font-bold">dual-grounded confidence score</strong> — 
          one rooted in dynamical-systems physics, the other in information theory.
        </p>

        <GroundingBox
          scientist="Claude Shannon (Bell Labs, 1948)"
          concept="Entropy as a Formal Measure of Uncertainty"
          role="Founder of information theory who formally defined entropy: H(X) = -∑ p(x) log2 p(x). Grounding confidence in Shannon entropy ensures confidence is not an arbitrary heuristic, but backed by established mathematical uncertainty principles."
        />

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Shannon Entropy */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-indigo-700" />
                Shannon Entropy H(X)
              </span>
              <div className="text-2xl font-black text-slate-900 mt-2 font-mono">
                {shannonEntropy.toFixed(2)}{' '}
                <span className="text-xs text-slate-500 font-normal">bits</span>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Max possible for {numBins} bins: {maxEntropy.toFixed(2)} bits.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Information Spread
            </div>
          </div>

          {/* Normalized Entropy */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-blue-700" />
                Normalized Entropy (H/Hmax)
              </span>
              <div className="text-2xl font-black text-blue-900 mt-2 font-mono">
                {(normEntropy * 100).toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Dimensionless uncertainty bound bounded strictly between 0 and 1.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Scale Invariant
            </div>
          </div>

          {/* Information Confidence */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-emerald-700" />
                Information Confidence
              </span>
              <div className="text-2xl font-black text-emerald-900 mt-2 font-mono">
                {infoConf.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Information theory component: (1.0 &minus; norm_entropy) &times; 100.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-slate-500">
              Distribution Sharpness
            </div>
          </div>

          {/* Dual-Grounded Confidence */}
          <div className="bg-slate-50/60 rounded-xl p-4 sm:p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black text-purple-900 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                Dual-Grounded Confidence
              </span>
              <div className={`text-2xl font-black mt-2 font-mono ${dualColor}`}>
                {dualConfidence.toFixed(1)}%
              </div>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Harmonic synthesis: 50% Lyapunov Physics + 50% Shannon Information.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-200/80 text-[10px] font-mono text-purple-900 font-bold">
              Lorenz + Shannon Grounded
            </div>
          </div>
        </div>

        {/* Predictive Probability Density Distribution Chart */}
        <div className="bg-slate-50/70 border border-slate-200 p-4 sm:p-5 rounded-xl space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-300/80 pb-2">
            <h3 className="text-sm font-black text-slate-900 font-masthead">
              Predictive Distribution PDF: Probabilistic Precipitation Ensemble
            </h3>
            <span className="text-xs font-mono font-bold text-indigo-900">
              Ensemble Mean: {center.toFixed(1)} mm &bull; Spread: {baseSpread.toFixed(2)} mm
            </span>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={normalizedBins} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" opacity={0.6} />
                <XAxis
                  dataKey="binLabel"
                  label={{ value: 'Precipitation Threshold (mm)', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#475569' }}
                  tick={{ fontSize: 10, fill: '#475569' }}
                />
                <YAxis
                  label={{ value: 'Probability Density p(x)', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#475569' }}
                  tick={{ fontSize: 10, fill: '#475569' }}
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
                <Bar dataKey="prob" name="Probability Mass" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
