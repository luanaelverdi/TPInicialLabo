export const TEMPLATE_NAVIGATION = `
    <div class="menu">
        <ul class="nav nav-tabs">
            <li class="nav-item m-2">
                <a class="nav-link active" href="/" data-link>INICIO</a>
            </li>
            <li class="nav-item m-2">
                <a class="nav-link active" href="/productos" data-link>PRODUCTOS</a>
            </li>
            <li class="nav-item m-2">
                <a class="nav-link active" aria-current="page" href="#">DEPOSITOS</a>
            </li>
            <li class="nav-item m-2">
                <a class="nav-link active" href="/login">INICIAR SESION</a>
            </li>
             <li class="nav-item m-2">
                <input class="form-control me-2" type="search" placeholder="Ingrese nombre">
            </li>
            <li class="nav-item m-2">
                <button class="btn btn-outline-success" >Buscar</button>
            </li>
            <li class="nav-item m-2">
                <button class="btn btn-outline-success" >Gestionar producto</button>
            </li>
        </ul>
    </div>
`;