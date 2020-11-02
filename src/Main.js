import {loginFromToken} from "./login";
import h from "./library/hyperscript";
import Component from "./library/Component";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import Navigation from "./components/Navigation";


export default class Main extends Component {
    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            route: "login",
            user: {},
            navigationLinks: ["Home", "Login", "Register"]
        }
        this.login()
    }

    login() {
        const user = loginFromToken()
        if (user) {
            this.state.user = user;
            this.state.isLoggedIn = true;
            this.state.route = "posts";
        }
    }

    changeRoute = (routeName) => {
        this.setState({route: routeName});
    }
    setUser = (user) => {
        this.setState({isLoggedIn: user});
    }
    logInUser = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.setState({user: user, route: "posts", isLoggedIn: true})
    }
    logout = () => {
        localStorage.removeItem('user');
        this.setState({isLoggedIn: false, route: 'login'});
    }

    render() {
        if (this.state.isLoggedIn) {
            return h('main', {},
                h(Navigation, {
                    route: this.changeRoute,
                    setLoggedIn: this.setUser,
                    exit: this.logout
                }),
                this.state.route === 'newPost' ? h(NewPost,{route: this.changeRoute}) : h(Posts,{route: this.changeRoute})
            );
        }
        if (this.state.route === "register") {
            return h(Register, {route: this.changeRoute});
        }
        if (this.state.route === "login") {
            return h(Login, {route: this.changeRoute, setLoggedIn: this.setUser, logInUser: this.logInUser});
        }
    }
}