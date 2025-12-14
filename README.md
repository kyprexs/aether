# AetherDrive Prototype

**The Intelligent Pulse Behind Every Vehicle**

A minimalist, dark-themed prototype demonstrating predictive vehicle maintenance powered by AI.

## Features

- **Interactive Dashboard** - Real-time telemetry charts, predictive alerts, auto-scheduling
- **Voice Agent Demo** - Waveform animation with sample conversation
- **Try the System Modal** - Chat interface simulating predictions, bookings, and RCA
- **Architecture Flow** - Interactive 5-node system overview
- **Impact Metrics** - Animated ROI counters

## Tech Stack

- **Framework**: Next.js 16 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-repo/aetherdrive-prototype.git
cd aetherdrive-prototype

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) for automatic deployments.

## Project Structure

```
/aetherdrive-prototype
├── /public
│   ├── favicon.svg
│   └── logo.svg
├── /src
│   ├── /app
│   │   ├── /api/mock        # Mock API endpoints
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── /components
│   │   ├── Hero.tsx
│   │   ├── ProblemVision.tsx
│   │   ├── Architecture.tsx
│   │   ├── Dashboard.tsx
│   │   ├── VoiceDemo.tsx
│   │   ├── RCASection.tsx
│   │   ├── ImpactMetrics.tsx
│   │   ├── TeamContact.tsx
│   │   ├── Footer.tsx
│   │   ├── TryModal.tsx
│   │   └── FloatingButton.tsx
│   └── /lib
│       └── mockData.ts
└── package.json
```

## Mock API Endpoints

- `GET /api/mock/vehicle/[vin]` - Vehicle telemetry and predictions
- `POST /api/mock/schedule` - Book service appointment
- `GET /api/mock/rca/[vin]` - Root cause analysis data

## Design Tokens

| Token | Value |
|-------|-------|
| Primary Background | #0A0E1A |
| Secondary Background | #111315 |
| Primary Accent | #00E0FF (Neon Cyan) |
| Warning Accent | #FFC857 (Amber) |
| Primary Text | #E6EAF0 |
| Muted Text | #9AA4B2 |

## Team

- **Siddhant** - Co-Founder & Tech Lead
- **Karina** - Co-Founder & Product Lead

## License

MIT
