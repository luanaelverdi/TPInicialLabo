import AbstractView from "./AbstractView.js";
import {TEMPLATE_NAVIGATION} from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Login');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        ${TEMPLATE_NAVIGATION}
        <div id="contenedor-login"></div>
    </div>
`;