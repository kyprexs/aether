import { NextResponse } from 'next/server';

export async function POST() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const scheduleResponse = {
    status: "confirmed",
    service_center: "Nexa Central",
    slot: "2025-12-12T10:00:00+05:30",
    booking_id: `BOOK${Math.floor(10000 + Math.random() * 90000)}`,
  };

  return NextResponse.json(scheduleResponse);
}

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200));

  return NextResponse.json({
    status: "confirmed",
    service_center: "Nexa Central",
    slot: "2025-12-12T10:00:00+05:30",
    booking_id: "BOOK12345",
  });
}
