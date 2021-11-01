interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const exerciseCalculator = (targetAmount: number, exerciseHours: Array<number>) : Result => {

  const trainingDays = exerciseHours.filter(d => d !== 0).length;
  const average = exerciseHours.reduce((a, b) => a + b) / exerciseHours.length;
  let rating = 0;
  let ratingDescription = '';
      if(average < 0.5*targetAmount) {
          rating = 1;
          ratingDescription = 'You could do better!';
      } else if (average < targetAmount) {
          rating = 2;
          ratingDescription = 'Good effort! A bit more next time!';
      } else if (average >= targetAmount) {
          rating = 3;
          ratingDescription = 'You reached you\'re goal! Nicely done!';
      }

  console.log({
      periodLength: exerciseHours.length,
      trainingDays: trainingDays,
      success: average >= targetAmount ? true : false,
      rating: rating,
      ratingDescription: ratingDescription,
      target: targetAmount,
      average: average
  });

  return {
      periodLength: exerciseHours.length,
      trainingDays: trainingDays,
      success: false,
      rating: rating,
      ratingDescription: ratingDescription,
      target: targetAmount,
      average: average
  };
};

  const parseCalcArguments = (args: Array<string>): Array<number> => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const argsInput =args.slice(2);
    if(argsInput.every(a => !isNaN(Number(a)))) {
      const result = argsInput.map(a => Number(a));
      return result;
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
    
  try {
    const args = parseCalcArguments(process.argv);
    exerciseCalculator(args[0], args.slice(1));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
