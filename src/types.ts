export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

interface Diagnose {
  code: string
  name: string
  latin?: string
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare"
  employerName: string
  sickLeave?: {
    startDate: string
    endDate: string
  }
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: {
    date: string
    criteria: string
  }
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface SickLeave{
  startDate: string;
  endDate: string;
}

export interface Discharge{
  date: string;
  criteria: string;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type EntryFormValues = {
  type: 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';
  description: string;
  date: string;
  specialist: string;
  discharge: Discharge;
  sickLeave?: SickLeave;
  employerName: string;
  healthCheckRating: HealthCheckRating;
  diagnosisCodes?: Array<Diagnose['code']>; 
};

export interface TypeOption{
  label: string;
  value: 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck';
}

export interface HealthCheckOption {
  label: string;
  value: HealthCheckRating;
}

export type { Entry };