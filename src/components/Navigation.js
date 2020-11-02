import Component from "../library/Component";
import h from "../library/hyperscript";

export default class Navigation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const newPostIcon = h('i', {
            class: "fas fa-plus-square header-ul-icons",
            click: () => this.props.route('newPost')                                                            // cia click naujam postui
        }, h('p', {class: 'header-li-text'}, 'Naujas įrašas'));

        const allPostsIcon = h('i', {
            class: "fas fa-clone header-ul-icons",
            click: () => {
                this.props.route('posts')
            }
        }, h('p', {class: 'header-li-text'}, 'Visi įrašai'));

        const logOut = h('i', {
            class: "fas fa-sign-out-alt header-ul-icons",
            click: () => {
                this.props.exit()
                localStorage.removeItem('user')
                // this.props.isLoggedIn(false)
            }
        }, h('p', {class: 'header-li-text'}, 'Atsijungti'));
        const liNewPostIcon = h('li', {class:'header-li'}, newPostIcon);
        const liAllPostIcon = h('li', {class:'header-li'}, allPostsIcon);
        const ulOne = h('ul', {class: 'header-ul'}, liNewPostIcon, liAllPostIcon);
        const ulTwo = h('ul', {class: 'header-ul'}, h('li', {class:'header-li'}, logOut));

        const nav = h('nav', {class: 'header-nav',}, ulOne, ulTwo);

        return h('header', {class: 'main-header'}, nav);
    }
}