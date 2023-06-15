import express from 'express';
const app = express()

import { bmiCalculator } from './bmiCalculator';

app.get('/hello',(_req, res) =>  {
    res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: 'malformatted parameters' }).status(400)
    }

    const bmi = bmiCalculator(height, weight);

    const bmiData = {
        weight, 
        height, 
        bmi
    }
    res.send(bmiData).status(200);
})

const PORT = 3003

app.listen(PORT, ()=> {
    console.log(`Server running on port ${PORT}`)
})