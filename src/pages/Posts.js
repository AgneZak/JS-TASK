import Component from "../library/Component";
import h from "../library/hyperscript";


const user = JSON.parse(localStorage.getItem('user'))


export default class Posts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            buttons: [
                {
                    name: 'delete',
                    type: 'submit',
                    title: 'Trinti skelbima',
                    class: 'delete__button'
                }
            ],
        }
        this.post()
    }

    post() {
        fetch('http://rest.stecenka.lt/api/skelbimai', {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(data => {
                this.setState({posts: data});
                console.log('hello')
            });
    }

    delPost(id) {
        fetch(`http://rest.stecenka.lt/api/skelbimai/${id}`, {
            headers: {
                'Content-type': 'application/json',
                'Authorization': JSON.parse(localStorage.getItem('user')).token
            },
            method: 'DELETE',
        })
            .then(data => {
                const leftPosts = this.state.posts.filter(post => post.id !== id);
                this.setState({posts: leftPosts});
            })
    }

    render() {
        const allPosts = this.state.posts.map(post => {
            const title = h('h2', {class: 'card-title'}, post.title);
            const text = h('p', {class: 'card-text'}, post.body);
            const time = h('p', {class: 'card-text'}, post.created_at.split('T')[0]);
            const userName = h('h3', {class: ' user-card-name'}, user.name)
            const userSurname = h('h3', {class: ' user-card-name'}, user.surname)
            const userBox = h('div', {class: 'card-user'}, userName, userSurname)
            const del = post.user_id === JSON.parse(localStorage.getItem('user')).id ? h('button', {
                    class: 'delete-button',
                    click: (e) => this.delPost(post.id)
                },
                'Trinti skelbima') : ''

            return h('div', {class: 'card', id: post.id}, title, userBox, text, time, del)
        });
        return h('section', {class: 'main-posts'}, h('article',{class:'all-posts'}, ...allPosts));
    }
}

