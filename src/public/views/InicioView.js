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
        ${TEMPLATE_NAVIGATION}
        
        <div class="card text-bg-dark">
           <img id="img-fondo-inicio" src="https://www.tenvinilo-argentina.com/webp/wallpaper/large/papel-tapiz-ladrillos-ilusion-de-ladrillo-42520.webp" class="img-fluid" alt="fondo">
            <div class="card-img-overlay">
                <h1 class="display-1 text-center" style="color:black;">BIENVENIDOS A LADRILLITO S.A.</h1>
            </div>
        </div>
            
    </div>
`;