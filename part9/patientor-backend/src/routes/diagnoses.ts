import express from "express";
import allDiagnoses from '../../data/diagnoses';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(allDiagnoses);
});

export default router;