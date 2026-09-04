import { GroundingPerson, ErrorDbRow } from '../types';

export const GITHUB_REPO_URL = "https://github.com/Preeti112007/sihdemo";

export const MASTER_GROUNDINGS: GroundingPerson[] = [
  {
    name: "Lewis Fry Richardson",
    field: "Meteorology",
    steps: "NWP Foundations",
    role: "Founder of NWP (1922) — quantifying forecast trust & atmospheric numerical simulation."
  },
  {
    name: "Edward Lorenz",
    field: "Chaos Theory",
    steps: "Chaos & Lyapunov",
    role: "Lyapunov exponent; atmospheric deterministic chaos & butterfly effect."
  },
  {
    name: "Andrey Kolmogorov",
    field: "Turbulence Theory",
    steps: "Turbulence Cascade",
    role: "K41 turbulence cascade — physical mechanism driving chaotic error growth."
  },
  {
    name: "Jule Charney",
    field: "Dyn. Meteorology",
    steps: "Baroclinic Instability",
    role: "First computer forecast (ENIAC, 1950); baroclinic instability & cyclogenesis."
  },
  {
    name: "Fei-Fei Li",
    field: "Computer Vision / AI",
    steps: "Benchmark Datasets",
    role: "ImageNet benchmark philosophy for paired forecast-error training."
  },
  {
    name: "Tim Palmer",
    field: "Atmospheric Physics",
    steps: "Ensemble Spread",
    role: "ECMWF stochastic parameterization & ensemble uncertainty spread."
  },
  {
    name: "Edward Epstein & Cecil Leith",
    field: "Meteorology",
    steps: "Stochastic Forecasting",
    role: "Stochastic-dynamic forecasting (1969) via perturbed ensembles."
  },
  {
    name: "Claude Shannon",
    field: "Information Theory",
    steps: "Information Entropy",
    role: "Entropy H(X) as objective measure of forecast distribution uncertainty."
  },
  {
    name: "Norbert Wiener",
    field: "Cybernetics",
    steps: "Conformal Prediction",
    role: "Prediction under uncertainty (Wiener filter) — basis of conformal intervals."
  },
  {
    name: "Gibbs & Candès",
    field: "Statistical Learning",
    steps: "Adaptive Recalibration",
    role: "Adaptive Conformal Inference (ACI) for non-stationary recalibration."
  }
];

export const SAMPLE_ERROR_DB: ErrorDbRow[] = [
  { forecast: 3.00, actual: -0.52, error: 3.52, bust_label: 0 },
  { forecast: 6.89, actual: 7.49, error: 0.60, bust_label: 0 },
  { forecast: 20.53, actual: 16.84, error: 3.69, bust_label: 0 },
  { forecast: 13.67, actual: 14.12, error: 0.45, bust_label: 0 },
  { forecast: 18.93, actual: 16.54, error: 2.39, bust_label: 0 },
  { forecast: 23.88, actual: 23.48, error: 0.40, bust_label: 0 },
  { forecast: 30.21, actual: 30.60, error: 0.39, bust_label: 0 },
  { forecast: 9.66, actual: 7.40, error: 2.26, bust_label: 0 },
  { forecast: 24.06, actual: 22.12, error: 1.93, bust_label: 0 },
  { forecast: 7.17, actual: 8.45, error: 1.28, bust_label: 0 },
  { forecast: 11.17, actual: 13.71, error: 2.55, bust_label: 0 },
  { forecast: 20.13, actual: 17.86, error: 2.27, bust_label: 0 },
  { forecast: 23.91, actual: 25.91, error: 2.00, bust_label: 0 },
  { forecast: 31.29, actual: 30.33, error: 0.97, bust_label: 0 },
  { forecast: 31.22, actual: 30.37, error: 0.85, bust_label: 0 },
  { forecast: 9.76, actual: 8.73, error: 1.03, bust_label: 0 },
  { forecast: 29.51, actual: 32.97, error: 3.46, bust_label: 0 },
  { forecast: 32.22, actual: 31.30, error: 0.92, bust_label: 0 },
  { forecast: 8.58, actual: 6.29, error: 2.29, bust_label: 0 },
  { forecast: 14.25, actual: 20.85, error: 6.60, bust_label: 1 },
  { forecast: 8.10, actual: 14.40, error: 6.30, bust_label: 1 },
  { forecast: 28.30, actual: 21.10, error: 7.20, bust_label: 1 }
];
