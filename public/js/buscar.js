const d = document;

const data = fetch("https://server-juegos.herokuapp.com/api/juguetes")
  .then((r) => r.json())
  .then((data) => {
    console.log("in async");
    return data;
  });

const formB = d.querySelector(".formBusqueda");

formB.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Hola");
});

let pintar = "";

const buscar = d.getElementById("inputBuscar");

buscar.addEventListener("keyup", async () => {
  console.log("Hola");
  let grid = d.querySelector(".divBuscar");

  let txt = d.getElementById("inputBuscar").value;
  let sData = await data;

  let texto = capita(txt);

  var hasClase = grid.classList.contains("jugueteGrid");

  if (!hasClase) {
    grid.className += " jugueteGrid";
  }

  sData.map((data) => {
    if (texto !== "" && data.nombre.includes(texto)) {
      let card = `<div class="ropaCard">
            <div class=" item card" style="width: 14rem">
              <img src="${data.imagen}"  class=" item-image card-img-top ropaImage" alt="Imagen de ropa" />
              <div class="card-body">
                <h5 class="card-title item-title">${data.nombre}</h5>
                <p class="item-price card-text">
                  ${data.descripcion}
                </p>
                <p class="card-text">
                  $${data.precio}
                </p>
                <div class="card-body">
                  <button onclick="obtener(${data.id})" class="btn btn-outline-primary btn-sm" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Ver articulo</button>
                </div>
              </div>
            </div>
          </div>`;

      pintar = pintar + card;

      grid.innerHTML = pintar;
    }
  });
  pintar = "";
});

function capita(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
