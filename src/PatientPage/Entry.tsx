import { State, useStateValue } from "../state";
import { Diagnosis, Entry, } from "../types";

function assertNever(value: never): never{
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

function getDiagnosis(state: State, code:string):Diagnosis | undefined{
  return state.diagnoses[code];
}

function entryParse( entry: Entry): JSX.Element | never{
  const [state, ] = useStateValue();

  switch (entry.type){
    case 'Hospital': 
    return (
        <div style={{borderStyle: "solid", padding:"1rem", margin:"1rem"}}key={entry.id}>
          <p>Hospital</p>
          {entry.date}, <i>{entry.description}</i> 

          <p>{`${entry.discharge.criteria} - ${entry.discharge?.date}`} </p>

          <ul>
            {entry.diagnosisCodes?.map((diagnose) => 
            <li key={diagnose}>{diagnose} - {getDiagnosis(state, diagnose)?.name}</li>)}
          </ul>

        <p>Diagnosis by {entry.specialist}</p>
        </div>
    );
    case 'HealthCheck':
      return (
          <div style={{borderStyle: "solid", padding:"1rem", margin:"1rem"}}key={entry.id}>
            <p>Health check</p>
            {entry.date}, <i>{entry.description}</i> 

            <p>Health check rating: {entry.healthCheckRating}, (0-3, lower is better)</p>
            <ul>
              {entry.diagnosisCodes?.map((diagnose) => 
              <li key={diagnose}>{diagnose} - {getDiagnosis(state, diagnose)?.name}</li>)}
            </ul>

          <p>Diagnosis by {entry.specialist}</p>
        </div>
      );
    case 'OccupationalHealthcare':
      return (
          <div style={{borderStyle: "solid", padding:"1rem", margin:"1rem"}}key={entry.id}>
            <p>Occupational healthcare</p>
            {entry.date}, <i>{entry.description}</i> 
            <p>Employer: {entry.employerName}</p>
            <p>{entry.sickLeave ? `On sickleave from ${entry.sickLeave.startDate} to ${entry.sickLeave.endDate}`:""}</p>
            <ul>
              {entry.diagnosisCodes?.map((diagnose) => 
              <li key={diagnose}>{diagnose} - {getDiagnosis(state, diagnose)?.name}</li>)}
            </ul>

          <p>Diagnosis by {entry.specialist}</p>
        </div>
      );
    default:
      assertNever(entry);
  }
}

export { entryParse };