import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Depositos');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarDeposito(await this.getDeposito())
    }

    async getDeposito() {
        const request = await fetch('/api/deposito/' + this.params.id_deposito);
        const response = await request.json();
        return response;
    }

    pintarDeposito(deposito) {
        const contenedor = document.getElementById('contenedor-producto');
        contenedor.appendChild(this.elementoDeposito(deposito));
    }

    elementoDeposito(deposito) {
        const depositoContainer = document.createElement('div');
        depositoContainer.setAttribute('class', 'container');
        depositoContainer.setAttribute('id', 'container-deposito-datos');

        const depositoCard = document.createElement('div');
        depositoCard.setAttribute('class', 'card');

        const depositoDataContainer = document.createElement('div');
        depositoDataContainer.setAttribute('class', 'card-body');

        depositoDataContainer.innerHTML = `
            <h5 class="card-title">${deposito.nombre}</h5>
            <p class="card-text">HOLA</p>
            `;

        depositoContainer.appendChild(depositoCard);
        depositoCard.appendChild(depositoDataContainer);

        return depositoContainer;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1>Depositos</h1>
        <div id="contenedor-depositos"></div>
    </div>
`;