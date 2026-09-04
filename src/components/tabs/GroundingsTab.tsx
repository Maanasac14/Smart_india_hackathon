import React from 'react';
import { MASTER_GROUNDINGS } from '../../data/groundings';
import { BookOpen, GraduationCap } from 'lucide-react';

export const GroundingsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs space-y-4">
        <span className="inline-block bg-blue-50 text-blue-700 font-bold text-xs px-2.5 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
          RIGOROUS ACADEMIC FOUNDATIONS
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Master Scientific Groundings Matrix (10 Pioneers)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed max-w-4xl">
          Every mathematical equation, feature group, and calibration step in this system is explicitly grounded in classical and contemporary scientific literature.
        </p>

        <div className="border border-slate-200 rounded-xl overflow-hidden mt-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Scientist &amp; Institution</th>
                  <th className="py-3 px-4">Field</th>
                  <th className="py-3 px-4">Scientific Focus Area</th>
                  <th className="py-3 px-4">Operational Architecture Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {MASTER_GROUNDINGS.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-extrabold text-slate-900 flex items-center gap-2">
                       <GraduationCap className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {item.field}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-700">
                      {item.steps}
                    </td>
                    <td className="py-3 px-4 text-slate-600 leading-relaxed">
                      {item.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
