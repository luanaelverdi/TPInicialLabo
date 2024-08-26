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
        //contenedor.innerHTML = JSON.stringify(producto);
        const inputStock = document.createElement('input');
        inputStock.type = 'number';
        inputStock.setAttribute('class', 'form-control');
        inputStock.style.width= '30%';
        inputStock.style.marginBottom= '30px';
        
        const pStockActual = document.createElement('label');
        pStockActual.type ='text'; 
        pStockActual.setAttribute('class', 'form-label');
        pStockActual.innerHTML = 'Stock actual: ';
        const pStock = document.createElement('label');
        pStock.type ='text'; 
        pStock.setAttribute('class', 'form-label');
        pStock.innerHTML ='Stock a restar: '


        const inputStockActual = document.createElement('input');
        inputStockActual.type ='number'; 
        inputStockActual.setAttribute('class', 'form-control');
        inputStockActual.style.width= '30%';
        inputStockActual.setAttribute('readonly', 'true');
        inputStockActual.style.marginBottom= '30px';

        const button = document.createElement('button');
        button.textContent = 'Restar';
        button.setAttribute('class', 'btn btn-primary');

        inputStockActual.value = producto.stock;

        button.addEventListener('click', async () => {
            const value = inputStock.value;
            console.log(value)
            const request = await fetch(`/api/producto/${producto.id_producto}/restar/${value}`, { method: "DELETE" });
            const response = await request.json();
            if (!response.ok && response.error.code === "limite") {
                alert(response.error.message);
                return navigateTo(`/orden-compra/${producto.id_producto}`);
            }
            alert('Cantidad restada');
            window.location.reload();
        });

        contenedor.appendChild(pStockActual);
        contenedor.appendChild(inputStockActual);
        contenedor.appendChild(pStock);
        contenedor.appendChild(inputStock);
        contenedor.appendChild(button);

    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class ="text-start">RESTAR STOCK</h1>
        <div class = " form-control" id="contenedor-producto">
        </div>
    </div>
`;