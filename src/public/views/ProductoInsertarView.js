import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Insertar Producto');
        this.checkboxes = [];
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;

        this.getCategorias();

        this.getDepositos();
        

        this.eventos();
    }

    async getCategorias() {
        const request = await fetch('/api/categorias', {
            method: "GET",
        });
        const opcionesCat = await request.json();

        const select = document.getElementById('id_select');

        var optionElement = document.createElement('option');
        
        optionElement.value = 0;
        optionElement.textContent = "Seleccione"; // Texto mostrado
        select.appendChild(optionElement);

        // Añadir las opciones al select
        opcionesCat.forEach(function (opcion) {
            var optionElement = document.createElement('option');
           
            optionElement.value = opcion.id_categoria;
            optionElement.textContent = opcion.nombre; // Texto mostrado
            select.appendChild(optionElement);
        });
    }

    async getDepositos() {
        const request = await fetch('/api/depositos', {
            method: "GET",
        });
        const depositos = await request.json();

        this.createCkeckBoxes(depositos);
    } 

    createCkeckBoxes(opciones) {
        var divPrinc = document.getElementById('depositos_checks');
        this.checkboxes = [];

        opciones.forEach( (opcion) =>  {
            // Crear un contenedor para cada opción
            var div = document.createElement('div');

            // Crear el elemento checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'opciones'; // Todos los checkboxes con el mismo nombre para agruparlos
            checkbox.value = opcion.id_deposito;  // Valor de cada opción

            // Crear una etiqueta para el checkbox
            var label = document.createElement('label');
            label.textContent = opcion.nombre;

            // Añadir el checkbox y la etiqueta al contenedor
            this.checkboxes.push(checkbox);
            div.appendChild(checkbox);
            div.appendChild(label);

            // Añadir el contenedor al formulario
            divPrinc.appendChild(div);
        });
    }

    eventos() {
        this.EventoEnviarFormulario();
    }

    EventoEnviarFormulario() {
        const formulario = document.getElementById('formulario-insertar-producto');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.EnviarDatos();
        });
    }

    async EnviarDatos() {
        const inputCodigo = document.getElementById('codigo');
        const inputNombre = document.getElementById('nombre');
        const inputDesc = document.getElementById('descripcion');
        const inputStockMin = document.getElementById('stockMinimo');
        const inputIdCat = document.getElementById('id_select');

        const checksMarcados = this.checkboxes.filter(check => check.checked)
        if (checksMarcados.length <= 0) {
            return alert("Debe seleccionar un Deposito.")
        }
        const idDeps = checksMarcados.map(check => check.value);

        const cod = inputCodigo.value;
        const nom = inputNombre.value;
        const des = inputDesc.value;
        const smin = inputStockMin.value;
        const idcat = inputIdCat.value;

        //limpiar formulario
        const formulario = document.getElementById("formulario-insertar-producto");
        formulario.reset();

        const request = await fetch('/api/producto/add', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                producto: {
                    codigo: cod,
                    nombre: nom,
                    descripcion: des,
                    stock_minimo: smin,
                    id_categoria: idcat,
                    depositos: idDeps
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
                        <label for="idCategoria" class="form-label">Categoría</label>
                        <select id = "id_select">  </select>
                    </div>

                    <div class="mb-3" id = "depositos_checks">
                        <label for="idCategoria" class="form-label">Depositos</label>
                        
                    </div>

                    <button type="submit" class="btn btn-primary">Crear Producto</button>
                </form>
            </div>
        </div>
    </div>
`;