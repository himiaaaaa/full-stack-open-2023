interface CalcuValues {
    value1: number;
    value2: number;
}

const parseArguments = (args: string[]): CalcuValues => {
    if( args.length < 4 ) 
        throw new Error('Not enough arguments');
    if( args.length > 4 )
        throw new Error('Too many arguments');
    
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            value1: Number(args[2]),
            value2: Number(args[3])
        };
    }else{
        throw new Error('Provided values were not numbers!');
    }
};

export const bmiCalculator = (cm: number, kg: number) => {
    if(cm === 0 || kg === 0){
        throw new Error('weight or height cannot be zero.');
    }

    const bmi = kg / ((cm / 100) * (cm / 100));
    if ( bmi < 18.5 ){
        console.log("Underweight");
    }else if( bmi >=18.5 && bmi <= 24.9){
        console.log("Normal(Healthy Weight)");
    }else if( bmi >= 25 && bmi <= 29.9){
        console.log("Overweight");
    }else{
        console.log("Obese");
    }
};

try{
    const { value1, value2 } = parseArguments(process.argv);
    bmiCalculator(value1, value2);
}catch(error: unknown){
    let errorMessage = 'Something bad happend.';
    if ( error instanceof Error ){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}

//console.log(bmiCalculator(180, 74))