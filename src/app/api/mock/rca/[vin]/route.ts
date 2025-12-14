import { NextRequest, NextResponse } from 'next/server';

const rcaData: Record<string, {
  summary: string;
  details: {
    affected_vehicles: number;
    total_fleet: number;
    pattern: string;
    root_cause: string;
    recommendation: string;
    confidence: number;
  };
}> = {
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
  AETHER0003: {
    summary: "Battery degradation pattern detected in 5 vehicles; analysis suggests charging habit correlation.",
    details: {
      affected_vehicles: 5,
      total_fleet: 20,
      pattern: "Battery capacity degradation",
      root_cause: "Frequent deep discharge cycles and high-temperature charging",
      recommendation: "Update charging guidelines and implement smart charging schedules",
      confidence: 0.79,
    },
  },
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ vin: string }> }
) {
  const { vin } = await params;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const rca = rcaData[vin.toUpperCase()];

  if (!rca) {
    return NextResponse.json(
      {
        summary: "No RCA data available for this vehicle.",
        details: {
          affected_vehicles: 0,
          total_fleet: 20,
          pattern: "N/A",
          root_cause: "Insufficient data",
          recommendation: "Continue monitoring",
          confidence: 0,
        }
      }
    );
  }

  return NextResponse.json(rca);
}
