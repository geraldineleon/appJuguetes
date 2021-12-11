const datosBuenos = fetch("public/juguetes.json")
  .then((r) => r.json())
  .then((data) => {
    return data;
  });

let espacioMesa = document.querySelector(".espacioMesa");
let mesaTemplate = "";
let espacioPeluches = document.querySelector(".espacioPeluches");
let peluchesTemplate = "";
let espacioColec = document.querySelector(".espacioColec");
let colecTemplate = "";

window.onload = async () => {
  let someData = await datosBuenos;
  someData.map((p) => {
    let card = `<div class="ropaCard">
            <div class=" item card" style="width: 14rem">
              <img src="${p.imagen}"  class=" item-image card-img-top ropaImage" alt="Imagen de ropa" />
              <div class="card-body">
                <h5 class="card-title item-title">${p.nombre}</h5>
                <p class="item-price card-text">
                  ${p.descripcion}
                </p>
                <p class="card-text">
                  $${p.precio}
                </p>
                <div class="card-body">
                  <button onclick="obtener(${p.id})" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Ver articulo</button>
                </div>
              </div>
            </div>
          </div>`;

    switch (p.categoria) {
      case "mesa":
        mesaTemplate = mesaTemplate + card;
        break;
      case "peluches":
        peluchesTemplate = peluchesTemplate + card;
        break;
      case "coleccionables":
        colecTemplate = colecTemplate + card;
        break;
      default:
        break;
    }

    espacioMesa.innerHTML = mesaTemplate;
    espacioPeluches.innerHTML = peluchesTemplate;
    espacioColec.innerHTML = colecTemplate;
  });
};

let newServiceWorker;

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registerEvent) => {
        registerEvent.addEventListener("updatefound", () => {
          newServiceWorker = registerEvent.installing;

          newServiceWorker.addEventListener("statechange", () => {
            /* if (newServiveWorker.state === 'installed') {

            } */
            switch (newServiceWorker.state) {
              case "installed":
                showSnackbarUpdate();
                break;
            }
          });
        });
      });
  });
}

function showSnackbarUpdate() {
  // Get the snackbar DIV
  let x = document.getElementById("snackbar");

  // Add the "show" class to DIV
  x.className = "show";
}

let launchUpdate = document.getElementById("launchUpdate");
launchUpdate.addEventListener("click", () => {
  newServiceWorker.postMessage({
    action: "skipWaiting",
  });
  window.reload();
});
