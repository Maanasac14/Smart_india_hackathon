import { RegionData } from '../types';

export const REGION_OPTIONS: string[] = [
  "Maharashtra (Western Ghats - Mahabaleshwar/Goa)",
  "Uttarakhand (Himalayan Foothills)",
  "Meghalaya & Assam (Cherrapunji / Northeast)",
  "Maharashtra (Mumbai Suburban Coastal)",
  "Tamil Nadu & Chennai (South Peninsula)",
  "Madhya Pradesh & Central India (Nagpur Corridor)",
  "Delhi NCR & Haryana (Indo-Gangetic Plain)",
  "Rajasthan (Northwest Arid / Thar Desert)",
  "Jammu & Kashmir (Himalayan Ridge)",
  "Ladakh (High-Altitude Cold Desert)",
  "Himachal Pradesh (Steep Orography)",
  "Gujarat (West Coast & Gulf of Kutch)",
  "Kerala (Monsoon Gateway)",
  "Karnataka (Ghats & Deccan)",
  "West Bengal & Odisha (Bay of Bengal Coast)",
  "Andhra Pradesh & Telangana",
  "Lakshadweep Islands (Arabian Sea)",
  "Andaman & Nicobar Islands (Bay of Bengal)"
];

export const REGIME_OPTIONS: string[] = [
  "Monsoon Depression (High Convective Risk)",
  "Western Disturbance (Mid-Latitude Interaction)",
  "Tropical Cyclone / Low Pressure System",
  "Heatwave / Anti-Cyclonic Stagnation",
  "Active Monsoon Phase",
  "Break Monsoon Phase (Suppressed Convection)"
];

export const INITIAL_STATES_DATA: RegionData[] = [
  { name: "Jammu & Kashmir", category: "UT", lat: 33.7782, lon: 76.5762, terrain: "Himalayan Ridge / Western Disturbance", bust_prob: 0.74, error_mm: 6.2, region_group: "Himalayan" },
  { name: "Ladakh", category: "UT", lat: 34.1526, lon: 77.5771, terrain: "High-Altitude Cold Desert", bust_prob: 0.31, error_mm: 2.1, region_group: "Himalayan" },
  { name: "Himachal Pradesh", category: "State", lat: 31.1048, lon: 77.1734, terrain: "Steep Orography / Cloudburst Prone", bust_prob: 0.70, error_mm: 5.8, region_group: "Himalayan" },
  { name: "Uttarakhand", category: "State", lat: 30.0668, lon: 79.0193, terrain: "Foothill Orographic Shear", bust_prob: 0.76, error_mm: 6.5, region_group: "Himalayan Foothills (Uttarakhand)" },
  { name: "Punjab", category: "State", lat: 31.1471, lon: 75.3412, terrain: "Agricultural Plains", bust_prob: 0.32, error_mm: 2.3, region_group: "Indo-Gangetic" },
  { name: "Haryana & Delhi", category: "State/UT", lat: 28.6139, lon: 77.2090, terrain: "Plains / Urban Convective Island", bust_prob: 0.38, error_mm: 2.8, region_group: "Indo-Gangetic Plain (Delhi NCR)" },
  { name: "Rajasthan", category: "State", lat: 27.0238, lon: 74.2179, terrain: "Thar Arid / Heatwave Axis", bust_prob: 0.22, error_mm: 1.4, region_group: "Northwest Arid (Jodhpur / Thar)" },
  { name: "Gujarat", category: "State", lat: 22.2587, lon: 71.1924, terrain: "Coastal Lowland / Arabian Sea Cyclones", bust_prob: 0.58, error_mm: 4.6, region_group: "West Coast" },
  { name: "Maharashtra (Western Ghats)", category: "State", lat: 17.9237, lon: 73.6586, terrain: "Complex Escarpment (Mahabaleshwar)", bust_prob: 0.82, error_mm: 7.8, region_group: "Western Ghats (Mahabaleshwar/Goa)" },
  { name: "Maharashtra (Mumbai Suburban)", category: "State", lat: 19.0760, lon: 72.8777, terrain: "Coastal Orographic Convergence", bust_prob: 0.69, error_mm: 5.4, region_group: "West Coast (Mumbai Suburban)" },
  { name: "Goa", category: "State", lat: 15.2993, lon: 74.1240, terrain: "Coastal Ghats Margin", bust_prob: 0.73, error_mm: 6.1, region_group: "Western Ghats (Mahabaleshwar/Goa)" },
  { name: "Madhya Pradesh", category: "State", lat: 22.9734, lon: 78.6569, terrain: "Central Plateau / Monsoon Low Track", bust_prob: 0.45, error_mm: 3.5, region_group: "Central India (Nagpur / MP)" },
  { name: "Chhattisgarh", category: "State", lat: 21.2787, lon: 81.8661, terrain: "Mahanadi Basin / Convective Core", bust_prob: 0.53, error_mm: 4.2, region_group: "Central India" },
  { name: "Uttar Pradesh", category: "State", lat: 26.8467, lon: 80.9462, terrain: "Gangetic Moisture Trough", bust_prob: 0.42, error_mm: 3.1, region_group: "Indo-Gangetic" },
  { name: "Bihar", category: "State", lat: 25.0961, lon: 85.3131, terrain: "Floodplain / Monsoon Trough Axis", bust_prob: 0.56, error_mm: 4.4, region_group: "Indo-Gangetic" },
  { name: "Jharkhand", category: "State", lat: 23.6102, lon: 85.2799, terrain: "Chota Nagpur Plateau", bust_prob: 0.49, error_mm: 3.8, region_group: "Central India" },
  { name: "West Bengal", category: "State", lat: 22.9868, lon: 87.8550, terrain: "Gangetic Delta / Kalbaisakhi Shear", bust_prob: 0.61, error_mm: 4.9, region_group: "East Coast" },
  { name: "Odisha", category: "State", lat: 20.9517, lon: 85.0985, terrain: "Bay of Bengal Cyclone Landfall", bust_prob: 0.67, error_mm: 5.5, region_group: "East Coast" },
  { name: "Meghalaya (Cherrapunji)", category: "State", lat: 25.2700, lon: 91.7300, terrain: "Funnel Orography (Extreme Rain)", bust_prob: 0.85, error_mm: 8.5, region_group: "Northeast India (Cherrapunji/Assam)" },
  { name: "Assam", category: "State", lat: 26.2006, lon: 92.9376, terrain: "Brahmaputra Valley Convective Basin", bust_prob: 0.77, error_mm: 6.8, region_group: "Northeast India (Cherrapunji/Assam)" },
  { name: "Arunachal Pradesh", category: "State", lat: 28.2180, lon: 94.7278, terrain: "Eastern Himalayan Escarpment", bust_prob: 0.75, error_mm: 6.4, region_group: "Himalayan" },
  { name: "Nagaland, Manipur & Mizoram", category: "States", lat: 24.6637, lon: 93.9063, terrain: "Patkai / Lushai Hills", bust_prob: 0.64, error_mm: 5.1, region_group: "Northeast" },
  { name: "Tripura", category: "State", lat: 23.9408, lon: 91.9882, terrain: "Lowland Convective Funnel", bust_prob: 0.59, error_mm: 4.7, region_group: "Northeast" },
  { name: "Sikkim", category: "State", lat: 27.5330, lon: 88.5122, terrain: "High Mountain Ridge", bust_prob: 0.71, error_mm: 5.9, region_group: "Himalayan" },
  { name: "Karnataka", category: "State", lat: 15.3173, lon: 75.7139, terrain: "Windward / Leeward Ghats Split", bust_prob: 0.63, error_mm: 5.0, region_group: "Western Ghats" },
  { name: "Telangana", category: "State", lat: 17.8749, lon: 78.1809, terrain: "Semi-Arid Deccan Plateau", bust_prob: 0.44, error_mm: 3.4, region_group: "South Peninsula" },
  { name: "Andhra Pradesh", category: "State", lat: 15.9129, lon: 79.7400, terrain: "East Coast Marine Boundary", bust_prob: 0.55, error_mm: 4.3, region_group: "South Peninsula" },
  { name: "Kerala", category: "State", lat: 10.8505, lon: 76.2711, terrain: "Monsoon Gateway / Ghats Barrier", bust_prob: 0.79, error_mm: 7.1, region_group: "Western Ghats" },
  { name: "Tamil Nadu", category: "State", lat: 11.1271, lon: 78.6569, terrain: "Northeast Monsoon / Rain Shadow", bust_prob: 0.52, error_mm: 4.1, region_group: "South Peninsula (Chennai Coastal)" },
  { name: "Lakshadweep Islands", category: "UT", lat: 10.5667, lon: 72.6417, terrain: "Arabian Sea Coral Atolls", bust_prob: 0.48, error_mm: 3.9, region_group: "Island UT" },
  { name: "Andaman & Nicobar Islands", category: "UT", lat: 11.6670, lon: 92.7358, terrain: "Bay of Bengal Tropical Archipelago", bust_prob: 0.66, error_mm: 5.3, region_group: "Island UT" }
];
