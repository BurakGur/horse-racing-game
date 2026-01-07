import { describe, it, expect, vi } from 'vitest'
import { calculateRaceDurations } from '@/utils/race.utils'
import type { Horse } from '@/types'

const createMockHorses = (count: number, condition?: number): Horse[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Horse ${i + 1}`,
    condition: condition ?? 50,
    colorHex: '#000000',
    colorName: 'Black',
  }))
}

describe('race.utils', () => {
  describe('calculateRaceDurations', () => {
    it('should return durations for all horses', () => {
      const horses = createMockHorses(10)
      const durations = calculateRaceDurations(horses, 1200)

      expect(Object.keys(durations)).toHaveLength(10)
      horses.forEach((horse) => {
        expect(durations[horse.id]).toBeDefined()
      })
    })

    it('should return durations as numbers', () => {
      const horses = createMockHorses(5)
      const durations = calculateRaceDurations(horses, 1200)

      Object.values(durations).forEach((duration) => {
        expect(typeof duration).toBe('number')
      })
    })

    it('should return minimum duration of 2000ms', () => {
      const horses = createMockHorses(10, 100)
      const durations = calculateRaceDurations(horses, 1200)

      Object.values(durations).forEach((duration) => {
        expect(duration).toBeGreaterThanOrEqual(2000)
      })
    })

    it('should produce different durations due to randomness', () => {
      const horses = createMockHorses(10, 50)

      const results: Record<number, number>[] = []
      for (let i = 0; i < 5; i++) {
        results.push(calculateRaceDurations(horses, 1200))
      }

      const allSame = results.every((r) => JSON.stringify(r) === JSON.stringify(results[0]))
      expect(allSame).toBe(false)
    })

    it('should handle empty horse array', () => {
      const durations = calculateRaceDurations([], 1200)
      expect(durations).toEqual({})
    })

    it('should handle single horse', () => {
      const horses = createMockHorses(1)
      const durations = calculateRaceDurations(horses, 1200)

      expect(Object.keys(durations)).toHaveLength(1)
      expect(durations[1]).toBeGreaterThanOrEqual(2000)
    })

    it('should scale duration with distance', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)

      const horses = createMockHorses(1, 50)
      const shortDistance = calculateRaceDurations(horses, 1200)
      const longDistance = calculateRaceDurations(horses, 2200)

      expect(longDistance[1] ?? 0).toBeGreaterThan(shortDistance[1] ?? 0)

      vi.restoreAllMocks()
    })

    it('should favor horses with higher condition', () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5)

      const fastHorse = createMockHorses(1, 100)
      const slowHorse = createMockHorses(1, 1)

      const fastDuration = calculateRaceDurations(fastHorse, 1200)
      const slowDuration = calculateRaceDurations(slowHorse, 1200)

      expect(fastDuration[1] ?? 0).toBeLessThan(slowDuration[1] ?? 0)

      vi.restoreAllMocks()
    })
  })
})
