// calculateBmi
interface BmiValues {
  cm: number
  kg: number
}

const parseArguments = (args: string[]): BmiValues => {
  if (!(args.length === 4)) throw new Error('Incorrect number of arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      cm: Number(args[2]),
      kg: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

export const calculateBmi = (cm: number, kg: number): string => {
  console.log(`cm: ${cm}, kg: ${kg}`)

  if (cm <= 0 || kg <= 0) throw new Error('Invalid values')

  const bmi = kg / ((cm / 100) * (cm / 100))

  if (bmi < 18.5) {
    return 'Underweight'
  } else if (bmi >= 18.5 && bmi < 25) {
    return 'Normal range'
  } else if (bmi >= 25 && bmi < 30) {
    return 'Overweight'
  } else {
    return 'Obese'
  }
}

if (require.main === module) {
  try {
    const { cm, kg } = parseArguments(process.argv)
    console.log(calculateBmi(cm, kg))
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: '

    if (error instanceof Error) {
      errorMessage += 'Error' + error.message
    }

    console.log(errorMessage)
  }
}

// console.log(calculateBmi(180, 74))
