import { navigateTo } from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Restar Stock');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarProducto(await this.getProduct())
    }

    async getProduct() {
        const request = await fetch('/api/producto/' + this.params.id_producto);
        const response = await request.json();
        this.producto = response;
        return response;
    }

    async pintarProducto(producto) {
        const contenedor = document.getElementById('contenedor-producto');

        const nombreProducto = document.createElement('h3');
        nombreProducto.innerHTML = "[" + producto.codigo + "] " + producto.nombre_producto;

        contenedor.appendChild(nombreProducto);

        const stockMinimoProducto = document.createElement('h5');
        stockMinimoProducto.innerHTML = "Stock Minimo: " + producto.stock_minimo;

        contenedor.appendChild(stockMinimoProducto);
        contenedor.innerHTML += '<br>';

        //select de depositos
        await this.agregarSelectDeposito(contenedor);

        const inputStock = document.createElement('input');
        inputStock.type = 'number';
        inputStock.setAttribute('class', 'form-control');
        inputStock.style.width = '30%';
        inputStock.style.marginBottom = '30px';

        const pStockActual = document.createElement('label');
        pStockActual.type = 'text';
        pStockActual.setAttribute('class', 'form-label');
        pStockActual.innerHTML = 'Stock actual: ';
        const pStock = document.createElement('label');
        pStock.type = 'text';
        pStock.setAttribute('class', 'form-label');
        pStock.innerHTML = 'Stock a restar: '

        const inputStockActual = document.createElement('input');
        this.inputStockActual = inputStockActual;
        inputStockActual.type = 'number';
        inputStockActual.setAttribute('class', 'form-control');
        inputStockActual.style.width = '30%';
        inputStockActual.setAttribute('readonly', 'true');
        inputStockActual.style.marginBottom = '30px';

        const button = document.createElement('button');
        button.textContent = 'Restar';
        button.setAttribute('class', 'btn btn-primary');

        inputStockActual.value = producto.stock;

        const selectDeposito = document.getElementById("select_deposito");

        button.addEventListener('click', async () => {
            const value = inputStock.value;
            if (selectDeposito.value <= 0) return alert("Debe seleccionar un deposito.");
            const request = await fetch(`/api/producto/${producto.id_producto}/deposito/${selectDeposito.value}/restar/${value}`, { method: "DELETE" });
            const response = await request.json();

            if (!response.ok && response.error.code === "limite") {
                alert(response.error.message);
                return navigateTo(`/orden-compra/${producto.id_producto}/${selectDeposito.value}`);
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

    async agregarSelectDeposito(contenedor) {
        const request = await fetch(`/api/producto/${this.producto.id_producto}/depositos`, {
            method: "GET",
        });
        const opcionesDep = await request.json();
        const label_deposito = document.createElement('label');

        label_deposito.setAttribute("class", "form-label")
        label_deposito.textContent = "Depositos: ";
        label_deposito.style.marginRight = "10px"
        contenedor.appendChild(label_deposito);

        const select = document.createElement('select');
        select.id = "select_deposito"

        var optionElement = document.createElement('option');

        optionElement.value = 0;
        optionElement.textContent = "Seleccione";
        select.appendChild(optionElement);

        opcionesDep.forEach((opcion) => {
            var optionElement = document.createElement('option');

            optionElement.value = opcion.id_deposito;
            optionElement.textContent = opcion.nombre;

            select.appendChild(optionElement);
        });

        contenedor.appendChild(select)
        contenedor.innerHTML += "<br>";

        document.querySelector('#select_deposito').addEventListener('change', (e) => {
            if (e.target.value == 0) return;
            this.inputStockActual.value = opcionesDep.find(dep => dep.id_deposito == e.target.value).stock;
        });
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class ="text-start">RESTAR STOCK </h1>
        <div class = " form-control" id="contenedor-producto">
        </div>
    </div>
`;