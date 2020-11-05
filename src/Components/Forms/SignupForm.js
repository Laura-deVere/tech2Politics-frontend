import React from 'react';
import { Form, Field, FieldArray, Formik } from 'formik';
import Dropdown from '../Dropdown';
import Button from '../Button';
import {expertiseList} from '../mockData';
import { form, signup, formDetailField, formErrorField, formButtons } from '../../sass/Form.module.scss';
 
const validate = values => {
    const errors = {};
    const numberRegex = new RegExp('^\\d+$');
    if(!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 20) {
        errors.firstName = 'Must be 20 characters or less';
    } else if (numberRegex.test(values.firstName)) {
        errors.firstName = "Must not contain numbers";
    }

    if(!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 20) {
        errors.lastName = 'Must be 20 characters or less';
    } else if (numberRegex.test(values.lastName)) {
        errors.lastName = "Must not contain numbers";
    }

    if(!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }

    if(!values.summary) {
        errors.summary = 'Required'
    } else if (values.summary.length < 250) {
        errors.summary = 'Please include a summary greater than 250 characters';
    }

    return errors;
}

const SignupForm = () => {
    // const formik = useFormik({
    //     initialValues: {
    //         email: '',
    //         firstName: '',
    //         lastName: '',
    //         website: '',
    //         linkedin: '',
    //         summary: '',
    //         expertise: []
    //     },
    //     validate,
    //     onSubmit: values => {
    //         alert.JSON.stringify(values, null, 2);
    //     }
    // });
 
    return (
        <>
        <Formik
            initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            website: '',
            linkedin: '',
            summary: '',
            expertise: []
            }}            
            onSubmit={values => alert(JSON.stringify(values, null, 2))}   
        >
            {({ errors, touched }) => (
                        <Form className={`${form} ${signup}`}>
            <h1>Join Tech2Politics</h1>

            <div className={formDetailField}>
                {touched.firstName && errors.firstName ? <div className={formErrorField}>{errors.firstName}</div> : null}
                <label htmlFor="firstName">First Name</label>
                <Field id="firstName" name="firstName" type="text" validate={validate} />
            </div>

            <div className={formDetailField}>
                {touched.lastName && errors.lastName ? <div className={formErrorField}>{errors.lastName}</div> : null}
                <label htmlFor="lastName">Last Name</label>
                <Field id="lastName" name="lastName" type="text" validate={validate}/>
            </div>

            <div className={formDetailField}>
                {touched.email && errors.email ? <div className={formErrorField}>{errors.email}</div> : null}
                <label htmlFor="email">Email Address</label>
                <Field id="email" name="email" type="email" validate={validate} />
            </div>

            <div className={formDetailField}>
                {touched.location && errors.location ? <div className={formErrorField}>{errors.location}</div> : null}
                <label htmlFor="location">Location</label>
                <Field id="location" name="location" type="location" validate={validate} />
            </div>

            <div className={formDetailField}>
                {touched.website && errors.website ? <div className={formErrorField}>{errors.website}</div> : null}
                <label htmlFor="website">Website</label>
                <Field id="website" name="website" type="website" validate={validate} />
            </div>

            <div className={formDetailField}>
                {touched.linkedin && errors.linkedin ? <div className={formErrorField}>{errors.linkedin}</div> : null}
                <label htmlFor="linkedin">Linkedin</label>
                <Field id="linkedin" name="linkedin" type="text" validate={validate} />
            </div>

            <div className={formDetailField}>
                {touched.summary && errors.summary ? <div className={formErrorField}>{errors.summary}</div> : null}
                <label htmlFor="summary">Summary</label>
                <Field id="summary" name="summary" type="text" validate={validate} cols="30" rows="10" />
            </div>

            

            <div className={formButtons}>
                <Button type="submit" text="Submit" />
                <Button text="Reset" onClickHandler={null}/>
            </div>
        </Form>
            )}
        

        </Formik>
        </>
    )
}

export default SignupForm;
