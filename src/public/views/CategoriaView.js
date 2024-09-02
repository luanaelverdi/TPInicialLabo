import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Categoria');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarCategoria(await this.getCategoria());
        this.asignarDatos();
        this.eventos()
    }

    eventos() {
        this.EventoEnviarFormulario();
    }

    EventoEnviarFormulario() {
        const formulario = document.getElementById('form-categoria');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.EnviarDatos();
        });
    }

    async getCategoria() {
        const request = await fetch('/api/categoria/' + this.params.id_categoria);
        const response = await request.json();
        this.categoria = response;
        return response;
    }

    pintarCategoria(categoria) {
        const formulario = document.getElementById('form-categoria');
        formulario.appendChild(this.elementoDeposito(categoria));
    }

    elementoDeposito(categoria) {
        const categoriaContainer = document.createElement('div');
        categoriaContainer.setAttribute('class', 'container');
        categoriaContainer.setAttribute('id', 'container-deposito-datos');

        const categoriaCard = document.createElement('div');
        categoriaCard.setAttribute('class', 'card');

        const categoriaDataContainer = document.createElement('div');
        categoriaDataContainer.setAttribute('class', 'card-body');

        categoriaDataContainer.innerHTML = `
            <h5 class="card-text"> ID:  ${categoria.id_categoria}</h5>
            <h5 class="card-text">Nombre: <input type='text' id = 'nombre' placeholder= '${categoria.nombre}' ></h5>
            <button class = 'btn btn-primary' id = 'btn_guardar' type = 'submit'> Guardar </button>
            `;

        categoriaContainer.appendChild(categoriaCard);
        categoriaCard.appendChild(categoriaDataContainer);

        return categoriaContainer;
    }

    async asignarDatos() {
        const input_nombre = document.getElementById("nombre");
        input_nombre.value = this.categoria.nombre;
    }

    async EnviarDatos() {
        const inputNombre = document.getElementById('nombre');
        const nom = inputNombre.value;

        console.log(nom);
        const request = await fetch('/api/categoria/modificar', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                categoria: {
                    id_categoria: this.categoria.id_categoria,
                    nombre: nom
                }
            })
        });
        const response = await request.json();

        if (!response.ok) return alert(response.error.message);

        alert('Categoria Modificada');
        window.location.reload();
    }

}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class = "text-center">Categoria</h1>
        <form id="form-categoria"></form>
    </div>
`;