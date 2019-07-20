import React, {useState} from 'react';
import { firebase } from '../../firebase';

//app modules
import FormField from '../utils/form_fields';
import { validate } from '../utils/miscs';

const SignIn = (props) => {
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
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                placeholder: 'Enter Your Password'
            },
            validation: {
                required: true,
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

    const login = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in formData) {
            dataToSubmit[key] = formData[key].value;
            formIsValid = formData[key].valid && formIsValid
        }

        if (formIsValid) {
            firebase.auth().signInWithEmailAndPassword(
                dataToSubmit.email,
                dataToSubmit.password
            )
                .then(() => {
                    props.history.push('/dashboard')
            })
                .catch(() => {
                    setFormError(true)
                })

        } else {
            setFormError(true)
        }
    };

    return (
        <div className="container">
            <div
                className="signin_wrapper"
                style={{
                    margin: '100px',
                }}
            >
                <form onSubmit={(event) => login()}>
                    <h2>Please Login</h2>
                    <FormField
                        id='email'
                        formData={formData.email}
                        change={(element) => updateForm(element)}
                    />
                    <FormField
                        id='password'
                        formData={formData.password}
                        change={(element) => updateForm(element)}
                    />
                    { formError
                        ? <div className="error_label">
                            Given email or/and password is wrong
                        </div>
                        : null
                    }
                    <button onClick={(event) => login(event)}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;