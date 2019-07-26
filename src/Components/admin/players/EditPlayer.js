import React, {useEffect, useState} from 'react';
import {firebase, firebaseDB, firebasePlayers, firebaseTeams} from "../../../firebase";

//app modules
import AdminLayout from "../../../HOC/AdminLayout";
import FormField from "../../utils/form_fields";
import { validate } from "../../utils/miscs";
import { firebaseLooper } from "../../utils/miscs";
import FileUploader from "../../utils/file_uploader";

const EditPlayer = (props) => {

    const [playerID, setPlayerID] = useState('');
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState('');
    const [formType, setFormType] = useState('');
    const [defaultIMG, setDefaultIMG] = useState('');
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState({
        name: {
            element: 'input',
            value: '',
            config: {
                label: 'First Name',
                name: 'name_input',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        lastname: {
            element: 'input',
            value: '',
            config: {
                label: 'Last Name',
                name: 'lastname_input',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        number: {
            element: 'input',
            value: '',
            config: {
                label: 'Payer Number',
                name: 'number_input',
                type: 'number'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        position: {
            element: 'select',
            value: '',
            config: {
                label: 'Select the Position',
                name: 'select_position',
                type: 'select',
                options: [
                    {key: 'GK', value: 'Goalkeeper'},
                    {key: 'DF', value: 'Defender'},
                    {key: 'MF', value: 'Midfielder'},
                    {key: 'FW', value: 'Forward'},
                    {key: 'n/a', value: 'n/a'},
                    ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        image: {
            element: 'image',
            value: '',
            validation: {
                required: true
            },
            valid: true
        }
    });

    const updateFields = (player, id, formtype, defaultImg) => {
        console.log('heh')
        const newFormData = {...formData};
        for (let key in newFormData) {
            newFormData[key].value = player[key];
            newFormData[key].valid = true;
        }
        setPlayerID(id);
        setDefaultIMG(defaultImg);
        setFormType(formtype);
        setFormData(newFormData)
    };

    useEffect(() => {
        const playerId = props.match.params.id;
        if (!playerId) {
            setFormType('Add')
        } else {
            firebaseDB.ref(`/players/${playerId}`).once('value')
                .then((snapshot) => {
                    const playerData = snapshot.val();
                    firebase.storage().ref('players').child(playerData.image).getDownloadURL()
                        .then((url) => {
                            console.log('2');
                            updateFields(playerData, playerId, 'Edit', url)
                        })
                        .catch((error) => {console.log(error)})
                })
                .catch((error) => {console.log(error)})
        }
    }, [props.match.params.id]);

    const updateForm = (element, content = '') => {
        const newFormData = {...formData};
        const newElement = {...newFormData[element.id]};

        if (content === '') {
            newElement.value = element.event.target.value;
        } else {
            newElement.value = content
        }

        let validData = validate(newElement);
        newElement.valid = validData[0];
        newElement.validationMessage = validData[1];

        newFormData[element.id] = newElement;

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
            if(formType === 'Edit') {
                firebaseDB.ref(`players/${playerID}`).update(dataToSubmit)
                    .then(() => {
                        setFormSuccess('Player Updated');
                        setTimeout(() => {setFormSuccess('')}, 2000)
                    })
                    .catch((error) => setFormError(true))
            } else {
                firebasePlayers.push(dataToSubmit)
                    .then(() => {
                        setFormSuccess('Player Updated');
                        setTimeout(() => {
                            setFormSuccess('');
                            props.history.push('/admin_players')
                            }, 2000)
                    })
                    .catch((error) => {setFormError(true); console.log(dataToSubmit)})
            }
        } else {
            setFormError(true)
        }
    };

    const resetImg = () => {
        const newFormData = {...formData};
        newFormData['image'].value = '';
        newFormData['image'].valid = '';
        setDefaultIMG('');
        setFormData(newFormData);
    };

    const storeFilename = (some_filename) => {
        updateForm({id: 'image'}, some_filename)
    };

    return (
        <AdminLayout>
            {console.log(formData)}
            <div className='editplayers_dialog_wrapper'>
                <h2>
                    {formType}
                </h2>
                <div>
                    <form onSubmit={(ev)=> submitForm(ev)}>

                        <FileUploader
                            dir='players'
                            label='Player Image'
                            defaultImage={defaultIMG}
                            defaultImageName={formData.image.value}
                            resetImage={() => resetImg()}
                            fileName={(filename) => storeFilename(filename)}
                        />

                        <FormField
                            id='name'
                            formData={formData.name}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id='lastname'
                            formData={formData.lastname}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id='number'
                            formData={formData.number}
                            change={(element) => updateForm(element)}
                        />
                        <FormField
                            id='position'
                            formData={formData.position}
                            change={(element) => updateForm(element)}
                        />

                        <div className='admin_submit'>
                            <button onClick={(ev) => {submitForm(ev)}}>
                                {formType}
                            </button>
                        </div>
                        <div className='success_label'>{formSuccess}</div>
                        {
                            formError
                                ? <div className='error_label'>Something is Wrong</div>
                                : null
                        }
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
};

export default EditPlayer;