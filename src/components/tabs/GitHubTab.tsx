import React from 'react';
import { GITHUB_REPO_URL } from '../../data/groundings';
import { ExternalLink, FolderGit2, CheckCircle2, FileCode, Cpu, ArrowRight } from 'lucide-react';

export const GitHubTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
        <span className="inline-block bg-slate-100 text-slate-800 font-bold text-xs px-2.5 py-0.5 rounded border border-slate-300 uppercase tracking-wider">
          OPEN SOURCE CODEBASE
        </span>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <FolderGit2 className="w-6 h-6 text-slate-800" />
              Preeti112007 / sihdemo
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              AI-Based Forecast Bust Detection System for Smart India Hackathon (SIH26079)
            </p>
          </div>

          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow-xs transition hover:shadow cursor-pointer shrink-0 self-start sm:self-auto"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <FileCode className="w-4 h-4 text-blue-600" />
              Core Architecture Files
            </div>
            <ul className="text-xs space-y-1.5 font-mono text-slate-700">
              <li>&bull; <span className="text-blue-700 font-bold">app.py</span> — Multi-tab controller</li>
              <li>&bull; <span className="text-blue-700 font-bold">frontend.py</span> — UI components &amp; CSS</li>
              <li>&bull; <span className="text-blue-700 font-bold">lyapunov.py</span> — Lorenz chaos exponent</li>
              <li>&bull; <span className="text-blue-700 font-bold">step13_calibrated.py</span> — Conformal inference</li>
              <li>&bull; <span className="text-blue-700 font-bold">build_error_db.py</span> — Error DB generator</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <Cpu className="w-4 h-4 text-indigo-600" />
              Scientific Modules
            </div>
            <ul className="text-xs space-y-1.5 text-slate-700">
              <li>&bull; <strong>Lyapunov Divergence:</strong> Lorenz deterministic chaos</li>
              <li>&bull; <strong>Shannon Entropy:</strong> Information-theoretic sharpness</li>
              <li>&bull; <strong>Conformal Prediction:</strong> Finite-sample coverage guarantees</li>
              <li>&bull; <strong>Adaptive Conformal (ACI):</strong> Monsoon regime adaptation</li>
            </ul>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Verified &amp; Operational
            </div>
            <ul className="text-xs space-y-1.5 text-slate-700">
              <li>&bull; 31 Regional Centroids across India</li>
              <li>&bull; Live NOAA GFS Open-Meteo Integration</li>
              <li>&bull; 10,000 paired forecast-error training set</li>
              <li>&bull; Zero-retraining online calibration</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
