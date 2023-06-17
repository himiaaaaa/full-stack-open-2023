/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { NoSsnPatient, Patient, NewPatient } from '../types';

const getPatient = (): Patient[] => {
    return patientData;
};

const getNoSsnPatient = (): NoSsnPatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => 
    ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};


const addPatient = ( entry: NewPatient ): Patient => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = uuid();
    const newPatient = {
        id,
        ...entry
    };

    patientData.push(newPatient);
    return newPatient;
};

export default {
    getPatient,
    getNoSsnPatient,
    addPatient
};