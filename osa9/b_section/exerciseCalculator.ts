interface Result {
    periodLength: number;
    trainingDays: number;
    success: false
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
  }

  const exerciseCalculator = (exerciseHours: Array<number>, targetAmount: number) : Result => {

    const trainingDays = exerciseHours.filter(d => d !== 0).length
    const average = exerciseHours.reduce((a, b) => a + b) / exerciseHours.length
    let rating = 0
    let ratingDescription = ''
        if(average < 0.5*targetAmount) {
            rating = 1
            ratingDescription = 'You could do better!'
        } else if (average < targetAmount) {
            rating = 2
            ratingDescription = 'Could effort! A bit more next time!'
        } else if (average >= targetAmount) {
            rating = 3
            ratingDescription = 'You reached you\'re goal! Nicely done!'
        }

    console.log({
        periodLength: exerciseHours.length,
        trainingDays: trainingDays,
        success: average >= targetAmount ? true : false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetAmount,
        average: average
    })

    return {
        periodLength: exerciseHours.length,
        trainingDays: trainingDays,
        success: false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetAmount,
        average: average
    }
  }

  exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1], 2)