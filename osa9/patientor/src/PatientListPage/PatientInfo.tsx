import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Header, Icon } from "semantic-ui-react";
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { addEntry, setPatientInfoList, useStateValue } from '../state';
import { Entry, Patient } from '../types';
import EntryInfo from './EntryInfo';

const PatientInfo = () => {
    const [{ patientsInfo }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if(!patientsInfo[id]){
            const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch(setPatientInfoList(patient));
            } catch (e) {
                console.error(e);
            }
            };
            void fetchPatient();
        }
      }, [patientsInfo]);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
      };

    const submitNewEntry = async (values: EntryFormValues) => {
    try {
        const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
        );
        const patientToBeAdded = patientsInfo[id];
        patientToBeAdded.entries = patientToBeAdded.entries.concat(newEntry);
        dispatch(addEntry(patientToBeAdded));
        closeModal();
    } catch (e) {
        console.error(e.response?.data || 'Unknown Error');
    }
    };

    if(patientsInfo[id]) {
        const iconName = patientsInfo[id].gender === 'male' ? 'mars' : 'venus';
        return (
            <div>
                <Container>
                    <Header as="h1">{patientsInfo[id].name}<Icon name={iconName}/></Header>
                    ssn: {patientsInfo[id].ssn} <br/>
                    occupation: {patientsInfo[id].occupation} <br/> <br/>
                    <Button onClick={() => openModal()}>Add New Entry</Button>
                    <Header as="h3">entries</Header>
                    {patientsInfo[id].entries.map(entry => 
                        <EntryInfo key={entry.id} entry={entry}/>)}
                </Container>
                <AddEntryModal
                    modalOpen={modalOpen}
                    onSubmit={submitNewEntry}
                    onClose={closeModal}
                />
                
            </div>  
        );
    }
    return null;
};

export default PatientInfo;