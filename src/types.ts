export interface RegionData {
  name: string;
  category: 'State' | 'UT' | 'State/UT' | 'States';
  lat: number;
  lon: number;
  terrain: string;
  bust_prob: number;
  error_mm: number;
  region_group: string;
}

export interface SimulationState {
  selectedRegion: string;
  leadTime: number;
  selectedRegime: string;
  ensoIndex: number;
  iodIndex: number;
  mjoPhase: number;
  mjoAmp: number;
  confidenceLevel: number;
}

export interface GroundingPerson {
  name: string;
  field: string;
  steps: string;
  role: string;
}

export interface ErrorDbRow {
  forecast: number;
  actual: number;
  error: number;
  bust_label: number;
}
