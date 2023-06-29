import { NewPatient } from "../types";
import { Gender } from "../types";

const isString = (text: unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};


const parseName = (name: unknown): string => {
    if(!name || !isString(name)){
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const isDate = (dateOfBirth: string): boolean => {
    return Boolean(Date.parse(dateOfBirth));
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
    if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)){
        throw new Error('Incorrect or missing date: ' + dateOfBirth);
    }
    return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if(!occupation || !isString(occupation)){
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isString(gender) || !isGender(gender)){
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};


const toNewPatient = (object: unknown): NewPatient => {
    if( !object || typeof object !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if( 'name' in object 
        && 'dateOfBirth' in object 
        && 'ssn' in object
        && 'gender' in object
        && 'occupation' in object){
        const newPatient: NewPatient = {
            name: parseName(object.name),
            dateOfBirth: parseDateOfBirth(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
    return newPatient;
    }
  throw new Error('Incorrect data: a field missing');
};

export default toNewPatient;