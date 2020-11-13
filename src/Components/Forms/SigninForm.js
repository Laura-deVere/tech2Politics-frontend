import { Form, Field, Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import ErrorMessage from '../ErrorMessage';
import Button from '../Button';

import { form, signin, formDetailField, formErrorField, formButtons } from '../../sass/Form.module.scss';
import { useState } from 'react';

const validate = values => {
    const errors = {};

    if(!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
    }

    if(!values.password) {
        errors.password = 'Required'
    }

    return errors;
}

const SigninForm = ({errorMessage, signIn}) => {
    const [signInSuccess, setSignInSuccess] = useState(false);
    const [signInError, setSignInError] = useState(false);

    const handleSigninFormSubmit = async (values) => {
        const success = await signIn(values.email, values.password);
        console.log(success)
        if(success) {
            setSignInSuccess(true);
        } else {
            setSignInError(true);
            console.log(errorMessage)
        }
    }

    return (
        <div>
            {
                signInSuccess ? <Redirect to={'/user'} /> : (

                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validate={validate}
                            onSubmit={values => handleSigninFormSubmit(values)}
                            >
                            {({ errors, touched }) => (

                                <Form className={`${form} ${signin}`}>
                                    <h1>Sign In</h1>
                                    {signInError ? <ErrorMessage message={errorMessage.message} /> : null}
                                    <div className={formDetailField}>
                                        {errors.email && touched.email ? <div className={formErrorField}>{errors.email}</div>:null}
                                        <Field type="email" id="email" name="email" />
                                    </div>

                                    <div className={formDetailField}>
                                        {errors.password && touched.password ? <div className={formErrorField}>{errors.password}</div>:null}
                                        <Field type="password" id="password" name="password" />
                                    </div>

                                    <div className={formButtons}>
                                        <Button type="submit" text="Submit" />
                                    </div>
                                </Form>
                            )}
                        </Formik>

                )
            }
            
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        errorMessage: state.error
    }
}

export default connect(mapStateToProps, { signIn })(SigninForm);