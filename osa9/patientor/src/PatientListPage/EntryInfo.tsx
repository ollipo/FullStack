import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { Card, Icon } from 'semantic-ui-react';
import { SemanticCOLORS } from "semantic-ui-react/dist/commonjs/generic";
import { useStateValue } from "../state";

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const HealthCheck = ({entry}: {entry: HealthCheckEntry}) => {
    const [{ diagnoses }, ] = useStateValue();
    const HCRating = entry.healthCheckRating;
    let heartColor: SemanticCOLORS;
    switch (HCRating) {
        case 0:
            heartColor='green';
            break;            
        case 1:
            heartColor='yellow';
            break;   
        case 2:
            heartColor='orange';
            break;   
        case 3:
            heartColor='red';
            break;       
        default:
            heartColor='black';
    }
    
    return (
        <Card.Group>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{entry.date} <Icon name='doctor' size='big'/></Card.Header>
                    <Card.Meta>{entry.description}
                        <ul>
                            {entry.diagnosisCodes?.map(codes =>
                                codes).map(code =>
                                    <li key={code}>{code } {diagnoses[code]?.name}</li>)}
                        </ul>
                    </Card.Meta>
                    <Card.Description>
                        <Icon name='heart' color={heartColor}/>
                    </Card.Description>
                </Card.Content>
            </Card>
        </Card.Group>
    );
};

const OccupationalHealthcare = ({entry}: {entry: OccupationalHealthcareEntry}) => {
    const [{ diagnoses }, ] = useStateValue();
    return (
        <Card.Group>
            <Card fluid>
                <Card.Content>
                    <Card.Header>{entry.date} <Icon name='stethoscope' size='big'/> {entry.employerName}</Card.Header>
                    <Card.Meta>{entry.description}
                    <ul>
                        {entry.diagnosisCodes?.map(codes =>
                            codes).map(code =>
                                <li key={code}>{code } {diagnoses[code]?.name}</li>)}
                    </ul>
                    </Card.Meta>
                </Card.Content>
            </Card>
        </Card.Group>
    );
};

const Hospital = ({entry}: {entry: HospitalEntry}) => {
    const [{ diagnoses }, ] = useStateValue();
    return (
        <Card.Group>
        <Card fluid>
            <Card.Content>
                <Card.Header>{entry.date} <Icon name='hospital symbol' size='big'/> </Card.Header>
                <Card.Meta>
                    <ul>
                        {entry.diagnosisCodes?.map(codes =>
                            codes).map(code =>
                                <li key={code}>{code } {diagnoses[code]?.name}</li>)}
                    </ul>
                    <Icon name='arrow alternate circle down' color='red'/>{ entry.discharge.date} { entry.discharge.criteria}
                </Card.Meta>
            </Card.Content>
        </Card>
    </Card.Group>
    );
};

const EntryInfo = ({entry}: {entry: Entry}) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheck entry={entry} />;                
        case "OccupationalHealthcare":
            return <OccupationalHealthcare entry={entry} />; 
        case "Hospital":
            return <Hospital entry={entry} />; 
        default:
            return assertNever(entry);
    }
};

export default EntryInfo;