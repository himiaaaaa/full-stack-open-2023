
import express from "express";
import patientService from "../services/patientService";

const router = express.Router();
 
router.get('/', (_req, res) => {
    res.send(patientService.getNoSsnPatient());
});


router.post('/', (req, res) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment  */
    const { name, dateOfBirth, ssn, gender, occupation } = req.body;
    const addedPatient = patientService.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedPatient);  
});

export default router;