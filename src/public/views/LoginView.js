import { navigateTo } from "../router.js";
import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Login');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
        const menues = [...document.getElementsByClassName("menu")]
        menues.forEach( menu =>  {
            menu.style.display = "none";
        })
        this.eventos();
    }

    eventos() {
        this.eventoLogin();
        this.eventoRegistro();
    }

    eventoLogin() {
        const formulario = document.getElementById('form-login');
        const inputNombreLogin = document.getElementById('input-nombre-login');
        const inputPasswordLogin = document.getElementById('input-password-login');
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = inputNombreLogin.value;
            const password = inputPasswordLogin.value;
            if (!nombre || nombre.length <= 0) return inputNombreLogin.style.border = "1px solid red";
            if (!password || password.length <= 0) return inputPasswordLogin.style.border = "1px solid red";
            this.enviarLogin(nombre, password);
        });
    }

    async enviarLogin(nombre, password) {
        const request = await fetch('/api/usuario/login', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                nombre,
                password
            })
        });
        const response = await request.json();
        if (!response.ok) return alert(response.error.message);
        localStorage.setItem('usuario', JSON.stringify({
            id: response.usuario.id_usuario,
            nombre: response.usuario.nombre_usuario,
            password: response.usuario.password_usuario
        }));
        window.app.usuario = response.usuario;
        navigateTo('/');
    }

    eventoRegistro() {
        const formulario = document.getElementById('form-registro');
        const inputNombreRegistro = document.getElementById('input-nombre-registro');
        const inputPasswordRegistro = document.getElementById('input-password-registro');
        formulario.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = inputNombreRegistro.value;
            const password = inputPasswordRegistro.value;
            if (!nombre || nombre.length <= 0) return inputNombreRegistro.style.border = "1px solid red";
            if (!password || password.length <= 0) return inputPasswordRegistro.style.border = "1px solid red";
            this.enviarRegistro(nombre, password);
        });
    }

    async enviarRegistro(nombre, password) {
        const request = await fetch('/api/usuario/registro', {
            method: "POST",
            headers: { "Content-Type": "Application/JSON" },
            body: JSON.stringify({
                nombre,
                password
            })
        });
        const response = await request.json();
        if (!response.ok) return alert(response.error.message);
        alert('Te has registrado con exito. Ahora puedes iniciar sesion.');
        window.location.reload();
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        ${TEMPLATE_NAVIGATION}
        <h1 class ="h1 text-center">Iniciar Sesion</h1>
        <div class = "container m-3">
            <form id="form-login">
                <div class="mb-3">
                    <label for="usuario" class="form-label" placeholder = "Ingrese su usuario">Usuario</label>
                    <input type="text" id="input-nombre-login" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="input-password-login" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
        </div>

        <h1 class ="h1 text-center">Registrarse</h1>
        <div class = "container m-3">
            <form id="form-registro">
                <div class="mb-3">
                    <label for="usuario" class="form-label" placeholder = "Ingrese su usuario">Usuario</label>
                    <input type="text" id="input-nombre-registro" class="form-control">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" id="input-password-registro" class="form-control" id="password">
                </div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
        </div>
    </div>
`;
