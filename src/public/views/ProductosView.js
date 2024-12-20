import { navigateTo } from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export let interval;

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Productos');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarProductos(await this.getProductos());
        this.polling();
    }

    async getProductos() {
        const request = await fetch('/api/productos', { method: 'GET' });
        return await request.json();
    }

    pintarProductos(productos) {
        const container = document.getElementById('container-productos');
        for (const producto of productos) {
            container.appendChild(this.elementoProducto(producto));
        }
    }

    elementoProducto(producto) {
        const productoContainer = document.createElement('div');
        productoContainer.setAttribute('class', 'col-xs-12 col-sm-6 col-md-4 col-xl-3');

        const productoCard = document.createElement('div');
        productoCard.setAttribute('class', 'card');

        const productoQRContainer = document.createElement('div');
        productoQRContainer.setAttribute('class', 'card-img-top');
        productoQRContainer.style.marginLeft='30%'
        productoQRContainer.style.marginTop='5%'

        const productoDataContainer = document.createElement('div');
        productoDataContainer.setAttribute('class', 'card-body');

        productoDataContainer.innerHTML = `
            <h5 class="card-title">${producto.nombre_producto}</h5>
            <a href="/producto/${producto.id_producto}" id= "btn_modificar" class="btn btn-primary" data-link>MODIFICAR</a>
        `;

        const botonEliminar = document.createElement('a');
        botonEliminar.setAttribute('class', 'btn btn-primary');
        botonEliminar.textContent = 'ELIMINAR';
        botonEliminar.addEventListener('click', async (e) => {
            e.preventDefault();
            const req = await fetch(`/api/producto/${producto.id_producto}/eliminar`, { method: 'DELETE' });
            const res = await req.json();
            if (!res.ok) return alert(res.error.message);
            alert('Producto Eliminado.');
            productoContainer.remove();
        });
        productoDataContainer.appendChild(botonEliminar);

        this.generarQR(productoQRContainer, `/qr/user/${window.app.user.credenciales.id}/producto/${producto.id_producto}`);
        productoContainer.appendChild(productoCard);
        productoCard.appendChild(productoQRContainer);
        productoCard.appendChild(productoDataContainer);

        return productoContainer;
    }

    generarQR(contenedor, path) {
        new QRCode(contenedor, {
            text: window.app.host + path,
            width: 128,
            height: 128,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    polling() {
        interval = setInterval(async () => {
            const request = await fetch('/api/poll/' + window.app.user.credenciales.id);
            const response = await request.json();
            const id = response.credenciales.qr.id_producto;
            if (id) {
                navigateTo('/restar-producto/' + id);
                return clearInterval(interval);
            }
        }, 3000);
    }
}


const VIEW_CONTENT = `
    <div class="container-view">
        ${TEMPLATE_NAVIGATION}
        <ul class="nav nav-tabs">
        <li class="nav-item m-2">
        <button class="btn btn-outline-success" >Añadir Producto</button>
        <button class="btn btn-outline-success" >Generar Orden de Compra</button>
        </li>
            <li class="nav-item m-2">
            <input class="form-control me-2" type="search" placeholder="Ingrese nombre">
         </li>
        <li class="nav-item m-2">
            <button class="btn btn-outline-success" >Buscar</button>
        </li>
        </ul>
        <div class="text-center">
            <div class="row gx-3 gy-3 m-2" id="container-productos">

            </div>
        </div>
    </div>
`;

