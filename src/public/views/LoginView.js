import AbstractView from "./AbstractView.js";
import {TEMPLATE_NAVIGATION} from "./templates/nav.js";

export default class extends AbstractView {
    constructor (params) {
        super(params);
        this.setTitle('Login');
    }

    async init () {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        ${TEMPLATE_NAVIGATION}
        <h1 class ="h1 text-center"> Iniciar Sesion </h1>
        <div class = "container m-3">
            <form>
                <div class="mb-3">
                    <label for="usuario" class="form-label" placeholder = "Ingrese su usuario">Usuario</label>
                    <input type="text" class="form-control">
                </div>
                    <div class="mb-3">
                    <label for="contraseña" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="contraseña">
                </div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
        </div>
    </div>
`;