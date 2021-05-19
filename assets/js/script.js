//importation du fichier JSON
fetch('http://localhost:8888/projetECommerce/assets/js/result.json')
    .then(resp => resp.json())
    .then(function(bikeJSON){
      bikeJSON.results.forEach(element => {
          //attention, ajout de l'id="bike" à la ligne 90 de l'HTML  <div class="container-fluid" 
        bike.innerHTML += ` 
      <!-- les produits -->
      <div class="row justify-content-between myCard">
        <div class="col-6 bike">
          <img src="${element.image}" alt="">
        </div>
        <div class="col-5 desc d-flex flex-column justify-content-between align-items-start">
          <h3 class="mb-4">${element.nom}</h3>
          <p>${element.description}</p>
          <div>Prix : ${element.prix}</div>
          <button type="button" class="btn mt-auto mb-3">Ajouter au panier</button>
        </div>
      </div>
        `
      });
    })
.catch(err => console.error(`erreur importation JSON`))