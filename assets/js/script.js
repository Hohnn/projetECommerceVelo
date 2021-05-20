//importation du fichier JSON
fetch('./assets/js/result.json')
    .then(resp => resp.json())
    .then(function(bikeJSON){
      bikeJSON.results.forEach(element => {
          //attention, ajout de l'id="bike" à la ligne 90 de l'HTML  <div class="container-fluid" 
        bike.innerHTML += ` 
      <!-- les produits -->
      <div class="row justify-content-between myCard">
        <div class="col-12 col-md-6 bike">
          <img src="${element.image}" alt="">
        </div>
        <div class="col-12 col-md-5 desc d-flex flex-column justify-content-between align-items-start">
          <h3 class="mb-4">${element.nom}</h3>
          <p>${element.composition}</p>
          <div class="pb-2">Prix : ${element.prix}</div>
          <div class="d-flex justify-content-between w-100">
            <button type="button" class="btn mt-auto mb-3"><i class="bi bi-cart3"></i></button>
            <button type="button" class="btn mt-auto mb-3" data-bs-toggle="modal" data-bs-target="#${element.ref}">+ d'info</button>
          </div>
          </div>
      </div>
      <!-- Modal -->
    <div class="modal fade" id="${element.ref}" tabindex="-1" aria-labelledby="modal-${element.ref}" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${element.nom}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <div class="modalDesc mb-3">${element.description}</div>
        <div>${element.composition}</div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn mt-auto" data-bs-dismiss="modal">Fermer</button>
        </div>
        </div>
    </div>
    </div>
        `
      });
    })
.catch(err => console.error(`erreur importation JSON`))