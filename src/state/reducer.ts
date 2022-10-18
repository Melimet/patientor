import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
  }
  | {
    type: "ADD_ENTRY";
    payload: {entry:Entry, id:string};
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
      case "ADD_ENTRY":
        
        return {
          ...state,
          patients: {
          ...state.patients,
          [action.payload.id]: {...state.patients[action.payload.id], 
            entries: state.patients[action.payload.id].entries.concat(action.payload.entry) } 
          }
        };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({...memo, [diagnosis.code]: diagnosis}),
              {} 
            ),
            ...state.diagnoses,
          },
        };
    default:
      return state;
  }
};

function addPatient(patient: Patient): Action{
  return { type: "ADD_PATIENT", payload: patient };
}

function setPatients(patientList: Patient[]): Action{
  return { type: "SET_PATIENT_LIST", payload: patientList };
}

function setDiagnosis(diagnosisList: Diagnosis[]): Action{
  return { type: 'SET_DIAGNOSIS_LIST', payload: diagnosisList};
}
function addEntry(entry: Entry, id: string ): Action{
  return { type: "ADD_ENTRY", payload: {entry, id}};
}

export { addPatient, setPatients, setDiagnosis, addEntry };