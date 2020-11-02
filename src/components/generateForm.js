import h from "../library/hyperscript";

export function generateForm(inputs = [], buttons = [], handler) {
    const inputNodes = inputs.map(inputAttributes => {
        inputAttributes.change = (e) => {
            inputAttributes.value = e.target.value;
        }
        return h('input', inputAttributes);
    });
    const buttonNodes = buttons.map(buttonAttributes => h('button', buttonAttributes, buttonAttributes.title));

    return h(
        'form',
        {
            class: 'form form-login',
            method: 'POST',
            submit: handler
        },
        ...inputNodes,
        ...buttonNodes
    );
}
