import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Depositos');
    } 

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1>Depositos</h1>
        <div id="contenedor-depositos"></div>
    </div>
`;