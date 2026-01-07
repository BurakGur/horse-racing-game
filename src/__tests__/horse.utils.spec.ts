import { describe, it, expect } from 'vitest'
import { generateHorseList } from '@/utils/horse.utils'
import { HORSE_NAMES, HORSE_COLORS } from '@/constants/horse.constant'

describe('horse.utils', () => {
  describe('generateHorseList', () => {
    it('should generate exactly 20 horses', () => {
      const horses = generateHorseList()
      expect(horses).toHaveLength(20)
    })

    it('should generate horses with unique IDs from 1 to 20', () => {
      const horses = generateHorseList()
      const ids = horses.map((h) => h.id)
      expect(ids).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20])
    })

    it('should assign names from HORSE_NAMES constant', () => {
      const horses = generateHorseList()
      horses.forEach((horse) => {
        expect(HORSE_NAMES).toContain(horse.name)
      })
    })

    it('should assign colors from HORSE_COLORS constant', () => {
      const horses = generateHorseList()
      const validColorHexes = HORSE_COLORS.map((c) => c.colorHex)
      const validColorNames = HORSE_COLORS.map((c) => c.colorName)

      horses.forEach((horse) => {
        expect(validColorHexes).toContain(horse.colorHex)
        expect(validColorNames).toContain(horse.colorName)
      })
    })

    it('should generate condition values between 1 and 100', () => {
      const horses = generateHorseList()
      horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(1)
        expect(horse.condition).toBeLessThanOrEqual(100)
      })
    })

    it('should have all required properties for each horse', () => {
      const horses = generateHorseList()
      horses.forEach((horse) => {
        expect(horse).toHaveProperty('id')
        expect(horse).toHaveProperty('name')
        expect(horse).toHaveProperty('condition')
        expect(horse).toHaveProperty('colorHex')
        expect(horse).toHaveProperty('colorName')
      })
    })

    it('should shuffle names and not always in same order', () => {
      const results: string[][] = []
      for (let i = 0; i < 5; i++) {
        const horses = generateHorseList()
        results.push(horses.map((h) => h.name))
      }
      const allSame = results.every((r) => JSON.stringify(r) === JSON.stringify(results[0]))
      expect(allSame).toBe(false)
    })
  })
})
