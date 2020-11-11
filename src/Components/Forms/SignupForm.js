import React from 'react';
import axios from '../../apis/user';
import { Form, Field, FieldArray, Formik } from 'formik';
import Dropdown from '../Dropdown';
import Button from '../Button';
import {expertiseList} from '../mockData';
import { form, signup, formDetailField, formErrorField, formButtons, expertiseListItem } from '../../sass/Form.module.scss';
 
const validate = values => {
    const errors = {};
    const numberRegex = new RegExp('^\\d+$');
    const rgx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
    const urlRegex = new RegExp(rgx);
        if(values) {
            if(values.expertise === undefined) {
                errors.expertise = "Something went wrong";
            } else if (values.expertise.length < 1) {
                errors.expertise = "Must choose at least 1 and up to 5.";
            }
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
            if(!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 9 && values.password.length > 15) {
                errors.password = 'Password length be between 9 and 15 characters long';
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

            if(!values.location) {
                errors.location = 'Please provide a location';
            }
            if(values.linkedin && !urlRegex.test(values.linkedin)) {
                errors.linkedin = 'Please provide a valid url';
            }

            if(values.website && !urlRegex.test(values.website)) {
                errors.linkedin = 'Please provide a valid url';
            }
    }

    return errors;
}

const SignupForm = () => {

    const handleAxiosPostRequest = async (newUser) => {
        const options = {
            method: 'POST',
            url: '/signup',
            data: {
                email: newUser.email,
                password: newUser.password,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                website: newUser.website,
                linkedin: newUser.linkedin,
                summary: newUser.summary,
                expertise: newUser.expertise
            },
            withCredentials: true
        }

        await axios(options).then((res) => console.log(res));
    }

    return (
        <>
        <Formik
            initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                website: '',
                linkedin: '',
                summary: '',
                expertise: []
            }}      
            validate={validate}   
            onSubmit={values => handleAxiosPostRequest(values)}   
            // onSubmit={values => alert(JSON.stringify(values, null, 2))}   
        >
            {({ errors, touched, values, resetForm, handleSubmit }) => {
                return (
                    <Form onSubmit={handleSubmit} className={`${form} ${signup}`} >
                        <h1>Join Tech2Politics</h1>
                                        
                        <div className={formDetailField}>
                            {touched.firstName && errors.firstName ? <div className={formErrorField}>{errors.firstName}</div> : null}
                            <label htmlFor="firstName">First Name</label>
                            <Field id="firstName" name="firstName" type="text"  />
                        </div>

                        <div className={formDetailField}>
                            {touched.lastName && errors.lastName ? <div className={formErrorField}>{errors.lastName}</div> : null}
                            <label htmlFor="lastName">Last Name</label>
                            <Field id="lastName" name="lastName" type="text" />
                        </div>

                        <div className={formDetailField}>
                            {touched.email && errors.email ? <div className={formErrorField}>{errors.email}</div> : null}
                            <label htmlFor="email">Email Address</label>
                            <Field id="email" name="email" type="email"  />
                        </div>

                        <div className={formDetailField}>
                            {touched.password && errors.password ? <div className={formErrorField}>{errors.password}</div> : null}
                            <label htmlFor="password">Password</label>
                            <Field id="password" name="password" type="password" />
                        </div>

                        <div className={formDetailField}>

                            {touched.location && errors.location ? <div className={formErrorField}>{errors.location}</div> : null}
                            <label htmlFor="location">Location</label>
                            <Field id="location" name="location" type="text"  />
                        </div>

                        <div className={formDetailField}>
                            {touched.website && errors.website ? <div className={formErrorField}>{errors.website}</div> : null}
                            <label htmlFor="website">Website</label>
                            <Field id="website" name="website" type="text"  />
                        </div>

                        <div className={formDetailField}>
                            {touched.linkedin && errors.linkedin ? <div className={formErrorField}>{errors.linkedin}</div> : null}
                            <label htmlFor="linkedin">Linkedin</label>
                            <Field id="linkedin" name="linkedin" type="text"  />
                        </div>

                        <div className={formDetailField}>
                            {touched.summary && errors.summary ? <div className={formErrorField}>{errors.summary}</div> : null}
                            <label htmlFor="summary">Summary</label>
                            <Field as="textarea" id="summary" name="summary" type="text"  cols="30" rows="10" />
                        </div>

                        <FieldArray
                            name="expertise"
                            render={({remove, push}) => (
                                <div className={formDetailField}>
                                    <Dropdown listName='CHOOSE YOUR EXPERTISE...' listOptions={expertiseList} onClickHandler={push} list={values.expertise} />
                                    
                                    {errors.expertise ? <div className={formErrorField}>{errors.expertise}</div> : null}
                                    {values.expertise && values.expertise.length > 0 ? (
                                        values.expertise.map((item, index) => {
                                            return (
                                                <div key={index} className={expertiseListItem}>
                                                    <Field name={`expertise[${index}]`} type="text"  value={values.expertise[index]} disabled/>
                                                    <button 
                                                        type="button"
                                                        onClick={() => remove(index)}>
                                                        X
                                                    </button>
                                                </div>
                                            )
                                        })
                                        ) : null
                                    }
                                </div>
                            )}
                        />

                        <div className={formButtons}>
                            <Button type="submit" text="Submit" />
                            <Button text="Reset" onClickHandler={() => resetForm()}/>
                        </div>
                    </Form>
            )}}
        
        </Formik>
        </>
    )
}


export default SignupForm;
