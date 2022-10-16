import { useParams } from 'react-router-dom';
import { useStateValue } from '../state';
import { Diagnosis, Patient } from '../types';
import { State } from '../state';

function getPatient(state: State, id: string ):Patient | undefined{
  
  return state.patients[id];    
}

function getDiagnosis(state: State, code:string):Diagnosis | undefined{
  return state.diagnoses[code];
}

function PatientPage() {
  const [state, ] = useStateValue();
  const id = useParams().id;

  if (!id) return <div>nada id</div>;

  const patient = getPatient(state, id);

  if (!patient) return <div>nada patiento</div>;

  return <article>
      <h2>{patient.name}, {patient.gender}</h2>
      <p>DoB: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>
      <h3>Entries</h3>
        {patient.entries.map((entry)=> 
        <div style={{borderStyle: "solid", padding:"1rem", margin:"1rem"}}key={entry.id}>
          {entry.date}, <i>{entry.description}</i> 
          <ul>
            {entry.diagnosisCodes?.map((diagnose) => 
            <li key={diagnose}>{diagnose} - {getDiagnosis(state, diagnose)?.name}</li>)}
          </ul>
        <p>Diagnosis by {entry.specialist}</p>
        </div>
        )}
        
            
    </article>;
}

export { PatientPage };