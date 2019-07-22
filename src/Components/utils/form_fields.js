import React from 'react';

const FormField = (props) => {

    const showError = () => {
        let errorMessage = <div className="error_label">
            { props.formData.validation && !props.formData.valid
                ? props.formData.validationMessage
                : null }
        </div>;

        return errorMessage
    };

    const renderTemplate = () => {
        let formTemplate = null;

        switch (props.formData.element) {
            case('input'):
                formTemplate = (
                    <div>
                        {
                            props.formData.showLabel
                                ? <div className='label_inputs'>
                                    {props.formData.config.label}
                                </div>
                                : null
                        }
                        <input
                            {...props.formData.config}
                            value={props.formData.value}
                            onChange={(event) => props.change({event, id:props.id})}
                        />
                        { showError() }
                    </div>
                );
                break;
            case ('select'):
                formTemplate = (
                    <div>
                        {
                            props.formData.showLabel
                                ? <div className='label_inputs'>
                                    {props.formData.config.label}
                                </div>
                                : null
                        }
                        <select
                            value={props.formData.value}
                            onChange={(event) => props.change({event, id:props.id})}
                        >
                            <option value="">Select One</option>
                            {
                                props.formData.config.options.map((team) => (
                                    <option key={team.key} value={team.key}>{team.value}</option>
                                ))
                            }
                        </select>
                        { showError() }
                    </div>
                );
                break;
            default:
                formTemplate = null
        }

        return formTemplate
    };

    return (
        <div>
            {renderTemplate()}
        </div>
    );
};

export default FormField;