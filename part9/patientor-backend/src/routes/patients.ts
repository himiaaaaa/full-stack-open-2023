
import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/tonewEntry";

const router = express.Router();
 
router.get('/', (_req, res) => {
    res.send(patientService.getPatient());
});

router.get('/:id', (req, res) => {
    res.send(patientService.getPatientForOne(req.params.id));
});


router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong.';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

router.post('/:id/entries', (req, res) => {
    try{
        const patient = patientService.getPatientForOne(req.params.id);
        if( patient === undefined ){
            res.status(404).send(`patient not found`);
            return;
        }
        const newEntry = toNewEntry(req.body);
        const addedEntry = patientService.addEntry(patient, newEntry);
        res.json(addedEntry);

    }catch(error: unknown){
        let errorMessage = 'Something went wrong';
        if(error instanceof Error){
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;