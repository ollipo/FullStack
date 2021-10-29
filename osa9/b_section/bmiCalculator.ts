type Result = String;

const calculateBmi = (a: number, b: number) : Result => {
    const bmi = b / ((a/100) * (a/100))

    if(bmi < 18.5) {
        return 'Underweight';
    } else if (bmi <= 24.9) {
        return 'Normal (healthy weight)';
    } else if (bmi <= 29.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
        
}

console.log(calculateBmi(180, 74))