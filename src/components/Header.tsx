import React from 'react';
import { ExternalLink, Radio, CheckCircle, RefreshCw, Activity, ShieldAlert, Cpu } from 'lucide-react';
import { GITHUB_REPO_URL } from '../data/groundings';

interface HeaderProps {
  isLive: boolean;
  livePrecip: number[];
  isLoadingLive: boolean;
  onRefreshLive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isLive,
  livePrecip,
  isLoadingLive,
  onRefreshLive
}) => {
  return (
    <header className="space-y-3.5">
      {/* Formal Government Tricolor Micro-Banner */}
      <div className="rounded-t-xl overflow-hidden shadow-xs">
        <div className="tricolor-stripe w-full"></div>
      </div>

      {/* Main IMD Institutional Masthead Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 border-b border-slate-200/80 pb-5">
          {/* Left: IMD Emblem + Government Hierarchy */}
          <div className="flex items-start sm:items-center gap-4">
            {/* Meteorological Emblem */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-sm p-1.5 bg-slate-50 border border-slate-200">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-700 to-indigo-900 flex flex-col items-center justify-center text-white shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#60a5fa,transparent_70%)] opacity-40"></div>
                <span className="text-xl sm:text-2xl drop-shadow-md z-10">🌦️</span>
                <span className="text-[7px] font-black tracking-widest uppercase text-blue-200 z-10 font-mono">
                  IMD-NWP
                </span>
              </div>
            </div>

            {/* Formal Hierarchy Titles */}
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                <span>भारत सरकार</span>
                <span className="text-slate-300">&bull;</span>
                <span>GOVERNMENT OF INDIA</span>
                <span className="text-slate-300">&bull;</span>
                <span className="text-blue-700 font-semibold">MINISTRY OF EARTH SCIENCES</span>
              </div>

              <div className="text-base sm:text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>भारत मौसम विज्ञान विभाग</span>
                <span className="text-slate-300 hidden sm:inline">|</span>
                <span className="text-blue-900 font-extrabold text-sm sm:text-lg">
                  INDIA METEOROLOGICAL DEPARTMENT
                </span>
              </div>

              <div className="text-xs sm:text-sm font-semibold text-slate-600 flex flex-wrap items-center gap-2">
                <span>NATIONAL WEATHER FORECASTING CENTRE (NWFC), NEW DELHI</span>
                <span className="bg-blue-100/80 text-blue-900 text-[10px] font-extrabold px-2 py-0.5 rounded border border-blue-200">
                  MAUSAM BHAWAN
                </span>
              </div>
            </div>
          </div>

          {/* Right: Operational Status & System Version */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {/* Version Tag */}
            <div className="bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-xl text-left">
              <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest block">
                SYSTEM RELEASE
              </span>
              <span className="text-xs font-black text-slate-800 font-mono flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                IMD-DASHBOARD v2.0
              </span>
            </div>

            {/* Problem Statement Code */}
            <div className="bg-blue-900 text-white px-3.5 py-1.5 rounded-xl shadow-xs text-left border border-blue-950">
              <span className="text-[9px] font-mono font-bold text-blue-200 uppercase tracking-widest block">
                PROJECT IDENTITY
              </span>
              <span className="text-xs font-black tracking-wider text-white">
                SIH26079 • BUST DETECTOR
              </span>
            </div>

            {/* GitHub Link */}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-300 hover:border-blue-600 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-800 flex items-center gap-1.5 shadow-xs transition cursor-pointer"
              title="Inspect Operational Codebase on GitHub"
            >
              <span className="text-sm">📦</span>
              <span className="font-mono text-[11px]">sihdemo</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Operational Scope Banner */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="text-slate-700 leading-relaxed max-w-4xl font-medium">
            <strong className="text-slate-900 font-bold">Operational Decision-Support System:</strong>{' '}
            Automated divergence risk detection, chaotic error growth horizon (Lorenz Lyapunov), 
            and finite-sample Conformal Prediction bounds for medium-range GFS &amp; ECMWF numerical weather predictions.
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 shrink-0">
            <span className="bg-slate-200/80 px-2 py-0.5 rounded text-slate-700">GRID: 0.25° L137</span>
            <span className="bg-slate-200/80 px-2 py-0.5 rounded text-slate-700">CYCLE: 00 UTC</span>
          </div>
        </div>
      </div>

      {/* Light Telemetry Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 sm:px-4 sm:py-2.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs">
          {/* Pulsing Status LED */}
          <div className="flex items-center gap-2">
            <div className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
              isLive ? 'bg-emerald-100 ring-2 ring-emerald-300' : 'bg-amber-100'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                isLive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}></span>
            </div>
            <span className="font-bold text-slate-800 uppercase tracking-wide text-[11px]">
              {isLive ? 'NOAA / GFS LIVE TELEMETRY FEED' : 'BENCHMARK ARCHIVE MODE'}
            </span>
          </div>

          <span className="hidden sm:inline text-slate-300">|</span>

          {/* Precip Value Readout */}
          <div className="flex items-center gap-1.5 font-mono text-slate-700">
            <span className="text-slate-500 text-[11px]">Current Target Precip (Day 1):</span>
            <span className="font-black text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs">
              {livePrecip.length > 0 ? livePrecip[0].toFixed(1) : '12.4'} mm
            </span>
          </div>

          <span className="hidden md:inline text-slate-300">|</span>

          <span className="hidden md:inline text-[11px] text-slate-600 font-medium">
            Active assimilation pipeline for Indian Subcontinent
          </span>
        </div>

        {/* Sync Button */}
        <button
          onClick={onRefreshLive}
          disabled={isLoadingLive}
          className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold hover:text-blue-900 flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition shrink-0 shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isLoadingLive ? 'animate-spin' : ''}`} />
          <span>{isLoadingLive ? 'ACQUIRING 00 UTC...' : 'RE-SYNC TELEMETRY'}</span>
        </button>
      </div>
    </header>
  );
};
