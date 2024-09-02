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
        await this.getDeposito();
        this.pintarProducto(await this.getProduct())
    }

    async getProduct () {
        const request = await fetch('/api/producto/'+this.params.id_producto);
        const response = await request.json();
        return response;
    }

    async getDeposito () {
        const request = await fetch('/api/deposito/'+this.params.id_deposito);
        const response = await request.json();
        this.deposito = response;
       // return response;
    }

    pintarProducto (producto) {
        const contenedor = document.getElementById('contenedor-producto');
       
        const label_nombreDeposito = document.createElement('label');
        label_nombreDeposito.setAttribute('class', "form-label");
        label_nombreDeposito.textContent = "Deposito: ";
        label_nombreDeposito.innerHTML += `${this.deposito.nombre}`;
       
        contenedor.appendChild(label_nombreDeposito);
        contenedor.innerHTML += "<br><br>";

        const input = document.createElement('input');
        input.setAttribute('class', 'form-label')
        input.type = 'number';
        input.placeholder = 'Cantidad';

        const button = document.createElement('button');
        button.setAttribute('class', 'btn btn-primary');
        button.textContent = 'Enviar Orden de Compra';

        button.addEventListener('click', async () => {
            const value = input.value;
            const request = await fetch(`/api/compra/add/${this.params.id_producto}/${this.params.id_deposito}/${value}`, { method: 'PUT' });
            const response = await request.json();
            if (!response.ok) return alert(response.error.message);
            alert('Orden realizada con exito.');
            window.location.reload();
        });

        contenedor.appendChild(input);
        contenedor.innerHTML += "<br><br>";

        contenedor.appendChild(button);
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1>REALIZAR ORDEN DE COMPRA</h1>
        <div id="contenedor-producto" style="padding-left:30px;"></div>
    </div>
`;