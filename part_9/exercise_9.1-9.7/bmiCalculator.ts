// calculateBmi
const calculateBmi = (cm: number, kg: number): string => {
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

console.log(calculateBmi(180, 74))
