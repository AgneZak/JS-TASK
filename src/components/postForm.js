import {generateForm} from "./generateForm";
import {user} from "../login";

export function postForm() {
    return generateForm(inputs, buttons, post);
}

function post(e) {
    e.preventDefault();
    const text = {};

    inputs.forEach(inputData => {
        text[inputData.name] = inputData.value;
    });
    console.log(text);

    fetch('http://rest.stecenka.lt/api/sveikinimai', {
        headers: {
            'Content-type': 'application/json',
            'Authorization': user.token,
        },
        method: 'POST',
        body: JSON.stringify(text)
    })
        .then(response => response.json())
}

const inputs = [
    {
        placeholder: 'Pavadinimas',
        name: 'text',
        type: 'text',
    },
    {
        placeholder: 'Tekstas',
        name: 'body',
        type: 'text'
    }
]

const buttons = [
    {
        name: 'login',
        type: 'submit',
        title: 'Post'
    }
]

