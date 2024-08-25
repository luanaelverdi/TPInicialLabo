import {navigateTo} from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Sumar Stock');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarProducto(await this.getProduct())
    }

    async getProduct () {
        const request = await fetch('/api/producto/'+this.params.id_producto);
        const response = await request.json();
        return response;
    }

    pintarProducto (producto) {
        const contenedor = document.getElementById('contenedor-producto');
        contenedor.innerHTML = JSON.stringify(producto);
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = 'Cantidad';

        const button = document.createElement('button');
        button.textContent = 'Enviar Orden de Compra';

        button.addEventListener('click', async () => {
            const value = input.value;
            const request = await fetch(`/api/compra/add/${this.params.id_producto}/${value}`, { method: 'PUT' });
            const response = await request.json();
            if (!response.ok) return alert(response.error.message);
            alert('Orden realizada con exito.');
        });

        contenedor.appendChild(input);
        contenedor.appendChild(button);
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1>REALIZAR ORDEN DE COMPRA</h1>
        <div id="contenedor-producto"></div>
    </div>
`;