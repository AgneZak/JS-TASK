import {generateForm} from "./generateForm";
import {user} from "../login";

export function loginForm() {
    return generateForm(inputs, buttons, fn);
}

function fn(e) {
    e.preventDefault();

    const credentials = {};

    inputs.forEach(inputData => {
        credentials[inputData.name] = inputData.value;
    });
    console.log(credentials);

    fetch('http://rest.stecenka.lt/login', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(token => {
            if (token) {
                localStorage.setItem('token', token);
                user.token = 'Bearer ' + token;
                console.log(token);
            }
        });
}

const inputs = [
    {
        class: 'input input--white',
        placeholder: 'Email',
        name: 'email',
        type: 'email',
        value: ''
    },
    {
        placeholder: 'Password',
        name: 'password',
        type: 'password',
        value: ''
    }
]

const buttons = [
    {
        name: 'login',
        type: 'submit',
        title: 'login'
    }
]

