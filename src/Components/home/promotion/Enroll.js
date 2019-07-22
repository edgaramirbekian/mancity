import React, { useState } from 'react';
import { firebasePromotions } from "../../../firebase";

//app modules
import FormField from '../../utils/form_fields';
import { validate } from '../../utils/miscs';

//3rd party libs
import Fade from 'react-reveal/Fade';

const Enroll = () => {
    const  [formError, setFormError] = useState(false);
    const  [formSuccess, setFormSuccess] = useState('');
    const  [formData, setFormData] = useState({
        email: {
            element: 'input',
            value: '',
            config: {
                name: 'email_input',
                type: 'email',
                placeholder: 'Enter Your Email'
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            validationMessage: ''
        }
    });

    const updateForm = (element) => {
        const newFormData = {...formData};
        const newElement = {...newFormData[element.id]};

        newElement.value = element.event.target.value;

        let validData = validate(newElement);

        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

        setFormError(false);
        setFormData(newFormData)
    };

    const resetForm = () => {
        const newFormData = {...formData};

        for (let key in newFormData) {
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        setFormError(false);
        setFormData(newFormData)
    };

    const submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in formData) {
            dataToSubmit[key] = formData[key].value;
            formIsValid = formData[key].valid && formIsValid
        }

        if (formIsValid) {
            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
                .then((snapshot) => {
                   if (snapshot.val() === null) {
                       firebasePromotions.push(dataToSubmit);
                       setFormSuccess('Congratulations!');
                       setTimeout(() => {setFormSuccess('')}, 2000)
                   } else {
                       setFormSuccess('Already on the DataBase');
                   }
                });
            resetForm()
        } else {
            setFormError(true)
        }
    };

    return (
        <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={(event) => submitForm()}>
                    <div className="enroll_title">
                        Enter Your Email
                    </div>
                    <div className="enroll_input">
                        <FormField
                            id='email'
                            formData={formData.email}
                            change={(element) => updateForm(element)}
                        />
                        { formError
                            ? <div className="error_label">
                                Something went wrong, try again
                            </div>
                            : null
                        }
                        <div className="success_label">
                            { formSuccess }
                        </div>
                        <button onClick={(event) => submitForm(event)}>
                            Enroll
                        </button>
                        <div className="enroll_discl">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
    );
};

export default Enroll;