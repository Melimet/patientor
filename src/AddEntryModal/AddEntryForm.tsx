import { EntryFormValues } from "../types";
import { Field, Formik, Form } from "formik";
import {  TextField } from '../AddPatientModal/FormField';

import { Button, Grid } from "@material-ui/core";


interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


export function AddEntryForm({ onSubmit, onCancel }: Props){

  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "asd",
        date: "2015-01-02",
        specialist: "Dr house",
        healthCheckRating: 0,
        employerName: 'Asd',
        sickLeave: { endDate: '2015-01-02', startDate: '2015-01-02'},
        discharge: {criteria: '2015-01-02', date: '2015-01-02'},
        diagnosisCodes: []
      }}
      onSubmit={onSubmit}

      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string} = {};
        if (!values.description){
          errors.description = requiredError;
        }
        if (!values.date){
          errors.date = requiredError;
        }
        if (!values.specialist){
          errors.specialist = requiredError;
        }
        return errors;
      }}
  >

      {({ isValid }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            
            <Grid item>
              <Button
                color="secondary"
                variant="contained"
                style={{ float: 'left' }}
                type="button"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Grid>
            <Grid item>
              <Button
                style={{
                  float: 'right',
                }}
                type="submit"
                variant="contained"
                disabled={!isValid}
              >
                Add
              </Button>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  
  );
}
