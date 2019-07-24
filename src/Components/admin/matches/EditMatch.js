import React, {useEffect, useState} from 'react';
import {firebaseDB, firebaseMatches, firebaseTeams} from "../../../firebase";

//app modules
import AdminLayout from "../../../HOC/AdminLayout";
import FormField from "../../utils/form_fields";
import { validate } from "../../utils/miscs";
import { firebaseLooper } from "../../utils/miscs";

const EditMatch = (props) => {

    const [matchID, setMatchID] = useState('');
    const [formError, setFormError] = useState(false);
    const [formSuccess, setFormSuccess] = useState('');
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState([]);
    const [formData, setFormData] = useState({
        date: {
            element: 'input',
            value: '',
            config: {
                label: 'Event Date',
                name: 'date_input',
                type: 'date'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        local: {
            element: 'select',
            value: '',
            config: {
                label: 'Select Local Team',
                name: 'select_local',
                type: 'select',
                options: []
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        },
        resultLocal: {
            element: 'input',
            value: '',
            config: {
                label: 'Result Local',
                name: 'result_input',
                placeholder: 'Result',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        },
        away: {
            element: 'select',
            value: '',
            config: {
                label: 'Select Away Team',
                name: 'select_away',
                type: 'select',
                options: []
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        },
        resultAway: {
            element: 'input',
            value: '',
            config: {
                label: 'Result Away',
                name: 'result_input',
                placeholder: 'Result',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        },
        referee: {
            element: 'input',
            value: '',
            config: {
                label: 'Referee',
                name: 'referee_input',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        stadium: {
            element: 'input',
            value: '',
            config: {
                label: 'Stadium',
                name: 'stadium_input',
                type: 'text'
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        result: {
            element: 'select',
            value: '',
            config: {
                label: 'Team Result',
                name: 'select_result',
                type: 'select',
                options: [
                    {key:'W', value: 'W'},
                    {key:'D', value: 'D'},
                    {key:'L', value: 'L'},
                    {key:'n/a', value: 'n/a'}
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
        },
        final: {
            element: 'select',
            value: '',
            config: {
                label: 'Game Played',
                name: 'select_final',
                type: 'select',
                options: [
                    {key:'Yes', value: 'Yes'},
                    {key:'No', value: 'No'},
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: '',
            showLabel: true
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

    const updateFields = (argmnts) => {
        const newFormData = {...formData};

        for (let key in newFormData) {
            if (argmnts.match) {
                newFormData[key].value = argmnts.match[key];
                newFormData[key].valid = true
            }
            if (key === 'local' || key === 'away') {
                newFormData[key].config.options = argmnts.teamOptions
            }
        }
        setMatchID(argmnts.matchId);
        setFormType(argmnts.type);
        setFormData(newFormData);
        setTeams(argmnts.teams)
    };

    useEffect(() => {
        const matchId = props.match.params.id;

        const getTeams = (match, type) => {
            firebaseTeams.once('value')
                .then(snapshot => {
                    const teams = firebaseLooper(snapshot);
                    const teamOptions = [];

                    snapshot.forEach((childSnapshot) => {
                        teamOptions.push({
                            key: childSnapshot.val().shortName,
                            value: childSnapshot.val().shortName
                        })
                    });
                    updateFields({match, teamOptions, teams, type, matchId})
                })
                .catch(error => {return error})
        };

        if (!matchId) {
            getTeams(false, 'Add')
        } else {
            firebaseDB.ref(`matches/${matchId}`).once('value')
                .then((snapshot) => {
                    const match = snapshot.val();
                    getTeams(match, 'Edit')
                })
                .catch(error => {return error})
        }
    }, [props.match.params.id]);

    const submitForm = (event) => {
        event.preventDefault();
        let dataToSubmit = {};
        let formIsValid = true;

        for (let key in formData) {
            dataToSubmit[key] = formData[key].value;
            formIsValid = formData[key].valid && formIsValid
        }

        teams.forEach((team) => {
           if (team.shortName === dataToSubmit.local) {
               dataToSubmit['localThmb'] = team.thmb
           }
           if (team.shortName === dataToSubmit.away) {
               dataToSubmit['awayThmb'] = team.thmb
           }
        });

        if (formIsValid) {
            if (formType === 'Edit') {
                firebaseDB.ref(`matches/${matchID}`)
                    .update(dataToSubmit)
                    .then(() => {
                        setFormSuccess('Updated Correctly');
                        setTimeout(() => {setFormSuccess('')}, 2000)
                    })
                    .catch(() => setFormError(true))
            } else {
                firebaseMatches.push(dataToSubmit)
                    .then(() => {
                        setFormSuccess('Added Correctly');
                        setTimeout(() => {
                            setFormSuccess('');
                            props.history.push('/admin_matches');

                        }, 2000)
                    })
                    .catch(() => setFormError(true))
            }
        } else {
            setFormError(true)
        }
    };

    return (
        <AdminLayout>
            <div className='editmatch_dialog_wrapper'>
                <h2>
                    {formType}
                </h2>
                <div>
                    <form onSubmit={event=> submitForm(event)}>
                        <FormField
                            id='date'
                            formData={formData.date}
                            change={(element) => updateForm(element)}
                        />

                        <div className='select_team_layout'>
                            <div className='label_inputs'>Local</div>
                            <div className='wrapper'>
                                <div className='left'>
                                    <FormField
                                        id='local'
                                        formData={formData.local}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        id='resultLocal'
                                        formData={formData.resultLocal}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='select_team_layout'>
                            <div className='label_inputs'>Away</div>
                            <div className='wrapper'>
                                <div className='left'>
                                    <FormField
                                        id='away'
                                        formData={formData.away}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div>
                                    <FormField
                                        id='resultAway'
                                        formData={formData.resultAway}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className='split_fields'>
                            <FormField
                                id='referee'
                                formData={formData.referee}
                                change={(element) => updateForm(element)}
                            />
                            <FormField
                                id='stadium'
                                formData={formData.stadium}
                                change={(element) => updateForm(element)}
                            />
                        </div>

                        <div className='split_fields last'>
                            <FormField
                                id='result'
                                formData={formData.result}
                                change={(element) => updateForm(element)}
                            />
                            <FormField
                                id='final'
                                formData={formData.final}
                                change={(element) => updateForm(element)}
                            />
                        </div>
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

export default EditMatch;