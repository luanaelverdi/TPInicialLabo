import {navigateTo} from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Restar Stock');
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

        const button = document.createElement('button');
        button.textContent = 'Restar';

        button.addEventListener('click', async () => {
            const value = input.value;
            const request = await fetch(`/api/producto/${producto.id_producto}/restar/${value}`, { method: "DELETE" });
            const response = await request.json();
            if (!response.ok && response.error.code === "limite") {
                alert(response.error.message);
                return navigateTo(`/orden-compra/${producto.id_producto}`);
            }
            alert('Cantidad restada');
            window.location.reload();
        });

        contenedor.appendChild(input);
        contenedor.appendChild(button);
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1>RESTAR STOCK</h1>
        <div id="contenedor-producto"></div>
    </div>
`;