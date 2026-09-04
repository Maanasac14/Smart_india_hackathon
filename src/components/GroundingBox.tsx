import React from 'react';
import { BookOpen } from 'lucide-react';

interface GroundingBoxProps {
  scientist: string;
  concept: string;
  role: string;
}

export const GroundingBox: React.FC<GroundingBoxProps> = ({ scientist, concept, role }) => {
  return (
    <div className="bg-slate-50 border border-slate-200 border-l-4 border-l-blue-700 p-3.5 sm:p-4 my-3 text-xs sm:text-sm text-slate-700 rounded-r-xl flex items-start gap-3">
      <div className="p-1 rounded-md bg-blue-100 text-blue-800 shrink-0 mt-0.5">
        <BookOpen className="w-3.5 h-3.5" />
      </div>
      <div className="leading-relaxed">
        <strong className="text-blue-900 font-extrabold uppercase font-mono tracking-wider text-[11px] block sm:inline mr-1">
          SCIENTIFIC GROUNDING &bull; {scientist}:
        </strong>{' '}
        <span className="font-bold text-slate-900">{concept}</span> —{' '}
        <em className="text-slate-600 font-medium not-italic">{role}</em>
      </div>
    </div>
  );
};

