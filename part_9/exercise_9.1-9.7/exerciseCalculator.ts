// calculateExercises
interface ExerciseValues {
  daily_exercises: number[];
  target: number;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const daily_exercises: number[] = [];

  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('Provided values were not numbers!');
    }
    daily_exercises.push(Number(args[i]));
  }

  if (!isNaN(Number(args[2]))) {
    return {
      daily_exercises,
      target: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (
  daily_exercises: number[],
  target: number,
): Result => {
  console.log(`daily_exercises: ${daily_exercises}, target: ${target}`);

  if (daily_exercises.length === 0)
    throw new Error('No exercise values provided');

  const periodLength = daily_exercises.length;

  const trainingDays = daily_exercises.filter((hours) => hours > 0).length;

  const average = daily_exercises.reduce((a, b) => a + b, 0) / periodLength;

  const success = average >= target;

  const rating = success ? 3 : average >= target * 0.7 ? 2 : 1;

  const ratingDescription =
    rating === 3
      ? 'excellent'
      : rating === 2
        ? 'not too bad but could be better'
        : 'bad';

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return result;
};

try {
  const { daily_exercises, target } = parseArguments(process.argv);
  console.log(calculateExercises(daily_exercises, target));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';

  if (error instanceof Error) {
    errorMessage += 'Error' + error.message;
  }

  console.log(errorMessage);
}

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
