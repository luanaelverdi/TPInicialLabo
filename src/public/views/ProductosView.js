import {navigateTo} from "../router.js";
import AbstractView from "./AbstractView.js";
import {TEMPLATE_NAVIGATION} from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Productos');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarProductos(await this.getProductos());
        this.polling();
    }

    async getProductos () {
        const request = await fetch('/api/productos', { method: 'GET' });
        return await request.json();
    }

    pintarProductos (productos) {
        const container = document.getElementById('container-productos');
        for (const producto of productos) {
            container.appendChild(this.elementoProducto(producto));
        }
    }

    elementoProducto (producto) {
        const productoContainer = document.createElement('div');
        productoContainer.setAttribute('class', 'col-xs-12 col-sm-6 col-md-4 col-xl-3');

        const productoCard = document.createElement('div');
        productoCard.setAttribute('class', 'card');

        const productoQRContainer = document.createElement('div');
        productoQRContainer.setAttribute('class', 'card-img-top');

        const productoDataContainer = document.createElement('div');
        productoDataContainer.setAttribute('class', 'card-body');

        productoDataContainer.innerHTML = `
            <h5 class="card-title">${producto.nombre_producto}</h5>
            <a href="/productos/${producto.id_producto}" class="btn btn-primary" data-link>MAS INFO</a>
        `;

        this.generarQR(productoQRContainer, `/qr/user/${window.app.user.credenciales.id}/producto/${producto.id_producto}`);
        productoContainer.appendChild(productoCard);
        productoCard.appendChild(productoQRContainer);
        productoCard.appendChild(productoDataContainer);
        return productoContainer;
    }

    generarQR (contenedor, path) {    
        new QRCode(contenedor, {
            text: window.app.host + path,
            width: 128,
            height: 128,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }

    polling () {
        const interval = setInterval(async () => {
            const request = await fetch('/api/poll/'+window.app.user.credenciales.id);
            const response = await request.json();
            const id = response.credenciales.qr.id_producto;
            if (id) {
                navigateTo('/restar-producto/'+id);
                return clearInterval(interval);
            }
        }, 3000);
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        <h1>PRODUCTOS</h1>
        ${TEMPLATE_NAVIGATION}
        <div class="container text-center">
            <div class="row gx-3 gy-3" id="container-productos">

            </div>
        </div>
    </div>
`;