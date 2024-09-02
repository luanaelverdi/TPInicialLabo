import ErrorView from "./views/ErrorView.js";
import InicioView from "./views/InicioView.js";
import ProductoCompraView from "./views/ProductoCompraView.js";
import ProductoRestarView from "./views/ProductoRestarView.js";
import ProductoView from "./views/ProductoView.js";
import ProductosView, {interval} from "./views/ProductosView.js";
import ScannedQRView from "./views/ScannedQRView.js";

import LoginView from "./views/LoginView.js";
import DepositosView from "./views/DepositosView.js";
import ProductoInsertarView from "./views/ProductoInsertarView.js";
import CategoriasView from "./views/CategoriasView.js";
import CategoriaView from "./views/CategoriaView.js";


const pathToRegex = (path) => {
    return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
};

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

export const navigateTo = (url) => {
    clearInterval(interval);
    window.history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/error", view: ErrorView },
        { path: "/", view: InicioView },
        { path: "/insertar-producto", view: ProductoInsertarView },
        { path: "/productos", view: ProductosView },
        { path: "/producto/:id_producto", view: ProductoView },
        { path: "/qr/user/:id_usuario/producto/:id_producto", view: ScannedQRView },
        { path: "/restar-producto/:id_producto", view: ProductoRestarView },
        { path: "/orden-compra/:id_producto/:id_deposito", view: ProductoCompraView },
        { path: "/login", view: LoginView },
        { path: "/depositos", view: DepositosView },
        { path: "/categorias", view: CategoriasView },
        { path: "/categoria/:id_categoria", view: CategoriaView }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: window.location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [window.location.pathname]
        };
    };

    const view = new match.route.view(getParams(match));
    await view.init();
};

window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', async () => {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href || e.target.getAttribute('href'));
        };
    });

    await getData();
    router();
});

async function getData () {
    const reqCredenciales = await fetch ("/api/credenciales", { method: "GET" });
    const resCredenciales = await reqCredenciales.json();

    const reqServer = await fetch("/api/server", { method: "GET" });
    const resServer = await reqServer.json();

    window.app = { 
        host: resServer.host,
        user: { 
            credenciales: resCredenciales.credenciales 
        } 
    }

    console.log(window.app)
}