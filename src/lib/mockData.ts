export const vehicleData: Record<string, VehicleData> = {
  AETHER0001: {
    vin: "AETHER0001",
    connected: true,
    model: "Model X",
    status: "healthy",
    statusLabel: "Healthy (minor brake alert)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 85, rpm: 2200, vibration: 0.03, battery: 13.8 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 93, rpm: 2400, vibration: 0.035, battery: 13.5 },
      { t: "2025-12-09T09:10:00+05:30", engine_temp: 101, rpm: 2600, vibration: 0.042, battery: 13.3 },
      { t: "2025-12-09T09:15:00+05:30", engine_temp: 109, rpm: 2800, vibration: 0.05, battery: 12.9 },
      { t: "2025-12-09T09:20:00+05:30", engine_temp: 120, rpm: 3000, vibration: 0.08, battery: 11.8 },
      { t: "2025-12-09T09:25:00+05:30", engine_temp: 115, rpm: 2900, vibration: 0.065, battery: 12.2 },
      { t: "2025-12-09T09:30:00+05:30", engine_temp: 110, rpm: 2700, vibration: 0.055, battery: 12.5 },
    ],
    predictions: [
      { component: "brake_pad", severity: 0.86, eta_days: 5, confidence: 0.92 },
      { component: "engine_coolant", severity: 0.45, eta_days: 15, confidence: 0.78 },
    ],
    maintenanceHistory: [
      { date: "2025-12-01", service: "Oil change", location: "Nexa Central" },
      { date: "2025-11-15", service: "Tire rotation", location: "Nexa West" },
      { date: "2025-10-28", service: "Brake inspection (passed)", location: "Nexa Central" },
      { date: "2025-10-10", service: "Engine diagnostics (minor sensor calibration)", location: "Nexa East" },
    ],
    fuelEfficiency: {
      average: 14.2,
      change: -8,
      bestDay: { date: "Dec 03", value: 16.1, note: "highway route" },
      worstDay: { date: "Dec 07", value: 11.3, note: "heavy traffic + AC usage" },
      tip: "Aggressive acceleration patterns detected. Smoother driving could improve efficiency by ~12%.",
    },
    diagnostics: "Brake pad wear predicted in ~5 days (confidence 92%). Engine temp trend shows steady rise. Recommend service slot — Nexa Central, Dec 12, 10 AM.",
  },
  AETHER0002: {
    vin: "AETHER0002",
    connected: true,
    model: "Model S",
    status: "healthy",
    statusLabel: "Healthy",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 78, rpm: 2000, vibration: 0.02, battery: 14.1 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 82, rpm: 2100, vibration: 0.022, battery: 14.0 },
      { t: "2025-12-09T09:10:00+05:30", engine_temp: 85, rpm: 2200, vibration: 0.025, battery: 13.9 },
      { t: "2025-12-09T09:15:00+05:30", engine_temp: 88, rpm: 2300, vibration: 0.028, battery: 13.8 },
      { t: "2025-12-09T09:20:00+05:30", engine_temp: 90, rpm: 2400, vibration: 0.03, battery: 13.7 },
    ],
    predictions: [
      { component: "tire_pressure", severity: 0.35, eta_days: 20, confidence: 0.85 },
    ],
    diagnostics: "All systems nominal. No immediate maintenance required.",
  },
  AETHER0003: {
    vin: "AETHER0003",
    connected: true,
    model: "Model Y",
    status: "healthy",
    statusLabel: "Healthy",
    telemetry: [
      { t: "2025-12-09T08:00:00+05:30", engine_temp: 82, rpm: 2100, vibration: 0.025, battery: 13.9 },
      { t: "2025-12-09T08:05:00+05:30", engine_temp: 85, rpm: 2200, vibration: 0.028, battery: 13.8 },
    ],
    predictions: [],
    diagnostics: "All systems nominal. No immediate maintenance required.",
  },
  AETHER0012: {
    vin: "AETHER0012",
    connected: true,
    model: "Model X",
    status: "warning",
    statusLabel: "Warning (battery low)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 88, rpm: 2300, vibration: 0.03, battery: 11.2 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 90, rpm: 2400, vibration: 0.032, battery: 11.0 },
      { t: "2025-12-09T09:10:00+05:30", engine_temp: 92, rpm: 2500, vibration: 0.035, battery: 10.8 },
    ],
    predictions: [
      { component: "battery", severity: 0.82, eta_days: 3, confidence: 0.88 },
    ],
    diagnostics: "Battery voltage trending low (11.2V, threshold 12V). Pattern: rapid discharge during idle. Likely cause: parasitic drain or aging battery. Recommended action: Battery replacement within 3 days. Confidence: 88%.",
  },
  AETHER0023: {
    vin: "AETHER0023",
    connected: true,
    model: "Model S",
    status: "warning",
    statusLabel: "Warning (transmission anomaly)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 95, rpm: 2600, vibration: 0.055, battery: 13.5 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 98, rpm: 2700, vibration: 0.062, battery: 13.4 },
      { t: "2025-12-09T09:10:00+05:30", engine_temp: 100, rpm: 2800, vibration: 0.07, battery: 13.3 },
    ],
    predictions: [
      { component: "transmission", severity: 0.68, eta_days: 7, confidence: 0.79 },
    ],
    diagnostics: "Transmission fluid temperature elevated (98°C, threshold 90°C). Vibration detected during gear shifts. Likely cause: worn synchronizers or low fluid level. Recommended action: Transmission inspection within 7 days. Confidence: 79%.",
  },
  AETHER0045: {
    vin: "AETHER0045",
    connected: true,
    model: "Model Y",
    status: "warning",
    statusLabel: "Warning (tire pressure low)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 85, rpm: 2200, vibration: 0.03, battery: 13.8 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 87, rpm: 2300, vibration: 0.032, battery: 13.7 },
    ],
    predictions: [
      { component: "tire_pressure", severity: 0.55, eta_days: 2, confidence: 0.94 },
    ],
    diagnostics: "Front-left tire pressure at 24 PSI (recommended 32 PSI). No puncture detected. Likely cause: temperature drop or slow valve leak. Recommended action: Inflate tires and monitor for 48 hours. Confidence: 94%.",
  },
  AETHER0056: {
    vin: "AETHER0056",
    connected: true,
    model: "Model X",
    status: "healthy",
    statusLabel: "Healthy",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 80, rpm: 2100, vibration: 0.022, battery: 14.0 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 82, rpm: 2150, vibration: 0.024, battery: 13.9 },
    ],
    predictions: [],
    diagnostics: "All systems nominal. No immediate maintenance required.",
  },
  AETHER0067: {
    vin: "AETHER0067",
    connected: true,
    model: "Model S",
    status: "critical",
    statusLabel: "Critical (engine overheating)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 110, rpm: 3000, vibration: 0.08, battery: 12.5 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 115, rpm: 3100, vibration: 0.09, battery: 12.3 },
      { t: "2025-12-09T09:10:00+05:30", engine_temp: 118, rpm: 3200, vibration: 0.1, battery: 12.0 },
    ],
    predictions: [
      { component: "engine_coolant", severity: 0.95, eta_days: 0, confidence: 0.96 },
    ],
    diagnostics: "CRITICAL ALERT — Engine coolant temperature at 118°C (threshold 100°C). Coolant level low. Immediate action required: Stop vehicle, allow cool-down, check for leaks. Do not drive until inspected. Nearest service center: Nexa East (2.3 km). Confidence: 96%.",
  },
  AETHER0078: {
    vin: "AETHER0078",
    connected: true,
    model: "Model Y",
    status: "healthy",
    statusLabel: "Healthy",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 82, rpm: 2150, vibration: 0.024, battery: 13.9 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 84, rpm: 2200, vibration: 0.026, battery: 13.8 },
    ],
    predictions: [],
    diagnostics: "All systems nominal. No immediate maintenance required.",
  },
  AETHER0089: {
    vin: "AETHER0089",
    connected: true,
    model: "Model X",
    status: "warning",
    statusLabel: "Warning (oil change due)",
    telemetry: [
      { t: "2025-12-09T09:00:00+05:30", engine_temp: 88, rpm: 2350, vibration: 0.032, battery: 13.6 },
      { t: "2025-12-09T09:05:00+05:30", engine_temp: 90, rpm: 2400, vibration: 0.034, battery: 13.5 },
    ],
    predictions: [
      { component: "oil_change", severity: 0.72, eta_days: 7, confidence: 0.91 },
    ],
    diagnostics: "Oil life at 8% remaining. Last change: 9,200 km ago. Recommended action: Oil change within 500 km or 1 week. Available slot: Nexa Central, Dec 14, 2 PM.",
  },
};

export interface VehicleData {
  vin: string;
  connected: boolean;
  model: string;
  status: 'healthy' | 'warning' | 'critical';
  statusLabel: string;
  telemetry: TelemetryPoint[];
  predictions: Prediction[];
  maintenanceHistory?: MaintenanceRecord[];
  fuelEfficiency?: FuelEfficiency;
  diagnostics: string;
}

export interface TelemetryPoint {
  t: string;
  engine_temp: number;
  rpm: number;
  vibration: number;
  battery: number;
}

export interface Prediction {
  component: string;
  severity: number;
  eta_days: number;
  confidence: number;
}

export interface MaintenanceRecord {
  date: string;
  service: string;
  location: string;
}

export interface FuelEfficiency {
  average: number;
  change: number;
  bestDay: { date: string; value: number; note: string };
  worstDay: { date: string; value: number; note: string };
  tip: string;
}

export const scheduleResponse = {
  status: "confirmed",
  service_center: "Nexa Central",
  slot: "2025-12-12T10:00:00+05:30",
  booking_id: "BOOK12345",
};

export const rcaData = {
  AETHER0001: {
    summary: "12/20 vehicles reported brake-pad anomalies; pattern suggests accelerated wear due to high friction coefficient in Model X; recommend material re-evaluation.",
    details: {
      affected_vehicles: 12,
      total_fleet: 20,
      pattern: "Accelerated brake pad wear",
      root_cause: "High friction coefficient in urban routes combined with material grade mismatch",
      recommendation: "Material review and recall scope 5%",
      confidence: 0.85,
    },
  },
  AETHER0002: {
    summary: "Minor tire pressure fluctuations detected across 3 vehicles; likely due to seasonal temperature changes.",
    details: {
      affected_vehicles: 3,
      total_fleet: 20,
      pattern: "Tire pressure variance",
      root_cause: "Seasonal temperature changes affecting tire pressure",
      recommendation: "Monitor and adjust tire pressure during seasonal transitions",
      confidence: 0.82,
    },
  },
};

export const fleetStats = {
  health_percentage: 94,
  active_alerts: 5,
  next_service: {
    vin: "AETHER0001",
    date: "2025-12-12",
    type: "Brake Inspection",
  },
  vehicles_connected: 47,
  total_vehicles: 50,
  flagged_vehicles: [
    { vin: "AETHER0012", issue: "battery warning" },
    { vin: "AETHER0023", issue: "transmission anomaly" },
    { vin: "AETHER0045", issue: "tire pressure low" },
    { vin: "AETHER0067", issue: "engine overheating" },
    { vin: "AETHER0089", issue: "oil change due" },
  ],
};

export const voiceConversation = [
  {
    speaker: "Driver",
    text: "Hi, why is my brake warning on?",
  },
  {
    speaker: "AetherDrive",
    text: "We predict brake-pad wear in ~5 days (confidence 92%). I can book a diagnostic—tomorrow 10 AM at Nexa Central. Confirm?",
  },
  {
    speaker: "Driver",
    text: "Yes, please book it.",
  },
  {
    speaker: "AetherDrive",
    text: "Done! Your appointment is confirmed for December 12th at 10:00 AM at Nexa Central. Booking ID: BOOK12345. You'll receive a confirmation SMS shortly.",
  },
];

export const impactMetrics = [
  { label: "Uptime Improvement", value: 34, suffix: "%" },
  { label: "Maintenance Cost Reduction", value: 28, suffix: "%" },
  { label: "Bay Utilization Increase", value: 45, suffix: "%" },
  { label: "Customer Satisfaction", value: 92, suffix: "%" },
  { label: "Repeat Defects Reduced", value: 67, suffix: "%" },
  { label: "Fleet Coverage", value: 500, suffix: "+" },
];

export const architectureNodes = [
  {
    id: "sensors",
    title: "Vehicle Sensors",
    description: "OBD-II, CAN bus, IoT sensors collecting real-time telemetry",
    tech: "OBD-II Protocol, MQTT, Edge Computing",
  },
  {
    id: "ai",
    title: "Agentic AI",
    description: "Master agent orchestrating specialized sub-agents for different tasks",
    tech: "LangChain, LangGraph, GPT-4",
  },
  {
    id: "predictive",
    title: "Predictive Models",
    description: "ML models forecasting component failures and maintenance needs",
    tech: "XGBoost, PyTorch, Time-Series Analysis",
  },
  {
    id: "engagement",
    title: "Smart Engagement",
    description: "Voice agents and automated scheduling for seamless customer interaction",
    tech: "Twilio, ElevenLabs, OR-Tools",
  },
  {
    id: "feedback",
    title: "OEM Feedback Loop",
    description: "Aggregated insights and RCA reports for continuous improvement",
    tech: "Analytics Dashboard, PDF Reports, API Integration",
  },
];

export const availableVehicles = Object.keys(vehicleData);
