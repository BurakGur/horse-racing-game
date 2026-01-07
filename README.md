# 🏇 Horse Race Game

An interactive horse racing game built with Vue 3, featuring animated races, program generation, and real-time results tracking.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Vuex](https://img.shields.io/badge/Vuex-4.0-42b883?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=flat-square&logo=vite)

## Live Demo:

[https://horse-racing-game-ha1g.vercel.app](https://horse-racing-game-ha1g.vercel.app)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Game Rules](#game-rules)
- [Testing](#testing)
- [Scripts](#scripts)

## Overview

This project is an interactive horse racing simulation game where users can:

- Generate a race program with 20 unique horses
- Watch animated horse races across 6 different rounds
- Track race results and rankings in real-time
- Pause and resume races at any time

## Features

- **20 Unique Horses**: Each horse has a unique name, color, and condition score (1-100)
- **6 Race Rounds**: Progressive distances from 1200m to 2200m
- **Animated Racing**: Smooth CSS animations for horse movement
- **Real-time Results**: Rankings displayed as each race concludes
- **Pause/Resume**: Control race flow with pause functionality
- **Responsive Design**: Works on desktop and tablet devices
- **State Management**: Centralized game state with Vuex

## Tech Stack

| Category         | Technology              |
| ---------------- | ----------------------- |
| Framework        | Vue 3 (Composition API) |
| Language         | TypeScript              |
| State Management | Vuex 4                  |
| Build Tool       | Vite 7                  |
| Styling          | SCSS with CSS Variables |
| Unit Testing     | Vitest                  |
| E2E Testing      | Cypress                 |
| Linting          | ESLint + Prettier       |

## Getting Started

### Prerequisites

- Node.js ^20.19.0 or >=22.12.0
- Bun (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/BurakGur/horse-racing-game.git
cd horse-racing-game

# Install dependencies
bun install
# or
npm install
```

### Development

```bash
# Start development server
bun dev
# or
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun preview
```

## Project Structure

```
src/
├── __tests__/              # Unit tests
│   ├── horse.utils.spec.ts
│   ├── race.utils.spec.ts
│   ├── store.spec.ts
│   └── HorseLaneItem.component.spec.ts
├── assets/
│   ├── icons/              # SVG icon components
│   ├── images/             # Static images
│   └── style/
│       ├── base/           # Base styles (general.scss)
│       ├── lib/            # Third-party styles (normalize)
│       ├── mixin/          # SCSS mixins (media queries)
│       ├── shared/         # Shared utilities (colors, typography)
│       └── variables/      # CSS variables (colors, fonts)
├── components/
│   ├── Button/             # Button component
│   ├── Card/               # Card components (Section, Empty, RaceTrack)
│   ├── Header/             # Header components
│   ├── Item/               # Item components (HorseLane, HorseList)
│   └── List/               # List components (Horse, Program, Result)
├── constants/              # Application constants
│   ├── horse.constant.ts   # Horse names and colors
│   └── race.constant.ts    # Race distances and timing
├── layouts/                # Page layouts
├── store/                  # Vuex store
├── types/                  # TypeScript interfaces
└── utils/                  # Utility functions
    ├── horse.utils.ts      # Horse generation logic
    └── race.utils.ts       # Race duration calculation
```

## Architecture

### Component Hierarchy

```
App.vue
└── Main.layout.vue
    ├── Header.component.vue
    │   └── Button.component.vue
    ├── HorseList.component.vue
    │   └── HorseListItem.component.vue
    ├── RaceTrackCard.component.vue
    │   ├── SectionSubHeader.component.vue
    │   └── HorseLaneItem.component.vue
    ├── ProgramList.component.vue
    │   ├── SectionSubHeader.component.vue
    │   └── HorseListItem.component.vue
    └── ResultList.component.vue
        └── SectionSubHeader.component.vue
```

### State Management (Vuex)

```typescript
interface State {
  allHorses: Horse[] // All 20 horses
  programList: Race[] // 6 race rounds
  results: RaceResult[] // Completed race results
  currentRoundNo: number // Current round (1-6)
  isRacing: boolean // Race in progress
  isPaused: boolean // Race paused
  isProgramGenerated: boolean // Program created
}
```

**Actions:**

- `generateNewProgram` - Creates new horses and race schedule
- `startCurrentRace` - Starts the current round
- `togglePause` - Pauses/resumes the race
- `finishCurrentRace` - Records results and advances round

### Data Models

```typescript
interface Horse {
  id: number
  name: string
  condition: number // 1-100, affects race speed
  colorHex: string
  colorName: string
}

interface Race {
  round: number // 1-6
  distance: number // 1200-2200 meters
  horses: Horse[] // 10 horses per race
}

interface RaceResult {
  round: number
  winner: Horse // Winner horse
  rankings: Horse[] // Ordered by finish position
}
```

## Game Rules

### Horse Configuration

- **Total Horses**: 20 unique horses
- **Condition Score**: Each horse has a random condition (1-100)
- **Colors**: Each horse has a unique color

### Race Configuration

- **Total Rounds**: 6 rounds per game
- **Horses per Round**: 10 randomly selected horses

### Round Distances

| Round | Distance |
| ----- | -------- |
| 1     | 1200m    |
| 2     | 1400m    |
| 3     | 1600m    |
| 4     | 1800m    |
| 5     | 2000m    |
| 6     | 2200m    |

### Race Duration Calculation

```typescript
// Formula for calculating race duration
duration = (distance × BASE_TIME_PER_METER) + (conditionFactor × 100) + randomFactor

// Where:
// - BASE_TIME_PER_METER = 10ms per meter
// - conditionFactor = (100 - condition) × 0.05
// - randomFactor = random value between -500 and +500ms
// - Minimum duration = 2000ms
```

Higher condition scores result in faster horses (lower duration).

## Testing

### Unit Tests (Vitest)

```bash
# Run unit tests
bun test:unit

# Run in watch mode
bun test:unit --watch
```

**Test Coverage:**

| Test File                         | Description                  | Tests  |
| --------------------------------- | ---------------------------- | ------ |
| `horse.utils.spec.ts`             | Horse generation logic       | 7      |
| `race.utils.spec.ts`              | Race duration calculation    | 8      |
| `store.spec.ts`                   | Vuex store mutations/getters | 27     |
| `HorseLaneItem.component.spec.ts` | HorseLaneItem component      | 18     |
| **Total**                         |                              | **60** |

### E2E Tests (Cypress)

```bash
# Open Cypress UI (development)
bun test:e2e:dev

# Run headless (production build)
bun run build
bun test:e2e
```

**E2E Test Scenarios:**

- Initial page load verification
- Program generation
- Race start/pause/resume
- Race completion and results
- Full game flow

## Scripts

| Script             | Description                 |
| ------------------ | --------------------------- |
| `bun dev`          | Start development server    |
| `bun run build`    | Build for production        |
| `bun preview`      | Preview production build    |
| `bun test:unit`    | Run unit tests              |
| `bun test:e2e`     | Run E2E tests (production)  |
| `bun test:e2e:dev` | Run E2E tests (development) |
| `bun lint`         | Lint and fix code           |
| `bun format`       | Format code with Prettier   |

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## IDE Setup

**Recommended:** [VS Code](https://code.visualstudio.com/) + [Vue Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

**Browser DevTools:**

- [Vue.js devtools for Chrome](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [Vue.js devtools for Firefox](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## License

This project was developed for **Insider One** as a technical assessment.

MIT License - Feel free to use and modify.
