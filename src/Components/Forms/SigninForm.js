import { Form, Field, Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import Button from '../Button';

import { form, signin, formDetailField, formErrorField, formButtons } from '../../sass/Form.module.scss';

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

const SigninForm = ({signIn}) => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validate={validate}
                onSubmit={values => signIn(values.email, values.password)}
                >
                {({ errors, touched }) => (

                    <Form className={`${form} ${signin}`}>
                        <h1>Sign In</h1>

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
        </div>
    )
}

export default connect(null, { signIn })(SigninForm);