import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signUp, getExpertiseList } from '../../actions';
import { Form, Field, FieldArray, Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import Dropdown from '../Dropdown';
import Button from '../Button';
import { form, signup, formDetailField, formErrorField, formButtons, expertiseListItem } from '../../sass/Form.module.scss';
 import faker from 'faker';
// import expertise from '../../../../server/expertise';


const validate = values => {
    const errors = {};
    const numberRegex = new RegExp('^\\d+$');
    const rgx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
    const webRegex = new RegExp(rgx);
    const linkedInRegex = new RegExp(rgx);
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
            if(values.linkedin && !webRegex.test(values.linkedin)) {
                errors.linkedin = 'Please provide a valid url';
            }
            if(values.website && !linkedInRegex.test(values.website)) {
                errors.website = 'Please provide a valid url';
            }
    }

    return errors;
}

const SignupForm = ({ signUp, getExpertiseList, expertiseList }) => {
    const [formIsSubmitted, setFormIsSubmitted] = useState(false);

    useEffect(() => {
        getExpertiseList()
    },[getExpertiseList]);

    const handleAxiosPostRequest = async (newUser) => {
        await signUp(newUser);
        setFormIsSubmitted(true); 
    }

    const fakeIt = async () => {
        const fakeUser = {
            email: faker.internet.email(),
            password: '12345678',
            firstName: faker.name.firstName('female'),
            lastName: faker.name.lastName('female'),
            location: faker.address.city(),
            website: faker.internet.url(),
            linkedin: faker.internet.url(),
            summary: faker.lorem.words(150),
            expertise: [
                {_id: "5fb2b484199d702b629b6231", name: "ARTIFICIAL INTELLIGENCE"},
                {_id: "5fb2d3588fee930caa97283e", name: "COMPUTER SCIENCE"},
                {_id: "5fb2d3588fee930caa972843", name: "CYBERSECURITY"}
            ]
        }
         await signUp(fakeUser);
    }

    return (
            <>
                {
                    formIsSubmitted ? <Redirect to={'/signin'} /> : (
                        <Formik
                            initialValues={{
                                email: '',
                                password: '',
                                firstName: '',
                                lastName: '',
                                location: '',
                                website: '',
                                linkedin: '',
                                summary: '',
                                expertise: []
                            }}      
                            validate={validate}   
                            onSubmit={values => handleAxiosPostRequest(values)}
                        >
                            
                            {({ errors, touched, values, resetForm, handleSubmit }) => {
                                return (
                                    <Form onSubmit={handleSubmit} className={`${form} ${signup}`} >
                                        <h1>Join Tech2Politics</h1>
                                        <div>                
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
                                        </div> 
                                        <div>
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
                                                                    <Field name={`expertise[${index}]`} type="text"  value={values.expertise[index].name} disabled/>
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
                                            <Button type="button" text="Reset" onClickHandler={() => resetForm()}/>
                                        </div>
                                        </div>
                                    </Form>
                            )}}
                        
                        </Formik>
                )
            }
        </>
    )
}

const mapStateToProps = state => {
    return { expertiseList: state.expertiseList }
}

export default connect(mapStateToProps, { signUp, getExpertiseList })(SignupForm);
