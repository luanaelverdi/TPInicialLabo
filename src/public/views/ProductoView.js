import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Producto');
    } 

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        //this.pintarProducto(JSON.stringify(await this.getProduct()));
        this.pintarProducto(await this.getProduct())
    }

    async getProduct () {
        const request = await fetch('/api/producto/'+this.params.id_producto);
        const response = await request.json();
        return response;
    }

    pintarProducto (producto) {
        const contenedor = document.getElementById('contenedor-producto');
        contenedor.appendChild(this.elementoProducto(producto));
    }

    elementoProducto(producto){
        const productoContainer = document.createElement('div');
        productoContainer.setAttribute('class', 'container');
        productoContainer.setAttribute('id', 'container-producto-datos');

        const productoCard = document.createElement('div');
        productoCard.setAttribute('class', 'card');

        const productoDataContainer = document.createElement('div');
        productoDataContainer.setAttribute('class', 'card-body');

        productoDataContainer.innerHTML = `
            <h5 class="card-title">${producto.nombre_producto}</h5>
            <p class="card-text">Codigo: <input type='number' placeholder= '${producto.codigo}' ></p>
            <p class="card-text">ID: <input type='number' placeholder= ' ${producto.id_producto}' </p>
            <p class="card-text">Descripcion: <input type='number' placeholder= '${producto.desc_producto} '</p>
            <p class="card-text">Cantidad de stock actual: <input type='number' placeholder= ' ${producto.stock}' </p>
            <p class="card-text">Cantidad de stock minimo: <input type='number' placeholder= '${producto.stock_minimo}'</p>
            <p class="card-text">Categoria: <input type='number' placeholder= ' ${producto.id_categoria}' </p>
            <button type="submit" class="btn btn-primary" id='boton-guardar-modificar'>Guardar</button>

            `;

        productoContainer.appendChild(productoCard);
        productoCard.appendChild(productoDataContainer);

        return productoContainer;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class= "text-center">Datos del producto</h1>
        <div id="contenedor-producto">
        </div>
    </div>
`;