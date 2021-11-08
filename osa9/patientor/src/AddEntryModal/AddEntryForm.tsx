import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField2 } from "./EntryFormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { DiagnosisSelection, NumberField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<HealthCheckEntry, "id" >;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

export const AddEntryForm = ({ onSubmit, onCancel } : Props ) => {
    const [{ diagnoses }] = useStateValue();

    return (
        <Formik
        initialValues={{
            date: "",
            specialist: "",
            type: "HealthCheck",
            description: "",
            healthCheckRating: HealthCheckRating.Healthy
        }}
        onSubmit={onSubmit}
        validate={values => {
            const requiredError = "Field is required";
            const errors: { [field: string]: string } = {};
            if (!values.date) {
            errors.name = requiredError;
            }
            if (!values.specialist) {
            errors.ssn = requiredError;
            }
            if (!values.type) {
            errors.dateOfBirth = requiredError;
            }
            if (!values.description) {
            errors.occupation = requiredError;
            }
            return errors;
        }}
    >
     {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField2}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField2}
            />
            <Field
              label="Type"
              placeholder="Type"
              name="type"
              component={TextField2}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField2}
            />
            <Field
                label="healthCheckRating"
                name="healthCheckRating"
                component={NumberField}
                min={0}
                max={3}
            />
            <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />    
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
