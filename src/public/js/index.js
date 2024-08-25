const contenedor = document.getElementById("contenedor_productos");

document.addEventListener("DOMContentLoaded", async () => {
    const req = await fetch("/api/productos",{method: "GET"});
    const res = await req.json();
    console.log(res)

    contenedor.innerHTML = "";
    
    for (const producto of res) {
        contenedor.innerHTML += 
        `<div class="col-xs-12 col-sm-6 col-md-4 col-xl-3">
                <div class="card" style="width: 100%;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9T5WlYFTc5rWLtCI_C47bS_zQlx3d8YpH6g&s"
                        class="card-img-top" alt="bolsa de cemento">
                    <div class="card-body">
                        <h5 class="card-id">${producto.id}</h5>
                         <h5 class="card-title">${producto.nombre}</h5>
                        <a href="#" class="btn btn-primary">MAS INFO</a>
                    </div>
                </div>
            </div>
        `         
    }

});