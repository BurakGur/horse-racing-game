import { createStore, useStore as baseUseStore } from 'vuex'
import type { Store, Commit } from 'vuex'
import type { InjectionKey } from 'vue'
import type { State, Horse, Race, RaceResult } from '@/types'
import { generateHorseList } from '@/utils/horse.utils'
import { RACE_DISTANCES } from '@/constants/race.constant'

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    allHorses: [],
    program: [],
    results: [],
    currentRoundNo: 1,
    isRacing: false,
    isPaused: false,
    isProgramGenerated: false,
  },

  getters: {
    currentRace(state: State): Race | undefined {
      if (!state.program.length || state.currentRoundNo > 6) return undefined
      return state.program.find((r) => r.round === state.currentRoundNo)
    },

    isGameFinished(state: State): boolean {
      return state.currentRoundNo > 6
    },
  },

  mutations: {
    SET_HORSES(state: State, horses: Horse[]) {
      state.allHorses = horses
    },
    SET_PROGRAM(state: State, program: Race[]) {
      state.program = program
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
      state.program = []
      state.results = []
      state.currentRoundNo = 1
      state.isProgramGenerated = false
      state.isRacing = false
    },
    SET_PAUSE_STATUS(state: State, status: boolean) {
      state.isPaused = status
    },
  },

  actions: {
    generateNewProgram({ commit }: { commit: Commit }) {
      commit('RESET_GAME')

      const horses: Horse[] = generateHorseList()
      commit('SET_HORSES', horses)

      const program: Race[] = RACE_DISTANCES.map((distance, index) => {
        const shuffled = [...horses].sort(() => 0.5 - Math.random())
        const selectedHorses = shuffled.slice(0, 10)

        return {
          round: index + 1,
          distance: distance,
          horses: selectedHorses,
        }
      })

      commit('SET_PROGRAM', program)
    },

    startCurrentRace({ commit }: { commit: Commit }) {
      commit('SET_RACING_STATUS', true)
      commit('SET_PAUSE_STATUS', false)
    },

    togglePause({ commit, state }: { commit: Commit; state: State }) {
      if (state.isRacing) {
        commit('SET_PAUSE_STATUS', !state.isPaused)
      }
    },

    finishCurrentRace({ commit }: { commit: Commit }, result: RaceResult) {
      commit('ADD_RESULT', result)
      commit('SET_RACING_STATUS', false)
      commit('SET_PAUSE_STATUS', false)
      commit('INCREMENT_ROUND')
    },
  },
})

export function useStore() {
  return baseUseStore(key)
}
