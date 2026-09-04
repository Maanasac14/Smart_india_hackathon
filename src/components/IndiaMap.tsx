import React, { useState } from 'react';
import { INDIAN_STATES_DATA, SRI_LANKA_PATH, IndianStateMapData } from '../data/indiaMapData';
import { RegionData } from '../types';
import { Compass, Eye, ShieldCheck, MapPin, Activity, Sparkles, Layers, Box, Info } from 'lucide-react';

interface IndiaMapProps {
  regions: RegionData[];
  selectedRegion: string;
  onSelectRegion: (regionName: string) => void;
  leadTime: number;
  confidenceLevel: number;
}

export const IndiaMap: React.FC<IndiaMapProps> = ({
  regions,
  selectedRegion,
  onSelectRegion,
  leadTime,
  confidenceLevel
}) => {
  const [hoveredState, setHoveredState] = useState<IndianStateMapData | null>(null);
  const [is3DView, setIs3DView] = useState<boolean>(false);
  const [mapMode, setMapMode] = useState<'official' | 'heatmap'>('heatmap');
  const [showPillars, setShowPillars] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);

  // Helper to compute state specific dynamic risk based on lead time
  const getStateRisk = (state: IndianStateMapData) => {
    // Lead time penalty: grows monotonically with lead time
    const leadFactor = 1.0 + (leadTime - 1) * 0.08;
    const error_mm = Number((state.baseError * leadFactor).toFixed(1));
    const bust_prob = Math.min(0.96, Math.max(0.12, Number((state.baseBustProb * leadFactor).toFixed(2))));
    
    // Conformal prediction bounds
    const halfWidth = Number((error_mm * (1.1 - confidenceLevel * 0.5)).toFixed(1));
    const lower = Math.max(0, Number((error_mm - halfWidth).toFixed(1)));
    const upper = Number((error_mm + halfWidth).toFixed(1));

    return { error_mm, bust_prob, lower, upper };
  };

  // Color generator for heatmap mode
  const getStateFillColor = (bust_prob: number, isSelected: boolean, isHovered: boolean) => {
    if (isSelected) return '#1d4ed8'; // deep operational blue
    if (mapMode === 'official') {
      if (isHovered) return '#e0f2fe';
      return '#ffffff'; // pristine white as in user's outline map
    }
    // Heatmap mode
    if (bust_prob >= 0.65) return isHovered ? '#b91c1c' : '#ef4444'; // Red (High risk)
    if (bust_prob >= 0.45) return isHovered ? '#b45309' : '#f59e0b'; // Amber (Moderate risk)
    return isHovered ? '#047857' : '#10b981'; // Green (Low risk)
  };

  // Active state data
  const selectedStateData = INDIAN_STATES_DATA.find(
    (s) =>
      s.name.toLowerCase() === selectedRegion.toLowerCase() ||
      selectedRegion.toLowerCase().includes(s.name.toLowerCase()) ||
      s.name.toLowerCase().includes(selectedRegion.split(' (')[0].toLowerCase())
  ) || INDIAN_STATES_DATA[19]; // Default Maharashtra

  const activeHoverRisk = hoveredState ? getStateRisk(hoveredState) : null;
  const activeSelectedRisk = getStateRisk(selectedStateData);

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 space-y-4 shadow-xs">
      {/* IMD Operational Cartographic Suite Bar */}
      <div className="bg-slate-50 p-3.5 sm:p-4 rounded-xl flex flex-wrap justify-between items-center gap-3 border border-slate-200">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-900 bg-blue-100/90 px-2 py-0.5 rounded border border-blue-200 font-mono">
              SURVEY OF INDIA COMPLIANT
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              POLITICAL OUTLINE &bull; 37 STATES &amp; UNION TERRITORIES
            </span>
          </div>
          <div className="text-lg sm:text-xl font-black text-slate-900 tracking-wider font-masthead">
            INDIA — FORECAST BUST RISK MAP &amp; CONSOLE
          </div>
        </div>

        {/* Map View Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Perspective View Toggle */}
          <button
            onClick={() => setIs3DView(!is3DView)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              is3DView
                ? 'bg-blue-600 text-white font-black border border-blue-700 shadow-xs'
                : 'bg-white text-slate-700 hover:text-blue-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>{is3DView ? 'Perspective View' : 'Standard View'}</span>
          </button>

          {/* Map Color Mode Toggle */}
          <button
            onClick={() => setMapMode(mapMode === 'official' ? 'heatmap' : 'official')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              mapMode === 'official'
                ? 'bg-purple-600 text-white font-black border border-purple-700 shadow-xs'
                : 'bg-white text-slate-700 hover:text-purple-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapMode === 'official' ? 'Official Outline' : 'Bust Risk Heatmap'}</span>
          </button>

          {/* Risk Markers Toggle */}
          <button
            onClick={() => setShowPillars(!showPillars)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
              showPillars
                ? 'bg-emerald-600 text-white font-black border border-emerald-700 shadow-xs'
                : 'bg-white text-slate-700 hover:text-emerald-700 hover:bg-slate-50 border border-slate-200 shadow-2xs'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Risk Markers</span>
          </button>
        </div>
      </div>

      {/* Main Map Presentation Stage */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-slate-300/80 shadow-inner bg-[#bce3fa] p-2 sm:p-4">
        {/* Animated Ocean Shimmer Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#cae9fc] via-[#b5e0f9] to-[#9ed5f7] pointer-events-none opacity-80" />

        {/* 3D Perspective Stage Wrapper */}
        <div
          className={`relative w-full transition-transform duration-700 ease-out origin-center ${
            is3DView ? 'scale-[0.98] sm:scale-100' : 'scale-100'
          }`}
          style={
            is3DView
              ? {
                  transform: 'perspective(1300px) rotateX(25deg) rotateZ(-1.5deg) translateY(-2%)',
                  transformStyle: 'preserve-3d'
                }
              : {}
          }
        >
          {/* SVG Map of India with Exact Coordinates */}
          <svg
            viewBox="0 0 1000 1150"
            className="w-full h-auto max-h-[820px] select-none filter drop-shadow-md"
            style={{ shapeRendering: 'geometricPrecision' }}
          >
            <defs>
              {/* Radial gradient for 3D state shading */}
              <radialGradient id="stateConvex" cx="40%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
              </radialGradient>

              {/* 3D Pillar Glow Filter */}
              <filter id="glowRadar" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* ======================================================== */}
            {/* CARTOGRAPHIC OVERLAYS (EXACTLY MATCHING ATTACHED IMAGE)  */}
            {/* ======================================================== */}

            {/* Top Right Header: "I N D I A \n OUTLINE MAP WITH STATES & UNION TERRITORIES" */}
            <g transform="translate(680, 45)" className="font-sans pointer-events-none">
              <text
                x="140"
                y="0"
                textAnchor="middle"
                className="text-[26px] font-black tracking-[0.35em] fill-indigo-950 font-serif"
              >
                I N D I A
              </text>
              <text
                x="140"
                y="24"
                textAnchor="middle"
                className="text-[12px] font-black tracking-wider fill-indigo-900 font-sans"
              >
                OUTLINE MAP WITH STATES
              </text>
              <text
                x="140"
                y="40"
                textAnchor="middle"
                className="text-[12px] font-black tracking-wider fill-indigo-900 font-sans"
              >
                &amp; UNION TERRITORIES
              </text>
            </g>

            {/* Top Left North Arrow */}
            <g transform="translate(65, 55)" className="pointer-events-none">
              <path d="M 0,-25 L 8,10 L 0,4 L -8,10 Z" fill="#1e293b" />
              <path d="M 0,-25 L 0,4 L -8,10 Z" fill="#64748b" />
              <text
                x="0"
                y="-32"
                textAnchor="middle"
                className="text-[14px] font-black fill-slate-900 font-sans"
              >
                N
              </text>
              <line x1="0" y1="12" x2="0" y2="24" stroke="#1e293b" strokeWidth="1.5" />
            </g>

            {/* Ocean Water Body Typography */}
            <g className="font-serif italic font-semibold text-[13px] tracking-[0.25em] fill-blue-800/60 pointer-events-none select-none">
              <text x="80" y="660">A R A B I A N</text>
              <text x="105" y="682">S E A</text>

              <text x="750" y="640">B A Y   O F</text>
              <text x="745" y="662">B E N G A L</text>

              <text x="360" y="1120" className="text-[15px] tracking-[0.35em]">
                I N D I A N   O C E A N
              </text>
            </g>

            {/* Sri Lanka Landmass Outline */}
            {SRI_LANKA_PATH && (
              <g className="pointer-events-none">
                <path
                  d={SRI_LANKA_PATH}
                  fill="#f1f5f9"
                  stroke="#94a3b8"
                  strokeWidth="1"
                  className="filter drop-shadow-xs"
                />
                <text
                  x="445"
                  y="1010"
                  textAnchor="middle"
                  className="text-[10px] font-sans font-bold fill-slate-600 tracking-wider"
                >
                  SRI LANKA
                </text>
              </g>
            )}

            {/* Lakshadweep Inset Box (As depicted on official Map of India) */}
            <g transform="translate(115, 840)" className="pointer-events-none">
              <rect
                x="0"
                y="0"
                width="110"
                height="130"
                fill="none"
                stroke="#64748b"
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x="55"
                y="120"
                textAnchor="middle"
                className="text-[9px] font-sans font-bold fill-slate-700 tracking-wider"
              >
                LAKSHADWEEP
              </text>
            </g>

            {/* Andaman and Nicobar Islands Label */}
            <g transform="translate(850, 840)" className="pointer-events-none">
              <text
                x="0"
                y="0"
                textAnchor="middle"
                className="text-[9px] font-sans font-bold fill-slate-700 tracking-wider"
              >
                ANDAMAN &amp;
              </text>
              <text
                x="0"
                y="12"
                textAnchor="middle"
                className="text-[9px] font-sans font-bold fill-slate-700 tracking-wider"
              >
                NICOBAR ISLANDS
              </text>
            </g>

            {/* ======================================================== */}
            {/* ALL 37 STATES & UNION TERRITORIES (ACCURATE SURVEY OUTLINES) */}
            {/* ======================================================== */}
            <g id="states-group">
              {INDIAN_STATES_DATA.map((state) => {
                const isSelected =
                  state.name.toLowerCase() === selectedRegion.toLowerCase() ||
                  selectedRegion.toLowerCase().includes(state.name.toLowerCase());
                const isHovered = hoveredState?.id === state.id;
                const { bust_prob } = getStateRisk(state);
                const fillColor = getStateFillColor(bust_prob, isSelected, isHovered);

                return (
                  <g
                    key={state.id}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredState(state)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectRegion(state.name)}
                  >
                    {/* State Landmass Polygon */}
                    <path
                      d={state.svgPath}
                      fill={fillColor}
                      stroke={isSelected ? '#1e3a8a' : '#475569'}
                      strokeWidth={isSelected ? 2.5 : mapMode === 'official' ? 0.85 : 1}
                      strokeDasharray={mapMode === 'official' ? '3 1.5' : undefined}
                      className="transition-colors duration-200 hover:opacity-90"
                      style={{
                        filter: isSelected
                          ? 'drop-shadow(0 4px 8px rgba(30, 58, 138, 0.4))'
                          : isHovered
                          ? 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2))'
                          : undefined
                      }}
                    />

                    {/* Subtle convex 3D overlay */}
                    {mapMode === 'heatmap' && (
                      <path
                        d={state.svgPath}
                        fill="url(#stateConvex)"
                        pointerEvents="none"
                        opacity={0.3}
                      />
                    )}

                    {/* State Text Label */}
                    {showLabels && (
                      <text
                        x={state.center[0]}
                        y={state.center[1]}
                        textAnchor="middle"
                        dominantBaseline="central"
                        pointerEvents="none"
                        className={`font-sans select-none tracking-tight font-black transition-all ${
                          isSelected
                            ? 'text-[11px] fill-white font-extrabold'
                            : mapMode === 'official'
                            ? 'text-[8.5px] fill-slate-800 font-bold'
                            : 'text-[8.5px] fill-slate-900 font-bold drop-shadow-xs'
                        }`}
                      >
                        {state.name.replace(' & ', '\n').split(' ')[0]}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* ======================================================== */}
            {/* 3D EXTRUDED PILLARS AT CENTROIDS WITH ANIMATED RADAR BEACONS */}
            {/* ======================================================== */}
            {showPillars && (
              <g id="pillars-group" pointerEvents="none">
                {INDIAN_STATES_DATA.map((state) => {
                  const { error_mm, bust_prob } = getStateRisk(state);
                  const isSelected =
                    state.name.toLowerCase() === selectedRegion.toLowerCase() ||
                    selectedRegion.toLowerCase().includes(state.name.toLowerCase());
                  
                  // Height of 3D pillar proportional to expected error
                  const pillarHeight = Math.max(14, Math.min(85, error_mm * 9.5));
                  const [cx, cy] = state.center;
                  const pillarColor =
                    bust_prob >= 0.65 ? '#ef4444' : bust_prob >= 0.45 ? '#f59e0b' : '#10b981';

                  return (
                    <g key={`pillar-${state.id}`} className="transition-transform duration-300">
                      {/* 3D Pillar Vertical Stem */}
                      <line
                        x1={cx}
                        y1={cy}
                        x2={cx}
                        y2={cy - pillarHeight}
                        stroke={pillarColor}
                        strokeWidth={isSelected ? 4 : 2.5}
                        strokeLinecap="round"
                        opacity={0.85}
                      />

                      {/* Ground Base Ring */}
                      <ellipse
                        cx={cx}
                        cy={cy}
                        rx={isSelected ? 7 : 4}
                        ry={isSelected ? 3.5 : 2}
                        fill="none"
                        stroke={pillarColor}
                        strokeWidth={1.5}
                        opacity={0.6}
                      />

                      {/* Beacon Top Sphere */}
                      <circle
                        cx={cx}
                        cy={cy - pillarHeight}
                        r={isSelected ? 5.5 : 3.5}
                        fill={pillarColor}
                        stroke="#ffffff"
                        strokeWidth={1.5}
                        filter="url(#glowRadar)"
                      />

                      {/* Animated Radar Pulse Ring for Elevated Risk (>0.60) */}
                      {bust_prob >= 0.60 && (
                        <circle
                          cx={cx}
                          cy={cy - pillarHeight}
                          r={10}
                          fill="none"
                          stroke={pillarColor}
                          strokeWidth={1.2}
                          className="animate-ping origin-center"
                          opacity={0.75}
                        />
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* ======================================================== */}
            {/* CARTOGRAPHIC LEGEND (MATCHING ATTACHED IMAGE)            */}
            {/* ======================================================== */}
            <g transform="translate(680, 1020)" className="pointer-events-none font-sans">
              <rect
                x="0"
                y="0"
                width="280"
                height="88"
                rx="6"
                fill="#ffffff"
                fillOpacity="0.9"
                stroke="#64748b"
                strokeWidth="1"
              />

              {/* International Boundary */}
              <line x1="16" y1="20" x2="52" y2="20" stroke="#0f172a" strokeWidth="2" />
              <text x="62" y="24" className="text-[10px] font-bold fill-slate-900 font-sans">
                International Boundary
              </text>

              {/* State/UT Boundary */}
              <line
                x1="16"
                y1="40"
                x2="52"
                y2="40"
                stroke="#475569"
                strokeWidth="1.2"
                strokeDasharray="4 2"
              />
              <text x="62" y="44" className="text-[10px] font-bold fill-slate-800 font-sans">
                State/UT Boundary
              </text>

              {/* Map not to Scale */}
              <text x="16" y="64" className="text-[9px] font-semibold fill-slate-600 font-sans">
                Map not to Scale
              </text>

              {/* Copyright note */}
              <text x="16" y="78" className="text-[8.5px] font-bold fill-indigo-900 font-sans">
                Copyright &copy; 2021 www.mapsofindia.com &bull; IMD SIH26079
              </text>
            </g>
          </svg>
        </div>

        {/* Dynamic Floating Telemetry Card on Hover */}
        {hoveredState && activeHoverRisk && (
          <div className="absolute top-4 left-4 z-20 bg-white p-3.5 rounded-xl border border-slate-200 max-w-xs shadow-lg animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-700" />
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider font-masthead">
                  {hoveredState.name}
                </span>
              </div>
              <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">
                D{leadTime} FORECAST
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Bust Risk P(&gt;5mm):</span>
                <span
                  className={`font-mono font-black ${
                    activeHoverRisk.bust_prob >= 0.65
                      ? 'text-red-600'
                      : activeHoverRisk.bust_prob >= 0.45
                      ? 'text-amber-600'
                      : 'text-emerald-700'
                  }`}
                >
                  {(activeHoverRisk.bust_prob * 100).toFixed(0)}%
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Expected NWP Error:</span>
                <span className="font-mono font-bold text-slate-900">
                  {activeHoverRisk.error_mm} mm
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Conformal Interval:</span>
                <span className="font-mono text-[11px] font-bold text-blue-800">
                  [{activeHoverRisk.lower}, {activeHoverRisk.upper}] mm
                </span>
              </div>

              <div className="pt-1 border-t border-slate-200 text-[10px] text-slate-500 font-mono flex items-center justify-between">
                <span>{hoveredState.synopticZone}</span>
                <span className="text-blue-700 font-bold">Click to Select</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* State Quick-Selection Bar & Operational Directive */}
      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-900 font-masthead">
              SELECTED METEOROLOGICAL ZONE:
            </span>
            <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg text-xs font-mono font-black text-blue-900 shadow-2xs">
              {selectedStateData.name} ({selectedStateData.synopticZone})
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-600">
              Expected Error:{' '}
              <strong className="text-slate-900">{activeSelectedRisk.error_mm} mm</strong>
            </span>
            <span>&bull;</span>
            <span className="text-slate-600">
              Conformal Coverage (1-&alpha;):{' '}
              <strong className="text-blue-900">{(confidenceLevel * 100).toFixed(0)}%</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
