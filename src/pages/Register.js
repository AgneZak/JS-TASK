import Component from "../library/Component";
import h from "../library/hyperscript";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
                {
                    class: 'inputs',
                    labelText: 'VARDAS',
                    placeholder: 'Vardas',
                    type: 'text',
                    name: 'name'
                },
                {
                    class: 'inputs',
                    labelText: 'PAVARDĖ',
                    placeholder: 'Pavardė',
                    type: 'text',
                    name: 'surname'
                },
                {
                    class: 'inputs',
                    labelText: 'EL. PAŠTAS',
                    placeholder: 'pavyzdys@email.com',
                    type: 'email',
                    name: 'email',
                },
                {
                    class: 'inputs',
                    labelText: 'SLAPTAŽODIS',
                    placeholder: 'Slaptažodis',
                    type: 'password',
                    name: 'password',
                }
            ],
            buttons: [
                {
                    class: 'register__button',
                    name: 'register',
                    type: 'submit',
                    title: 'Registruotis'
                }
            ],
            credentials: {}
        }
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    register(e) {
        e.preventDefault();

        fetch('http://rest.stecenka.lt/register', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => response.json())
            .then(data => {
                if (data === 'success') {
                    this.props.route('login');
                    alert('Sveikinimai, Jūs sėkmingai prisiregistravote galite prisijungti')
                }else{
                    alert('Toks vartojas jau egzistuoja arba blogai įvesti duomenys')
                }
            });

    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {class: 'register__label'}, input.labelText,
                h(
                    'input',
                    {
                        keyup: e => this.handleInput(input.name, e.target.value),
                        placeholder: input.placeholder,
                        type: input.type,
                        class: input.class,
                        name: input.name
                    }
                ));
        });

        const buttons = this.state.buttons.map(button => {
            return h('button', {
                    type: button.type,
                    name: button.name,
                    class: button.class,
                },
                button.title
            )
        })
        const icon = h('i', {class: "fas fa-user-plus register-index-icon"});
        const question = h('h3', {}, 'Jau turi paskyrą?');
        const addUser = h('i', {
            class: "fas fa-user-astronaut register-icon",
            click: () => this.props.route('login')});
        const iconBox = h('div', {class: 'icon-box'}, addUser)
        const form = h('form', {submit: (e) => this.register(e)}, icon, ...inputs, ...buttons, question, iconBox);
        return h('div', {class: 'register-form'}, form);
    }
}