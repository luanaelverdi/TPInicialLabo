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
        //this.pintarProducto(JSON.stringify(await this.getProduct()));
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
        return response;
    }

    async getCategorias(id_categoria) {
        const request = await fetch('/api/producto/' + id_categoria);
        const response = await request.json();
        return response;
    }

    async getDeposito(id_deposito) {
        const request = await fetch('/api/producto/' + id_deposito);
        const response = await request.json();
        return response;
    }

    pintarProducto(producto) {
        const formulario = document.getElementById('formulario-modificar-producto');
        formulario.appendChild(this.elementoProducto(producto));

        const botonGuardar = document.createElement('button');
        botonGuardar.setAttribute('class', 'btn btn-primary');
        botonGuardar.setAttribute('id', 'boton-guardar-modificar');
        botonGuardar.textContent = 'Guardar';
        //  botonGuardar.style.alignContent = 'center';
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
                <p class="card-text">Nombre: <input type='text' id = 'nombre' placeholder= '${producto.nombre_producto}' ></p>
             </div>

            <div class="mb-3">
                <p class="card-text">Codigo: <input type='text' id = 'codigo' placeholder= '${producto.codigo}' ></p>  
            </div>

            <div class="mb-3">
               <p class="card-text">Descripcion: <input type='text' id = 'descripcion' placeholder= '${producto.desc_producto} '</p>
            </div>

            <div class="mb-3">
                 <p class="card-text">Cantidad de stock actual: '${producto.stock}' </p>
            </div>

            <div class="mb-3">
                 <p class="card-text">Cantidad de stock minimo: <input type='number' id = 'stockMinimo' placeholder= '${producto.stock_minimo}'</p>
            </div>

            <div class="mb-3">
                <p class="card-text">Categoria: <input type='number' id = 'idCategoria' placeholder= ' ${producto.id_categoria}' </p>
            </div>

            <span class="card-text"><input type='number' id = 'idProducto' </span>
           
            `;

        //llamado a la api para que me traiga las categorias (id_categoria, nombre)        
        var opcionesCat = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];

        const select = document.createElement('select');

        // Añadir las opciones al select
        opcionesCat.forEach(function(opcion) {
            var optionElement = document.createElement('option');
            optionElement.value = opcion.toLowerCase().replace(/\s+/g, ''); // Valor para la opción
            optionElement.textContent = opcion; // Texto mostrado
            select.appendChild(optionElement);
        });

        productoDataContainer.appendChild(select);

        //llamado a la api para que me traiga los depositos (id_deposito, nombre)
        var opciones = ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4'];
        opciones.forEach(function (opcion) {
            // Crear un contenedor para cada opción
            var div = document.createElement('div');

            // Crear el elemento checkbox
            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.name = 'opciones'; // Todos los checkboxes con el mismo nombre para agruparlos
            checkbox.value = opcion;  // Valor de cada opción

            // Crear una etiqueta para el checkbox
            var label = document.createElement('label');
            label.textContent = opcion;

            // Añadir el checkbox y la etiqueta al contenedor
            div.appendChild(checkbox);
            div.appendChild(label);

            // Añadir el contenedor al formulario
            productoDataContainer.appendChild(div);
        });

        // Agregar el select al formulario
       // productoDataContainer.appendChild(selectMultiple);
        productoContainer.appendChild(productoCard);
        productoCard.appendChild(productoDataContainer);


        return productoContainer;
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

        const inputIdCat = document.getElementById('idCategoria');
        inputIdCat.value = producto.id_categoria;

        const inputIdProd = document.getElementById('idProducto');
        inputIdProd.value = producto.id_producto;
        inputIdProd.style.display = 'none';

    }

    //aca
    async EnviarDatos() {
        const inputCodigo = document.getElementById('codigo');
        const inputNombre = document.getElementById('nombre');
        const inputDesc = document.getElementById('descripcion');
        const inputStockMin = document.getElementById('stockMinimo');
        const inputIdCat = document.getElementById('idCategoria');
        const inputIdProducto = document.getElementById('idProducto');

        const cod = inputCodigo.value;
        const nom = inputNombre.value;
        const des = inputDesc.value;
        const smin = inputStockMin.value;
        const idcat = inputIdCat.value;
        const idprod = inputIdProducto.value;

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
                    id_categoria: idcat
                }
            })
        });
        const response = await request.json();
        if (!response.ok) return alert(response.error.message);
        alert('Producto Modificado.');
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
    ${TEMPLATE_NAVIGATION}
        <h1 class= "text-center">Modificar Producto</h1>
        
            <form id="formulario-modificar-producto">
               
             </form> 
       
    </div>
`;