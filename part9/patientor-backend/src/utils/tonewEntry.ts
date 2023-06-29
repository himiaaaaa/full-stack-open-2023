import { Diagnose, Discharge, EntryWithoutId, HealthCheckRating, NewBaseEntry, SickLeave } from "../types";

const isString = (text: unknown) : text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseDescription = (description: unknown): string => {
    if(!description || !isString(description)){
        throw new Error('Incorrect ot missing description');
    }
    return description;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseSpecialist = (specialist: unknown): string => {
    if(!specialist || !isString(specialist)){
        throw new Error('Incorrect or missing specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
};

const isNumber = (text: unknown) : text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
    if(!healthCheckRating || !isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)){
        throw new Error ('Incorrect or missing healthCheckRating: ' + healthCheckRating);
    }
    return healthCheckRating;
};

const parseSickLeave = (object: unknown): SickLeave => {
    if( !object || typeof object !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if( 'startDate' in object
       && 'endDate' in object){
        const sickLeave: SickLeave = {
            startDate: parseDate(object.startDate),
            endDate: parseDate(object.endDate)
        };
        return sickLeave;
    }
    throw new Error('Incorrect data: a field missing');
};

const parseEmployerName = (employerName: unknown): string => {
    if(!employerName || !isString(employerName)){
        throw new Error('Incorrect ot missing description');
    }
    return employerName;
};

const parseCriteria = (criteria: unknown): string => {
    if(!criteria || !isString(criteria)){
        throw new Error('Incorrect or missing criteria');
    }
    return criteria;
};

const parseDischarge = (object: unknown): Discharge => {
    if( !object || typeof object !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if( 'date' in object
       && 'criteria' in object){
        const discharge: Discharge = {
            date: parseDate(object.date),
            criteria: parseCriteria(object.criteria)
        };
        return discharge;
    }
    throw new Error('Incorrect data: a field missing');
};

const toNewEntry = (object: unknown): EntryWithoutId => {
    if( !object || typeof object !== 'object' ){
        throw new Error('Incorrect or missing data');
    }

    if( 'description' in object
    && 'date' in object
    && 'specialist' in object){

    const newBaseEntry: NewBaseEntry = 'diagnosisCodes' in object ?
    {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes)
    }
    : 
    {
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };

    if( 'type' in object){
        switch(object.type){

            case 'HealthCheck':
                    if('healthCheckRating' in object){

                        const healthCheckEntry: EntryWithoutId = {
                            ...newBaseEntry,
                            type: 'HealthCheck',
                            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
                        };
                        return healthCheckEntry;
                    }
                    throw new Error("Incorrect data: health check rating missing");

            case 'OccupationalHealthcare':
                if('employerName' in object){

                    let occupationalHealthcareEntry: EntryWithoutId;
    
                    'sickLeave' in object ?
                    occupationalHealthcareEntry = {
                        ...newBaseEntry,
                        type:'OccupationalHealthcare',
                        employerName: parseEmployerName(object.employerName),
                        sickLeave: parseSickLeave(object.sickLeave)
                    }
                    :
                    occupationalHealthcareEntry = {
                        ...newBaseEntry,
                        type:'OccupationalHealthcare',
                        employerName: parseEmployerName(object.employerName)
                    };
                    return occupationalHealthcareEntry;
                }
                throw new Error("Incorrect data: employer name missing");
                
            case 'Hospital':
                if('discharge' in object){
                    const hospitalEntry: EntryWithoutId = {
                        ...newBaseEntry,
                        type: 'Hospital',
                        discharge: parseDischarge(object.discharge)
                    };
                    return hospitalEntry;
                }
                throw new Error("Incorrect data: discharge missing");
        }
      }
    }
    throw new Error('Incorrect data: a field missing');
};

export default toNewEntry;