import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Inicio');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.sendQR();
    }

    async sendQR () {
        const request = await fetch(`/api/qr/${this.params.id_usuario}/${this.params.id_producto}`, {method: "GET"});
        const response = await request.json();
        const title = document.getElementById('message');
        if (response.ok) {
            title.innerText = 'Ya puedes cerrar esta ventana.';
        } else {    
            title.innerText = 'Ha ocurrido un error.';
        }
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        <h1 id="message">POR FAVOR, ESPERA UN MOMENTO...</h1>
    </div>
`;