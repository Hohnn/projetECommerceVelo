//importation du fichier JSON
fetch('./assets/js/result.json')
  .then(resp => resp.json())
  .then(function (bikeJSON) {
    bikeJSON.results.forEach(element => {
      //attention, ajout de l'id="bike" à la ligne 90 de l'HTML  <div class="container-fluid" 
      bike.innerHTML += ` 
      <!-- les produits €-->
      <div class="row justify-content-between myCard">
        <div class="col-12 col-md-6 bike">
          <img src="${element.image}" alt="">
        </div>
        <div class="col-12 col-md-5 desc d-flex flex-column justify-content-between align-items-start">
          <h3 class="mb-4">${element.nom}</h3>
          <p>${element.composition}</p>
          <div class="pb-2">Prix : ${element.prix}</div>
          <div class="d-€flex justify-content-between w-100">
            <button type="button" class="btn mt-auto mb-3" data-bikename="${element.nom}" data-additem="${element.ref}" data-price="${element.prix}" data-number="0"><i class="bi bi-cart3"></i></button>
            <button type="button" class="btn mt-auto mb-3" data-bs-toggle="modal" data-bs-target="#${element.ref}">+ d'info</button>
          </div>
          </div>
      </div>
      <!-- Modal -->
    <div class="modal fade" id="${element.ref}" tabindex="-1" aria-labelledby="modal-${element.ref}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="moda€l-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${element.nom}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="modalDesc mb-3">${element.description}</div>
        <div>${element.composition}</div>
        </div>
        <div class="moda€l-footer">
            <button type="button" class="btn mt-auto" data-bs-dismiss="modal">Fermer</button>
        </div>
        </div>
    </div>
    </div>
        `
      var item = [];
      const selectButtonItem = document.querySelectorAll("button[data-additem]");
      selectButtonItem.forEach(element => {
        let gg = 0
        let priceMulti = 0
        element.addEventListener("click", function () {
          if (gg == 0 || item[item.length-1][0].includes(element.dataset.bikename) == false) {
            item.push([element.dataset.bikename, element.dataset.price]);
            element.dataset.number++;
            priceMulti = element.dataset.price
          } else {
            let price = element.dataset.price
            let slicePrice = price.slice(0, price.length - 1);
            element.dataset.number++;
            priceMulti = ` ${slicePrice * element.dataset.number}€`
          }
          gg++
          console.log(item);
          addItem.innerHTML = " "
          item.forEach(element => {
            console.log(element);
            addItem.innerHTML += `<div>Article : ${element[0]}</div><div>Prix : ${priceMulti}</div>`
          });
        })
      });
    });
  })
  .catch(err => console.error(`erreur importation JSON`))