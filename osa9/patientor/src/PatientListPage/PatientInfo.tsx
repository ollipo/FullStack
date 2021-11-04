import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from "semantic-ui-react";
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient } from '../types';

const PatientInfo = () => {
    const [{ patientsInfo }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        if(!patientsInfo[id]){
            const fetchPatient = async () => {
            try {
                const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
                dispatch({ type: "SET_PATIENT_INFO_LIST", payload: patient });
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
                </Container><div></div>
            </div>  
        );
    }
    return null;
};

export default PatientInfo;