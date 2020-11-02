import Component from "../library/Component";
import h from "../library/hyperscript";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [
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
                    class: 'login__button',
                    name: 'register',
                    type: 'submit',
                    title: 'Prisijungti'
                }
            ],
            credentials: {
                email: '',
                password: ''
            }
        }
    }

    login(e) {
        e.preventDefault();
        fetch('http://rest.stecenka.lt/login', {
            headers: {
                'Content-type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(this.state.credentials)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(user => {
                if (user) {
                    this.props.logInUser(user)

                } else {
                    alert('Deja :( Blogai suvesti duomenys')
                }
            });
    }

    handleInput = (name, value) => {
        this.state.credentials[name] = value;
    }

    render() {
        const inputs = this.state.inputs.map(input => {
            return h('label', {class: 'login__label'}, input.labelText,
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
                    class: button.class,
                    name: button.name
                },
                button.title
            )
        });

        const icon = h('i', {class: "fas fa-user-astronaut login-index-icon"});
        const question = h('p', {}, 'Pirmas kartas?');
        const addUser = h('i', {
            class: "fas fa-user-plus login-icon",
            click: () => this.props.route('register')
        });
        const form = h('form', {submit: (e) => this.login(e)}, icon, ...inputs, ...buttons, question, addUser);
        return h('section', {class: "login-form"}, form);
    }
}