import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from '../constants';
import { setPatientInfoList, useStateValue } from '../state';
import { Patient } from '../types';

const PatientInfo = () => {
    const [{ patientsInfo, diagnoses }, dispatch] = useStateValue();
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

    if(patientsInfo[id]) {
        const iconName = patientsInfo[id].gender === 'male' ? 'mars' : 'venus';
        return (
            <div>
                <Container>
                    <Header as="h1">{patientsInfo[id].name}<Icon name={iconName}/></Header>
                    ssn: {patientsInfo[id].ssn} <br/>
                    occupation: {patientsInfo[id].occupation}
                    <Header as="h3">entries</Header>
                    {patientsInfo[id].entries.map(e => 
                        <p key={e.date}>
                            {e.date}
                            <i> {e.description}</i>
                        </p>)} <br/>
                        <ul>
                        {patientsInfo[id].entries.map(entry =>
                            entry.diagnosisCodes).map(codes =>
                                codes?.map(code =>
                                    <li key={code}>{code } {diagnoses[code]?.name}</li>))}
                        </ul>
                </Container><div></div>
            </div>  
        );
    }
    return null;
};

export default PatientInfo;