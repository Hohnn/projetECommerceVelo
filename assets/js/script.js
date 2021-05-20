//importation du fichier JSON
fetch('./assets/js/result.json')
    .then(resp => resp.json())
    .then(function(bikeJSON){
      
      bikeJSON.results.forEach(element => {
          //attention, ajout de l'id="bike" à la ligne 90 de l'HTML  <div class="container-fluid" 
        bike.innerHTML += ` 
      <!-- les produits -->
      <div class="row justify-content-between myCard" data-delete="${element.ref}">
        <div class="col-12 col-md-6 bike">
          <img src="${element.image}" alt="">
        </div>
        <div class="col-12 col-md-5 desc d-flex flex-column justify-content-between align-items-start">
          <h3 class="mb-4">${element.nom}</h3>
          <p>${element.composition}</p>
          <div class="pb-2">Prix : ${element.prix}</div>
          <div class="d-flex justify-content-between w-100">
            <button type="button" class="btn mt-auto mb-3" data-bikename="${element.nom}" data-additem="${element.ref}" data-price="${element.prix}" data-number="0"><i class="bi bi-cart3"></i></button>
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
        clickNavButton(element)

        var item = [];
        const selectButtonItem = document.querySelectorAll("button[data-additem]");
        selectButtonItem.forEach(element => {
          let gg = 0
          let priceMulti = 0            
            if (gg == 0 || item[item.length-1][0].includes(element.dataset.bikename) == false) {
              
              element.dataset.number++;
              priceMulti = element.dataset.price
            } else {
              let price = element.dataset.price
              let slicePrice = price.slice(0, price.length - 1);
              element.dataset.number++;
              priceMulti = ` ${slicePrice * this.dataset.number}€`
            }
            gg++
            addItem.innerHTML = " "
            item.forEach(element => {
              console.log(element);
              addItem.innerHTML += `<div>Article : ${element[0]}</div><div class="fw-normal" data-price="${element[1]}">Prix : ${element[1]}</div>`
            });
          })
        });
      });
    })
    .catch(err => console.error(`erreur importation JSON`))


// navBar
let navButton = document.querySelectorAll('a[data-navButton]')
console.log(navButton)

function clickNavButton(params) {
  navButton.forEach(element => {
    element.addEventListener('click', function() {
      let allBike = document.querySelector(`div[data-delete="${params.ref}"]`)
      let services = document.getElementById('services')
      let model = document.getElementById('model')
      navButton.forEach(element => {
        element.classList.remove('active')
      })      
      this.classList.add('active')
      if (this.dataset.navbutton == 'accueil') {
        allBike.classList.remove('d-none')
        services.classList.remove('d-none')
        model.innerHTML = 'TOUS LES MODELS'
      }
      if (this.dataset.navbutton == 'vtt') {
        if (!params.ref.match('VTT')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES VTT'
        } else {
          allBike.classList.remove('d-none')
        }
      }
      if (this.dataset.navbutton == 'vtc') {
        if (!params.ref.match('VTC')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES VTC'
        } else {
          allBike.classList.remove('d-none')
        }
      }
      if (this.dataset.navbutton == 'elec') {
        if (!params.ref.match('E')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES ELECTRIQUES'
        } else {
          allBike.classList.remove('d-none')
        }
      }
      if (this.dataset.navbutton == 'ville') {
        if (!params.ref.match('VV')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES VELOS DE VILLE'
        } else {
          allBike.classList.remove('d-none')
        }
      }
    })
  })
}

