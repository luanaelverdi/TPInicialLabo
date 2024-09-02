import { navigateTo } from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Categorias');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarCategorias(await this.getCategorias())
    }

    async getCategorias() {
        const request = await fetch('/api/categorias', { method: 'GET' });
        return await request.json();
    }

    pintarCategorias(categorias) {
        const container = document.getElementById('contenedor-categorias');
        for (const categoria of categorias) {
            container.appendChild(this.elementoCategoria(categoria));
        }
    }

    elementoCategoria(categoria) {
        const categoriaContainer = document.createElement('div');
        categoriaContainer.setAttribute('class', 'container');
        categoriaContainer.setAttribute('id', 'container-deposito-datos');

        const categoriaCard = document.createElement('div');
        categoriaCard.setAttribute('class', 'card');

        const categoriaDataContainer = document.createElement('div');
        categoriaDataContainer.setAttribute('class', 'card-body');

        categoriaDataContainer.innerHTML = `
            <h5 class="card-title">Nombre: ${categoria.nombre}</h5>
            <a href="/categoria/${categoria.id_categoria}" id= "btn_modificar" class="btn btn-primary" data-link>MODIFICAR</a>
            `;

        const botonEliminar = document.createElement('a');
        botonEliminar.setAttribute('class', 'btn btn-primary');
        botonEliminar.textContent = 'ELIMINAR';
        botonEliminar.addEventListener('click', async (e) => {
            e.preventDefault();
            const req = await fetch(`/api/categoria/${categoria.id_categoria}/eliminar`, { method: 'DELETE' });
            const res = await req.json();
            if (!res.ok) return alert(res.error.message);
            alert('Categoria Eliminada.');
            categoriaContainer.remove();
        });
        categoriaDataContainer.appendChild(botonEliminar);

        categoriaContainer.appendChild(categoriaCard);
        categoriaContainer.appendChild(categoriaDataContainer);

        return categoriaContainer;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class = "text-center">Categorias</h1>
        <div id="contenedor-categorias"></div>
    </div>
`;