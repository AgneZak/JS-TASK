import './scss/main.scss'
import './scss/main.scss'
import {mount} from "./library/mount";
import h from "./library/hyperscript";
import Main from "./Main";


const root = document.getElementById('kibiras');

mount(h(Main),root);