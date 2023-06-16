import diagnoseData from '../../data/diagnoses';

import { Diagnose } from '../types';

//const diagnoses: Diagnose[] = diagnoseData;

const getDiagnoses = (): Diagnose[] => {
    return diagnoseData;
};

export default {
    getDiagnoses
};
