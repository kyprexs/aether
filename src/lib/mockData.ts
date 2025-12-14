export const vehicleData = {
  AETHER0001: {
    vin: "AETHER0001",
    connected: true,
    model: "Model X",
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
  },
  AETHER0002: {
    vin: "AETHER0002",
    connected: true,
    model: "Model S",
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
  },
  AETHER0003: {
    vin: "AETHER0003",
    connected: false,
    model: "Model Y",
    telemetry: [
      { t: "2025-12-09T08:00:00+05:30", engine_temp: 92, rpm: 2500, vibration: 0.04, battery: 13.2 },
      { t: "2025-12-09T08:05:00+05:30", engine_temp: 95, rpm: 2600, vibration: 0.045, battery: 13.0 },
    ],
    predictions: [
      { component: "battery", severity: 0.72, eta_days: 8, confidence: 0.88 },
    ],
  },
};

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
  health_percentage: 87,
  active_alerts: 4,
  next_service: {
    vin: "AETHER0001",
    date: "2025-12-12",
    type: "Brake Inspection",
  },
  vehicles_connected: 18,
  total_vehicles: 20,
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

export const teamMembers = [
  {
    name: "Siddhant",
    role: "Co-Founder & Tech Lead",
    skills: "Full-stack development, AI/ML systems, automotive telematics",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  {
    name: "Karina",
    role: "Co-Founder & Product Lead",
    skills: "Product strategy, UX design, business development",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
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
