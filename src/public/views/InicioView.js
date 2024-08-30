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
           <img id="img-fondo-inicio" src="https://img.pikbest.com/wp/202344/light-gray-background-design-abstract-grey-color-dark-black-and-with-old-wall-texture-of-cement-illuminated-by-white-gradient_9898524.jpg!sw800" class="img-fluid" alt="fondo">
            <div class="card-img-overlay">
                <h1 class="display-1 text-center" style="color:black;">BIENVENIDOS A LADRILLITO S.A.</h1>
            </div>
        </div>
            
    </div>
`;