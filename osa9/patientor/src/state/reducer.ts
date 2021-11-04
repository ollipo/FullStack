import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "SET_DIAGNOSE_LIST";
    payload: Diagnosis[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_INFO_LIST";
      payload: Patient;
  };

export const setPatientList = (patients: Patient[]) => {
  return {
    type: "SET_PATIENT_LIST" as const,
    payload: patients,
  };
};

export const setPatientInfoList = (patient: Patient) => {
  return {
    type: "SET_PATIENT_INFO_LIST" as const,
    payload: patient,
  };
};

export const addPatient = (patient: Patient) => {
  return {
    type: "ADD_PATIENT" as const,
    payload: patient,
  };
};

export const setDiagnoseList = (diagnoses: Diagnosis[]) => {
  return {
    type: "SET_DIAGNOSE_LIST" as const,
    payload: diagnoses,
  };
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
    case "SET_PATIENT_INFO_LIST":
      return {
        ...state,
        patientsInfo: {
          ...state.patientsInfo,
          [action.payload.id]: action.payload
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
      case "SET_DIAGNOSE_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            ),
            ...state.diagnoses
          }
        };
    default:
      return state;
  }
};
