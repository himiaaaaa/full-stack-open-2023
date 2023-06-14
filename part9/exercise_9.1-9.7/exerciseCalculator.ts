interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}


const calculateExercises = (a: number[], target:number): Result => {
    const periodLength = a.length

    const trainingDays = a.filter(n => n !== 0).length;

    const average = (a.reduce((a, b) => a + b, 0))/(a.length);

    const success = average >= target

    const rates = (average : number, target: number): number => {
        const myRating = average/target
        if(myRating >= 1){
            return 3;
        }else if(myRating >= 0.9){
            return 2;
        }else{
            return 1;
        }
    }

    const descriptions = (rating: number): string => {
        if(rating === 1){
            return "More time exercising would do you good"
        }else if (rating === 2){
            return "not too bad but could be better"
        }else{
            return "excellent!"
        }
    }

    const rating = rates(average, target)

    const ratingDescription = descriptions(rating)


    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    } 
}

console.log(calculateExercises([2, 0, 2, 4.5, 0, 3, 1], 2))