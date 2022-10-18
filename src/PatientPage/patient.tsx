import { useParams } from 'react-router-dom';
import { addEntry, useStateValue } from '../state';
import { Entry, EntryFormValues, Patient } from '../types';
import { entryParse } from './Entry';
import { Button } from '@material-ui/core';
import React from 'react';
import { AddEntryModal } from '../AddEntryModal';
import axios from 'axios';
import { apiBaseUrl } from '../constants';

function PatientPage() {

  const [{patients}, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError ] = React.useState<string>();
  const id = useParams().id;

  function openModal():void {
    setModalOpen(true);
  }

  function closeModal():void{
    setModalOpen(false);
    setError(undefined);
  }

  async function submitNewEntry(values: EntryFormValues){
    
    try {
      if (!id) throw new Error("No userId");
      console.log(`id: ${id} values: ${values.toString()}`);
      
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch( addEntry(newEntry, id));
      closeModal();
    }
    catch (e: unknown){
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
          setError(String(e?.response?.data?.error) || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
          setError("Unknown error");
        }
    }
  }

  

  if (!id) return <div>nada id</div>;

  const patient = patients[id];

  if (!patient) return <div>nada patiento</div>;

  return ( 

     <article>
      <h2>{patient.name}, {patient.gender}</h2>
      <p>DoB: {patient.dateOfBirth}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>Entries</h3>
        {patient.entries.map((entry)=> entryParse(entry))}
      
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    
    <Button variant="contained" onClick={() => openModal()}>
      Add new entry
    </Button>
    </article>
    );
}

export { PatientPage };