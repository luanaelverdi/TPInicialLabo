import ErrorView from "./views/ErrorView.js";
import InicioView from "./views/InicioView.js";
import ProductoRestarView from "./views/ProductoRestarView.js";
import ProductoView from "./views/ProductoView.js";
import ProductosView from "./views/ProductosView.js";
import ScannedQRView from "./views/ScannedQRView.js";

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
    window.history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/error", view: ErrorView },
        { path: "/", view: InicioView },
        { path: "/productos", view: ProductosView },
        { path: "/productos/:id_producto", view: ProductoView },
        { path: "/qr/user/:id_usuario/producto/:id_producto", view: ScannedQRView },
        { path: "/restar-producto/:id_producto", view: ProductoRestarView }
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