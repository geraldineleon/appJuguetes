let pago = 0;

async function obtener($id) {
  let titulo = d.querySelector(".modal-title");
  let imagen = d.getElementById("imgcanvas");
  let precioStock = d.querySelector(".precioStock");
  let desc = d.querySelector(".desc-canvas");
  let id = d.getElementById("idIndividual");

  let sData = await datosBuenos;

  id.value = $id;

  sData.map((data) => {
    if (id.value !== "" && data.id === $id) {
      console.log(data.nombre);
      titulo.innerHTML = data.nombre;
      imagen.src = data.imagen;
      precioStock.innerHTML =
        "Precio: $" + data.precio + " - Disponibles: " + data.disponibles;

      desc.innerHTML = data.descripcion;
    }
  });
}

const formC = document.querySelector(".formCarrito");
formC.addEventListener("submit", async (e) => {
  e.preventDefault();

  console.log("hola desde el item");

  let sData = await data;

  let id = d.getElementById("idIndividual").value;
  const rowCarrito = d.createElement("div");
  let containerCarrito = d.querySelector(".containerCarrito");
  let divTotal = d.getElementById("total");

  let cantidad = d.getElementById("cantidad").value;

  sData.map((data) => {
    if (id == data.id) {
      pago = pago + data.precio * cantidad;
      divTotal.innerHTML = "Total a pagar: $" + pago;

      console.log("Hola!" + data.id + " total: " + pago);
      let item = `<div class="col-sm-3">
                <img
                  class="w-75 img-fluid"
                  src="${data.imagen}"
                  alt=""
                />
              </div>
              <div class="col-sm-4">
                <p class="fw-bolder">${data.nombre}</p>
                <p class="fst-italic">Precio unitario: $${data.precio}</p>
                <p class="fst-italic">Cantidad: ${cantidad}</p>
              </div>
              <div class="col-sm-4">
                <p class="fw-bolder">Opciones del articulo</p>
                <button onclick="borrarItem(itemCarrito${id})" class="btn btn-outline-danger">
                  <i class="bi bi-trash"></i> Eliminar
                </button>
              </div>`;
      rowCarrito.innerHTML = item;
    }
  });

  if (!rowCarrito.classList.contains("row")) {
    rowCarrito.className += "row itemCarrito";
    rowCarrito.setAttribute("id", "itemCarrito" + id);
  }

  d.getElementById("formCarrito").reset();

  let h = d.createElement("hr");
  rowCarrito.append(h);
  containerCarrito.append(rowCarrito);

  let btnAddPedido = d.querySelector(".addPedido");
  btnAddPedido.removeAttribute("disabled");

  alert("Agregado al carrito correctamente. ");
  document.getElementById("btnCloseModal").click();
});

const formP = document.querySelector(".formPedido");
formP.addEventListener("submit", async (e) => {
  e.preventDefault();
});

function borrarItem(objeto) {
  let divTotal = d.getElementById("total");

  divTotal.innerHTML = "";

  console.log(objeto.id);

  imagen = document.getElementById(objeto.id);
  if (!imagen) {
    alert("El elemento selecionado no existe");
  } else {
    padre = imagen.parentNode;
    padre.removeChild(imagen);
  }
}
