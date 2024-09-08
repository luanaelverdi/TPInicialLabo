import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Producto');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        this.pintarProducto(await this.getProduct())
        this.asignarDatos(await this.getProduct())
        this.eventos()
    }

    eventos() {
        this.EventoEnviarFormulario();
    }

    EventoEnviarFormulario() {
        const formulario = document.getElementById('formulario-modificar-producto');
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
            this.EnviarDatos();
        });
    }

    async getProduct() {
        const request = await fetch('/api/producto/' + this.params.id_producto);
        const response = await request.json();
        this.producto = response;
        return response;
    }

    pintarProducto(producto) {
        const formulario = document.getElementById('formulario-modificar-producto');
        formulario.appendChild(this.elementoProducto(producto));

        const botonGuardar = document.createElement('button');
        botonGuardar.setAttribute('class', 'btn btn-primary');
        botonGuardar.setAttribute('id', 'boton-guardar-modificar');
        botonGuardar.textContent = 'Guardar';
        botonGuardar.style.position = 'absolute';
        botonGuardar.style.bottom = '85px';
        botonGuardar.style.left = '70%';
        botonGuardar.style.transform = 'translateX(-25%)';
        botonGuardar.style.height = '10%';
        botonGuardar.style.width = '10%';
        botonGuardar.style.fontSize = '20px';
        formulario.appendChild(botonGuardar);

    }

    elementoProducto(producto) {
        const productoContainer = document.createElement('div');
        productoContainer.setAttribute('class', 'container mt-5');
        productoContainer.setAttribute('id', 'container-producto-datos');

        const productoCard = document.createElement('div');
        productoCard.setAttribute('class', 'card');

        const productoDataContainer = document.createElement('div');
        productoDataContainer.setAttribute('class', 'card-body');

        productoDataContainer.innerHTML = `
            <div class="mb-3">
                <label class="card-text">Nombre: <input type='text' id = 'nombre' placeholder= '${producto.nombre_producto}' ></label>
             </div>

            <div class="mb-3">
                <p class="card-text">Codigo: <input type='text' id = 'codigo' placeholder= '${producto.codigo}' ></p>  
            </div>

            <div class="mb-3" style = "display: flex;flex-direction: column;gap: 5px;">
               <label class="card-text">Descripción: </label>
                <textarea id = 'descripcion' placeholder= '${producto.desc_producto}' class="card-text" style="resize: none;"></textarea>
            </div>

            <div class="mb-3">
                 <p class="card-text">Cantidad de stock minimo: <input type='number' id = 'stockMinimo' placeholder= '${producto.stock_minimo}'</p>
            </div>

            <span class="card-text"><input type='number' id = 'idProducto'></span>
           
            `;

        this.pintarCategorias(productoDataContainer);
        this.pintarDepositos(productoDataContainer);

        productoContainer.appendChild(productoCard);
        productoCard.appendChild(productoDataContainer);

        return productoContainer;
    }

    async pintarCategorias(productoDataContainer) {
        const request = await fetch('/api/categorias', {
            method: "GET",
        });
        const opcionesCat = await request.json();

        const label_cat = document.createElement('label');
        label_cat.setAttribute("class", "form-label")
        label_cat.textContent = "Categoria: ";

        const select = document.createElement('select');
        select.id = "select_categoria"

        var optionElement = document.createElement('option');

        optionElement.value = 0;
        optionElement.textContent = "Seleccione";
        select.appendChild(optionElement);

        opcionesCat.forEach(function (opcion) {
            var optionElement = document.createElement('option');

            optionElement.value = opcion.id_categoria;
            optionElement.textContent = opcion.nombre;
            select.appendChild(optionElement);
        });

        productoDataContainer.appendChild(label_cat);
        productoDataContainer.appendChild(select);

        select.value = this.producto.id_categoria;
    }

    async pintarDepositos(productoDataContainer) {
        const request = await fetch('/api/depositos', {
            method: "GET",
        });
        const depositos = await request.json();

        this.createCkeckBoxes(depositos, productoDataContainer);
    }

    async createCkeckBoxes(opciones, productoDataContainer) {
        this.checkboxes = [];

        const div_dep = document.createElement('div');
        const label_dep = document.createElement('label');
        label_dep.setAttribute("class", "form-label")
        label_dep.textContent = "Depositos: ";
        div_dep.appendChild(label_dep)
        productoDataContainer.appendChild(div_dep);

        opciones.forEach((opcion) => {
            var div = document.createElement('div');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'opciones'; // Todos los checkboxes con el mismo nombre para agruparlos
            checkbox.value = opcion.id_deposito;

            var label = document.createElement('label');
            label.textContent = opcion.nombre;
            label.style.marginLeft = "10px"

            this.checkboxes.push(checkbox);
            div.appendChild(checkbox);
            div.appendChild(label);

            productoDataContainer.appendChild(div);
        });

        //tildar los que estan en almacenamiento
        const request2 = await fetch(`/api/producto/${this.producto.id_producto}/depositos`, {
            method: "GET",
        });
        const depositosProducto = await request2.json();

        for (const dep of depositosProducto) {
            const check = this.checkboxes.find(check => check.value == dep.id_deposito)
            check.checked = true;
        }

        this.pintarStocks(productoDataContainer, depositosProducto)
    }

    async pintarStocks(productoDataContainer, depositosProducto) {
        const div_stock = document.createElement("div")

        for (const dep of depositosProducto) {
            const label_stock = document.createElement("label")
            label_stock.setAttribute("class", "form-label")

            label_stock.textContent = `Cantidad Stock en ${dep.nombre}: ${dep.stock}`

            div_stock.appendChild(label_stock)
            div_stock.innerHTML += "<br>";
        }
        productoDataContainer.appendChild(div_stock);
    }

    asignarDatos(producto) {
        const inputCodigo = document.getElementById('codigo');
        inputCodigo.value = producto.codigo;

        const inputNombre = document.getElementById('nombre');
        inputNombre.value = producto.nombre_producto;

        const inputDesc = document.getElementById('descripcion');
        inputDesc.value = producto.desc_producto;

        const inputStockMin = document.getElementById('stockMinimo');
        inputStockMin.value = producto.stock_minimo;

        const inputIdProd = document.getElementById('idProducto');
        inputIdProd.value = producto.id_producto;
        inputIdProd.style.display = 'none';

    }

    async EnviarDatos() {
        const inputCodigo = document.getElementById('codigo');
        const inputNombre = document.getElementById('nombre');
        const inputDesc = document.getElementById('descripcion');
        const inputStockMin = document.getElementById('stockMinimo');
        const inputIdCat = document.getElementById('select_categoria');
        const inputIdProducto = document.getElementById('idProducto');

        const cod = inputCodigo.value;
        const nom = inputNombre.value;
        const des = inputDesc.value;
        const smin = inputStockMin.value;
        const idcat = inputIdCat.value;
        const idprod = inputIdProducto.value;

        const checksMarcados = this.checkboxes.filter(check => check.checked)
        if (checksMarcados.length <= 0) {
            return alert("Debe seleccionar un Deposito.")
        }
        const idDeps = checksMarcados.map(check => check.value);

        const request = await fetch('/api/producto/modificar', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                producto: {
                    id_producto: idprod,
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

        if (!response.ok && response.error.id_error && response.error.id_error == "stockDeposito") {
            alert(response.error.message);
        } else {
            if (!response.ok) return alert(response.error.message);
        }

        alert('Producto Modificado.');
        window.location.reload();
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class= "text-center">Modificar Producto </h1>
            <form id="formulario-modificar-producto">
            </form> 
    </div>
`;