// calculateExercises
interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (
  daily_exercises: number[],
  target: number
): Result => {
  const periodLength = daily_exercises.length

  const trainingDays = daily_exercises.filter((hours) => hours > 0).length

  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength

  const success = average >= target

  const rating = success ? 3 : average >= target * 0.7 ? 2 : 1

  const ratingDescription =
    rating === 3
      ? 'excellent'
      : rating === 2
      ? 'not too bad but could be better'
      : 'bad'

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }

  return result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
