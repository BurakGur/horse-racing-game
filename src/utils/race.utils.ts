import type { Horse } from '@/types'
import { BASE_TIME_PER_METER } from '@/constants/race.constant'

// MOST IMPORTANT PART OF THE RACE LOGIC
export const calculateRaceDurations = (horses: Horse[], distance: number): Record<number, number> => {
  const durations: Record<number, number> = {}

  horses.forEach((horse) => {
    const conditionFactor = (100 - horse.condition) * 0.05 // Condition: If condition is 100%, the horse is 20% faster

    const randomFactor = Math.random() * 1000 - 500 // Randomness: +/- 500ms so the result isn't predictable

    const totalTime = distance * BASE_TIME_PER_METER + conditionFactor * 100 + randomFactor

    durations[horse.id] = Math.max(2000, Math.floor(totalTime)) // Minimum 2000ms
  })

  return durations
}
