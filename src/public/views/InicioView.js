import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Inicio');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        <h1>INICIO</h1>
        ${TEMPLATE_NAVIGATION}
    </div>
`;