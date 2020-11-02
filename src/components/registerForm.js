import {generateForm} from './generateForm'
import {loginForm} from "./loginForm";
import {mount} from '../library/mount';

export function registerForm() {
    return generateForm(inputs, buttons, register);
}

function register(e) {
    e.preventDefault();

    const credentials = {};

    inputs.forEach(inputData => {
        credentials[inputData.name] = inputData.value;
    });
    console.log(credentials);

    fetch('http://rest.stecenka.lt/register', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credentials)
    })
        .then(response => response.json())
        .then(data => {
            if (data === 'success') {
               mount(loginForm());
            }
        });
}

const inputs = [
    {
        class: 'input input--white',
        placeholder: 'Email',
        name: 'email',
        type: 'email',
    },
    {
        placeholder: 'Password',
        name: 'password',
        type: 'password'
    },
    {
        placeholder: 'Age',
        name: 'age',
        type: 'text'
    },
    {
        placeholder: 'Name',
        name: 'name',
        type: 'text'
    }
]

const buttons = [
    {
        name: 'register',
        type: 'submit',
        title: 'Registruotis'
    }
]

