//importation du fichier JSON
fetch('./assets/js/result.json')
  .then(resp => resp.json())
  .then(function (bikeJSON) {

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
            <button type="button" class="btn mt-auto mb-3" data-bikename="${element.nom}" data-additem="${element.ref}" data-price="${element.prix}" data-number="1"><i class="bi bi-cart3"></i></button>
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
      clickNavButton(element)

      const selectButtonCartLess = document.querySelectorAll("button[data-cartless]");
      selectButtonCartLess.forEach(element => {
        element.addEventListener("click", function () {
          console.log(priceMulti);
          let cartLess = priceMulti - dataPrice
          idCartLess.innerHTML = `Prix : ${cartLess}`
        })
      });

      var item = [];

      const selectButtonItem = document.querySelectorAll("button[data-additem]");
      selectButtonItem.forEach(element => {
        let gg = 0
        let dataNumber = element.dataset.number
        element.addEventListener("click", function () {
          if (gg == 0 || item[item.length - 1][0].includes(element.dataset.bikename) == false) {
            item.push([element.dataset.bikename, element.dataset.price, this.dataset.number]);
          } else {
            let price = element.dataset.price
            let slicePrice = price.slice(0, price.length - 1);
            let quantityNumber = 1 + element.dataset.number++
            console.log(quantityNumber);
            // idCartLess.innerHTML = ` ${slicePrice * dataNumber}€`
            for (let i = 0; i < item.length; i++) {
              //Faut la travailler la condiiton ici
              item[i].splice(2, 1, `${quantityNumber}`)
              item[i].splice(1, 1, `${slicePrice * quantityNumber}`)
            }
          }
          console.log(item);
          gg++
          addItem.innerHTML = " "
          item.forEach(element => {
            addItem.innerHTML += `<div>Article : ${element[0]}</div><div id="idCartLess">Prix : ${element[1]}</div><div>Qté : ${element[2]}</div>
              <button type="button" class="btn btn-primary" data-cartless="${dataNumber}">-</button>`
          });
        })
      });
    });
  })
  .catch(err => console.error(`erreur importation JSON`))


// navBar
let navButton = document.querySelectorAll('a[data-navButton]')

function clickNavButton(params) {
  navButton.forEach(element => {
    element.addEventListener('click', function () {
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