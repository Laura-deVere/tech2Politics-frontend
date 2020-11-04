import React from 'react';
import { useFormik } from 'formik';
import { signup } from '../../sass/Form.module.scss';

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
    const formik = useFormik({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            summary: ''
        },
        validate,
        onSubmit: values => {
            alert.JSON.stringify(values, null, 2);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className={signup}>
            {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
            <label htmlFor="firstName">First Name</label>
            <input id="firstName" name="firstName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} />

            {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
            <label htmlFor="lastName">Last Name</label>
            <input id="lastName" name="lastName" type="text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}/>

            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
            <label htmlFor="email">Email Address</label>
            <input id="email" name="email" type="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />

            {formik.touched.summary && formik.errors.summary ? <div>{formik.errors.summary}</div> : null}
            <label htmlFor="summary">Summary</label>
            <input id="summary" name="summary" type="textarea" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.summary} />

            <button type="submit">Submit</button>
        </form>
    )
}

export default SignupForm;