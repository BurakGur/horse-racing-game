import { HORSE_NAMES, HORSE_COLORS } from '@/constants/horse.constant'
import type { Horse } from '@/types'

export const generateHorseList = (): Horse[] => {
  const shuffledNames = [...HORSE_NAMES].sort(() => 0.5 - Math.random())
  const shuffledColors = [...HORSE_COLORS].sort(() => 0.5 - Math.random())

  return shuffledNames.map((name, index) => {
    const colorObj = shuffledColors[index]
    return {
      id: index + 1,
      name,
      condition: Math.floor(Math.random() * 100) + 1,
      colorHex: colorObj?.colorHex ?? '',
      colorName: colorObj?.colorName ?? '',
    }
  })
}
