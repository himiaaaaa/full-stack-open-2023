export enum Gender {
    Female = 'female',
    Male = 'male',
    Other = 'other'
}

export interface Diagnose {
    code: string;
    name: string;
    latin?: string;
}

/* // eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
} */

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn?: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

export type NoSsnPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export type NewBaseEntry = Omit<BaseEntry, 'id'>;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3,
}
  
export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export interface Discharge {
    date: string;
    criteria: string;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry; 

type UnionOmit<T, K extends string | number | symbol> 
    = T extends unknown ?
        Omit<T, K> 
        : never;

export type EntryWithoutId = UnionOmit<Entry, 'id'>;