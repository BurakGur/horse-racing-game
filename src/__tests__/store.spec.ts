import { describe, it, expect, beforeEach } from 'vitest'
import { createStore, Store } from 'vuex'
import type { State, Horse, Race, RaceResult } from '@/types'
import { RACE_DISTANCES } from '@/constants/race.constant'

const createMockHorse = (id: number, condition = 50): Horse => ({
  id,
  name: `Horse ${id}`,
  condition,
  colorHex: '#000000',
  colorName: 'Black',
})

const createMockRace = (round: number, distance: number): Race => ({
  round,
  distance,
  horses: Array.from({ length: 10 }, (_, i) => createMockHorse(i + 1)),
})

const createMockResult = (round: number): RaceResult => {
  const horses = Array.from({ length: 10 }, (_, i) => createMockHorse(i + 1))
  return {
    round,
    winner: horses[0]!,
    rankings: horses,
  }
}

const createTestStore = (): Store<State> => {
  return createStore<State>({
    state: {
      allHorses: [],
      programList: [],
      results: [],
      currentRoundNo: 1,
      isRacing: false,
      isPaused: false,
      isProgramGenerated: false,
    },
    getters: {
      currentRace(state: State): Race | undefined {
        if (!state.programList.length || state.currentRoundNo > 6) return undefined
        return state.programList.find((r) => r.round === state.currentRoundNo)
      },
      isGameFinished(state: State): boolean {
        return state.currentRoundNo > 6
      },
    },
    mutations: {
      SET_HORSES(state: State, horses: Horse[]) {
        state.allHorses = horses
      },
      SET_PROGRAM_LIST(state: State, programList: Race[]) {
        state.programList = programList
        state.isProgramGenerated = true
      },
      SET_RACING_STATUS(state: State, status: boolean) {
        state.isRacing = status
        if (!status) state.isPaused = false
      },
      ADD_RESULT(state: State, result: RaceResult) {
        state.results.push(result)
      },
      INCREMENT_ROUND(state: State) {
        state.currentRoundNo++
      },
      RESET_GAME(state: State) {
        state.allHorses = []
        state.programList = []
        state.results = []
        state.currentRoundNo = 1
        state.isProgramGenerated = false
        state.isRacing = false
      },
      SET_PAUSE_STATUS(state: State, status: boolean) {
        state.isPaused = status
      },
    },
  })
}

describe('store', () => {
  let store: Store<State>

  beforeEach(() => {
    store = createTestStore()
  })

  describe('initial state', () => {
    it('should have empty allHorses array', () => {
      expect(store.state.allHorses).toEqual([])
    })

    it('should have empty programList array', () => {
      expect(store.state.programList).toEqual([])
    })

    it('should have empty results array', () => {
      expect(store.state.results).toEqual([])
    })

    it('should have currentRoundNo set to 1', () => {
      expect(store.state.currentRoundNo).toBe(1)
    })

    it('should have isRacing set to false', () => {
      expect(store.state.isRacing).toBe(false)
    })

    it('should have isPaused set to false', () => {
      expect(store.state.isPaused).toBe(false)
    })

    it('should have isProgramGenerated set to false', () => {
      expect(store.state.isProgramGenerated).toBe(false)
    })
  })

  describe('getters', () => {
    describe('currentRace', () => {
      it('should return undefined when programList is empty', () => {
        expect(store.getters.currentRace).toBeUndefined()
      })

      it('should return the race matching currentRoundNo', () => {
        const races = RACE_DISTANCES.map((d, i) => createMockRace(i + 1, d))
        store.commit('SET_PROGRAM_LIST', races)

        expect(store.getters.currentRace).toEqual(races[0])
      })

      it('should return correct race after incrementing round', () => {
        const races = RACE_DISTANCES.map((d, i) => createMockRace(i + 1, d))
        store.commit('SET_PROGRAM_LIST', races)
        store.commit('INCREMENT_ROUND')

        expect(store.getters.currentRace?.round).toBe(2)
      })

      it('should return undefined when currentRoundNo exceeds 6', () => {
        const races = RACE_DISTANCES.map((d, i) => createMockRace(i + 1, d))
        store.commit('SET_PROGRAM_LIST', races)

        for (let i = 0; i < 6; i++) {
          store.commit('INCREMENT_ROUND')
        }

        expect(store.getters.currentRace).toBeUndefined()
      })
    })

    describe('isGameFinished', () => {
      it('should return false when currentRoundNo is 1', () => {
        expect(store.getters.isGameFinished).toBe(false)
      })

      it('should return false when currentRoundNo is 6', () => {
        for (let i = 0; i < 5; i++) {
          store.commit('INCREMENT_ROUND')
        }
        expect(store.getters.isGameFinished).toBe(false)
      })

      it('should return true when currentRoundNo is 7', () => {
        for (let i = 0; i < 6; i++) {
          store.commit('INCREMENT_ROUND')
        }
        expect(store.getters.isGameFinished).toBe(true)
      })
    })
  })

  describe('mutations', () => {
    describe('SET_HORSES', () => {
      it('should set allHorses array', () => {
        const horses = [createMockHorse(1), createMockHorse(2)]
        store.commit('SET_HORSES', horses)

        expect(store.state.allHorses).toEqual(horses)
        expect(store.state.allHorses).toHaveLength(2)
      })
    })

    describe('SET_PROGRAM_LIST', () => {
      it('should set programList array', () => {
        const races = [createMockRace(1, 1200)]
        store.commit('SET_PROGRAM_LIST', races)

        expect(store.state.programList).toEqual(races)
      })

      it('should set isProgramGenerated to true', () => {
        store.commit('SET_PROGRAM_LIST', [])

        expect(store.state.isProgramGenerated).toBe(true)
      })
    })

    describe('SET_RACING_STATUS', () => {
      it('should set isRacing to true', () => {
        store.commit('SET_RACING_STATUS', true)

        expect(store.state.isRacing).toBe(true)
      })

      it('should set isRacing to false', () => {
        store.commit('SET_RACING_STATUS', true)
        store.commit('SET_RACING_STATUS', false)

        expect(store.state.isRacing).toBe(false)
      })

      it('should reset isPaused when isRacing is set to false', () => {
        store.commit('SET_RACING_STATUS', true)
        store.commit('SET_PAUSE_STATUS', true)
        store.commit('SET_RACING_STATUS', false)

        expect(store.state.isPaused).toBe(false)
      })
    })

    describe('ADD_RESULT', () => {
      it('should add result to results array', () => {
        const result = createMockResult(1)
        store.commit('ADD_RESULT', result)

        expect(store.state.results).toHaveLength(1)
        expect(store.state.results[0]).toEqual(result)
      })

      it('should append multiple results', () => {
        store.commit('ADD_RESULT', createMockResult(1))
        store.commit('ADD_RESULT', createMockResult(2))
        store.commit('ADD_RESULT', createMockResult(3))

        expect(store.state.results).toHaveLength(3)
      })
    })

    describe('INCREMENT_ROUND', () => {
      it('should increment currentRoundNo by 1', () => {
        store.commit('INCREMENT_ROUND')

        expect(store.state.currentRoundNo).toBe(2)
      })

      it('should increment multiple times', () => {
        store.commit('INCREMENT_ROUND')
        store.commit('INCREMENT_ROUND')
        store.commit('INCREMENT_ROUND')

        expect(store.state.currentRoundNo).toBe(4)
      })
    })

    describe('RESET_GAME', () => {
      it('should reset all state to initial values', () => {
        store.commit('SET_HORSES', [createMockHorse(1)])
        store.commit('SET_PROGRAM_LIST', [createMockRace(1, 1200)])
        store.commit('ADD_RESULT', createMockResult(1))
        store.commit('INCREMENT_ROUND')
        store.commit('SET_RACING_STATUS', true)

        store.commit('RESET_GAME')

        expect(store.state.allHorses).toEqual([])
        expect(store.state.programList).toEqual([])
        expect(store.state.results).toEqual([])
        expect(store.state.currentRoundNo).toBe(1)
        expect(store.state.isProgramGenerated).toBe(false)
        expect(store.state.isRacing).toBe(false)
      })
    })

    describe('SET_PAUSE_STATUS', () => {
      it('should set isPaused to true', () => {
        store.commit('SET_PAUSE_STATUS', true)

        expect(store.state.isPaused).toBe(true)
      })

      it('should set isPaused to false', () => {
        store.commit('SET_PAUSE_STATUS', true)
        store.commit('SET_PAUSE_STATUS', false)

        expect(store.state.isPaused).toBe(false)
      })
    })
  })
})
