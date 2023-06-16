import express from "express";
import diagnosesRouter from "./routes/diagnoses";
const app = express();
app.use(express.json());

const PORT = 3003;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter); 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//Create a type Diagnose and
// use it to create endpoint /api/diagnoses
// for fetching all diagnoses with HTTP GET.



