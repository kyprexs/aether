import { NextRequest, NextResponse } from 'next/server';

const vehicleData: Record<string, {
  vin: string;
  connected: boolean;
  model: string;
  telemetry: Array<{
    t: string;
    engine_temp: number;
    rpm: number;
    vibration: number;
    battery: number;
  }>;
  predictions: Array<{
    component: string;
    severity: number;
    eta_days: number;
    confidence: number;
  }>;
}> = {
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
    ],
    predictions: [
      { component: "brake_pad", severity: 0.86, eta_days: 5, confidence: 0.92 },
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

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const vehicle = vehicleData[vin.toUpperCase()];

  if (!vehicle) {
    return NextResponse.json(
      { error: 'Vehicle not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(vehicle);
}
