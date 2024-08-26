import AbstractView from "./AbstractView.js";
import { TEMPLATE_NAVIGATION } from "./templates/nav.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle('Inicio');
    }

    async init() {
        const appContainer = document.getElementById('app');
        appContainer.innerHTML = VIEW_CONTENT;
    }
}

const VIEW_CONTENT = `
    <div class="container-view">
        <h1>INICIO</h1>
        ${TEMPLATE_NAVIGATION}
        
        <div class="card text-bg-dark">
            <img src="https://blog.deacero.com/hs-fs/hubfs/autoconstruir-o-contratar-constructora-2.jpg?width=1999&name=autoconstruir-o-contratar-constructora-2.jpg" class="img-fluid" alt="fondo" style="width: 100%; height: 100vh; background-repeat: no-repeat; background-size: cover; " class="card-img" alt="...">
            <div class="card-img-overlay">
                <h1 class="display-1 text-center" style="color:black;">BIENVENIDOS A LADRILLITO S.A.</h1>
            </div>
        </div>
            
    </div>
`;