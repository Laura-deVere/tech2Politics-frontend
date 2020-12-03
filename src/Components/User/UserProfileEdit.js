import { connect } from 'react-redux';
import { Form, Field, FieldArray, Formik } from 'formik';
import Avatar from "../Avatar"; 
import Button from '../Button';
import Dropdown from '../Dropdown';

import { userLocation, userName } from '../../sass/UserProfile.module.scss';
import { formDetailField, formErrorField, expertiseListItem } from '../../sass/Form.module.scss';

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

const UserProfileEdit = ({ user, expertiseList }) => {
    return (
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    website: user.website,
                    linkedin: user.linkedIn,
                    summary: user.summary,
                    expertise: user.expertise
                }} 
                validate={validate}   
                onSubmit={values => console.log(values)}
            >
                { 
                        ({ errors, touched, values, resetForm, handleSubmit }) => (
                <Form onSubmit={handleSubmit} >
                    <div>
                        <Avatar size="large" />
                        <Button text="Change Avatar" />
                    </div>
                    <div>
                    <div className={userName}>
                        <Field type="text" name="firstName" placeholder={user.firstName} />
                        <Field type="text" name="lastName" placeholder={user.lastName}/>
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
                        <div className={userLocation}>Location: 
                            <Field type="text" name="location" placeholder={user.location} />
                        </div>
                        <p>
                            <Field as="textarea" id="summary" name="summary" type="text"  cols="30" rows="10" placeholder={user.summary}/>
                        </p>
                        <div>
                            <i className="lni lni-world"></i>
                            <Field id="website" name="website" type="text" placeholder={user.website} />
                            <i className="lni lni-linkedin-original"></i>
                            <Field id="linkedin" name="linkedin" type="text" placeholder={user.linkedIn}/>
                        </div>
                    </div>
                    <Button text="Save" />
                </Form>
            )
                
                }
        </Formik>
    )
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps)(UserProfileEdit);