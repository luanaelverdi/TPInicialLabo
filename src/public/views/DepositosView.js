import { navigateTo } from "../router.js";
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
        this.pintarDepositos(await this.getDepositos())
    }

    async getDepositos() {
        const request = await fetch('/api/depositos', { method: 'GET' });
        return await request.json();
    }

    async pintarDepositos(depositos) {
        const container = document.getElementById('contenedor-depositos');
        for (const deposito of depositos) {
            //buscar sus productos
            const productos = await this.getDepositoProductos(deposito.id_deposito);
            container.appendChild(this.elementoDeposito(deposito, productos));
        }
    }

    async getDepositoProductos(id_deposito) {
        const request = await fetch(`/api/depositos/${id_deposito}/productos`, { method: 'GET' });
        return await request.json();
    }

    elementoDeposito(deposito, productos) {
        const depositoContainer = document.createElement('div');
        depositoContainer.setAttribute('class', 'container');
        depositoContainer.setAttribute('id', 'container-deposito-datos');

        const depositoCard = document.createElement('div');
        depositoCard.setAttribute('class', 'card');

        const depositoDataContainer = document.createElement('div');
        depositoDataContainer.setAttribute('class', 'card-body');

        depositoDataContainer.innerHTML = `
            <h5 class="card-title">${deposito.nombre}</h5>
            <p class="card-text">Productos: </p>
            `;

        for (const producto of productos) {
            depositoDataContainer.innerHTML += "<li>" + producto.nombre_producto;
            depositoDataContainer.innerHTML += "----> Stock: " + producto.stock + "</li>";
            depositoDataContainer.innerHTML += "<br>";
        }

        depositoContainer.appendChild(depositoCard);
        depositoCard.appendChild(depositoDataContainer);

        return depositoContainer;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class = "text-center">Depositos</h1>
        <div id="contenedor-depositos"></div>
    </div>
`;