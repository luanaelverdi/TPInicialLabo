import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Insertar Producto');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.eventos();
    }

    eventos () {
        this.EventoEnviarFormulario();
    }

    EventoEnviarFormulario () {
        const formulario = document.getElementById('formulario-insertar-producto');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.EnviarDatos();
        });
    }

    async EnviarDatos () {
        const inputCodigo = document.getElementById('codigo');
        const inputNombre = document.getElementById('nombre');
        const inputDesc = document.getElementById('descripcion');
        const inputStockMin = document.getElementById('stockMinimo');
        const inputIdCat = document.getElementById('idCategoria');

        const cod = inputCodigo.value;
        const nom = inputNombre.value;
        const des = inputDesc.value;
        const smin = inputStockMin.value;
        const idcat = inputIdCat.value;

        const request = await fetch('/api/producto/add', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                producto: {
                    codigo: cod,
                    nombre: nom,
                    descripcion: des,
                    stock_minimo: smin,
                    id_categoria: idcat
                }
            })
        });
        const response = await request.json();
        if (!response.ok) return alert(response.error.message);
        alert('Producto Insertado.');
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        ${TEMPLATE_NAVIGATION}
        <div id="contenedor-view">
            <div class="container mt-5">
                <h1 class="text-center">Crear Producto</h1>
                <form id="formulario-insertar-producto">
                    <div class="mb-3">
                        <label for="codigo" class="form-label">Código del Producto</label>
                        <input type="text" class="form-control" id="codigo" placeholder="Ingrese el código" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre del Producto</label>
                        <input type="text" class="form-control" id="nombre" placeholder="Ingrese el nombre" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="descripcion" class="form-label">Descripción</label>
                        <textarea class="form-control" id="descripcion" rows="3" placeholder="Ingrese la descripción" required></textarea>
                    </div>
                    
                    <div class="mb-3">
                        <label for="stockMinimo" class="form-label">Stock Mínimo</label>
                        <input type="number" class="form-control" id="stockMinimo" placeholder="Ingrese el stock mínimo" min="1" required>
                    </div>
                    
                    <div class="mb-3">
                        <label for="idCategoria" class="form-label">ID de Categoría</label>
                        <input type="number" class="form-control" id="idCategoria" placeholder="Ingrese el ID de la categoría" required>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Crear Producto</button>
                </form>
            </div>
        </div>
    </div>
`;