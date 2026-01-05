export interface Horse {
  id: number
  name: string
  condition: number
  colorHex: string
  colorName: string
}

export interface Race {
  round: number
  distance: number
  horses: Horse[]
}

export interface RaceResult {
  round: number
  winner: Horse
  rankings: Horse[]
}

export interface State {
  allHorses: Horse[]
  program: Race[]
  results: RaceResult[]
  currentRoundNo: number
  isRacing: boolean
  isPaused: boolean
  isProgramGenerated: boolean
}
