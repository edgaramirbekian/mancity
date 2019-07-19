import React from 'react';

//3rd party libs
import { Link } from 'react-router-dom';

export const Tag = (props) => {
    const template = <div
        style={{
            background: props.bck,
            fontSize: props.size,
            color: props.color,
            padding: "5px 10px",
            display: "inline-block",
            fontFamily: "Righteous"
        }}
    >
        {props.children}
    </div>;

    if (props.link) {
        return (
            <Link to={props.linkTo}>
                {template}
            </Link>
        )
    } else {
        return template
    }
};

export const firebaseLooper = (snap) => {
    const data = [];
    snap.forEach((childSnap) => {
        data.push({
            ...childSnap.val(),
            id: childSnap.key
        })
    });
    return data
};

export const reverseArray = (actualArray) => {
    let reversedArray = [];

    actualArray.map((item) => {
        return reversedArray.unshift(item);
    });
    return reversedArray;
};

export const validate = (element) => {
    let error = [true, ''];

    if (element.validation.email) {
        const valid = /^\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'this field is required' : ''}`;
        error = !valid ? [valid, message] : error
    }
    return error
};