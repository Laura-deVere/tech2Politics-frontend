import { connect } from 'react-redux';
import { updateUser } from '../../actions';
import { Form, Field, FieldArray, Formik } from 'formik';
import Avatar from "../Avatar"; 
import Button from '../Button';
import Dropdown from '../Dropdown';

import { editAvatar, expertiseListItems } from '../../sass/UserProfile.module.scss';
import { formDetailField, formErrorField, formButtons } from '../../sass/Form.module.scss';

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
            if(!values.summary) {
                errors.summary = 'Required'
            } else if (values.summary.length < 250) {
                errors.summary = 'Please include a summary greater than 250 characters';
            }
            if(!values.location) {
                errors.location = 'Please provide a location';
            }
            if(values.website && !webRegex.test(values.website)) {
                errors.website = 'Please provide a valid url';
            }
            if(values.linkedin && !linkedInRegex.test(values.linkedin)) {
                errors.linkedin = 'Please provide a valid LinkedIn url';
            }
    }
    console.log(errors)
    return errors;
}

const UserProfileEdit = ({ user, expertiseList, updateUser, handleToggleEditVisibility }) => {
    const handleFormSubmit = async (values) => {
        const userID = user._id;
        console.log(userID)
        console.log(values)
        await updateUser(values, userID);
        handleToggleEditVisibility(false);
    }

    return (
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    location: user.location,
                    website: user.website,
                    linkedin: user.linkedin,
                    summary: user.summary,
                    expertise: user.expertise
                }} 
                validate={validate}   
                onSubmit={values => handleFormSubmit(values)}
            >
                { 
                ({ errors, touched, values, handleSubmit }) => (
                <Form>
                    <div className={editAvatar}>
                        <Avatar size="large" />
                        <Button text="Change Avatar" type="button" />
                    </div>
                    <div>
                    <div className={formDetailField}>
                        {touched.firstName && errors.firstName ? <div className={formErrorField}>{errors.firstName}</div> : null}
                        <Field type="text" name="firstName" placeholder={user.firstName} />
                        {touched.lastName && errors.lastName ? <div className={formErrorField}>{errors.lastName}</div> : null}
                        <Field type="text" name="lastName" placeholder={user.lastName}/>
                    </div>
                    <FieldArray
                        name="expertise"
                        render={({remove, push}) => (
                            <div className={formDetailField}>
                                <Dropdown listName='CHOOSE YOUR EXPERTISE...' listOptions={expertiseList} onClickHandler={push} list={values.expertise} />
                                
                                {errors.expertise ? <div className={formErrorField}>{errors.expertise}</div> : null}
                                <ul className={expertiseListItems}>
                                    {values.expertise && values.expertise.length > 0 ? (
                                        values.expertise.map((item, index) => {
                                            return (
                                                <div key={index}>
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
                                </ul>
                            </div>
                        )}
                    />
                        <div className={formDetailField}>
                            {touched.location && errors.location ? <div className={formErrorField}>{errors.location}</div> : null}
                            Location: 
                            <Field type="text" name="location" placeholder={user.location} />
                        </div>
                        <div className={formDetailField}>
                            {touched.summary && errors.summary ? <div className={formErrorField}>{errors.summary}</div> : null}
                            <Field as="textarea" id="summary" name="summary" type="text"  cols="30" rows="10" placeholder={user.summary}/>
                        </div>
                        <div className={formDetailField}>
                            {touched.website && errors.website ? <div className={formErrorField}>{errors.website}</div> : null}
                            <i className="lni lni-world"></i>
                            <Field id="website" name="website" type="text" placeholder={user.website} />
                            <i className="lni lni-linkedin-original"></i>
                            {touched.linkedin && errors.linkedin ? <div className={formErrorField}>{errors.linkedin}</div> : null}
                            <Field id="linkedin" name="linkedin" type="text" placeholder={user.linkedin}/>
                        </div>
                    </div>
                    <div className={formButtons}>
                        <Button text="Save" type="submit" onClickHandler={handleSubmit}/>
                        <Button text="Cancel" type="button" onClickHandler={() => handleToggleEditVisibility(false)}/>
                    </div>
                </Form>
            )
                
                }
        </Formik>
    )
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.auth.user,
        expertiseList: state.expertiseList
    }
}

export default connect(mapStateToProps, { updateUser })(UserProfileEdit);