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
          <h3 class="mb-4" data-bikename="${element.ref}">${element.nom}</h3>
          <p>${element.composition}</p>
          <div class="pb-2 " data-price="${element.ref}">${element.prix}</div>
          <div class="d-flex justify-content-between w-100">
            <button tabindex="0" data-bs-trigger="focus" type="button" class="btn mt-auto mb-3 btn-grad" data-additem="${element.ref}" data-number="1" data-bs-container="body"  data-bs-toggle="popover" data-bs-placement="right" data-bs-content="Ajouté" ><i class="bi bi-cart3"></i></button>
            <button type="button" class="btn mt-auto mb-3" data-bs-toggle="modal" data-bs-target="#${element.ref}">+ d'info</button>
          </div>
          </div>
      </div>
      
        `
      modalContainer.innerHTML += `
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
    </div>`
      clickNavButton(element)
      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
      var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl)
      })

      let button = document.querySelectorAll('button[data-additem]')

      button.forEach(element => {
        element.addEventListener('click', function () {
          createObj(this)
          creerPanier()
          panierNewitem()
        })
      })


      //creer un objet avec l'innerHTML du même data que le bouton 
      function createObj(params) {
        let title = document.querySelector(`h3[data-bikename='${params.dataset.additem}']`).innerHTML
        let price = document.querySelector(`div[data-price='${params.dataset.additem}']`).innerHTML
        //supprime le €
        price = price.slice(0, price.length - 1)
        //l'object qui sera push dans la liste
        let productObj = {
          title: title,
          number: 1,
          price: price,
        }
        //appelle la function qui met l'objet dans la liste avec en parametre l'objet
        storeObj(productObj)
      }
      //initailise la liste pour être accesible
      let shopping = []

      function storeObj(params) {
        //push le premier quoi qu'il arrive
        if (shopping.length == 0) {
          shopping.push(params)
          //stop la fonction ici
          return false
        }
        //compte les objets
        let allObj = shopping.length
        //pour chaque elements
        shopping.forEach(element => {
          //si un titre existe deja 
          if (element.title == params.title) {
            //ajoute la quantité
            element.number++
            //actualise le prix
            element.price = params.price * element.number
          } else {
            //sinon si l'objet existe pas, retire 1 au compteur d'objet
            allObj--
          }
        })
        //si le compteur est à 0 c'est qu'il à jamais trouvé le même objet
        if (allObj == 0) {
          //donc on l'ajoute à la liste
          shopping.push(params)
        }
      }

      function creerPanier() {
        let panier = document.getElementById('addItem')
        //reset l'HTML !
        panier.innerHTML = ''
        shopping.forEach(element => {
          panier.innerHTML +=
            `<ul class="border-bottom pb-2 mb-3">
              <li>Article : ${element.title}</li>
              <li class="d-flex">Quantité : ${element.number}<button type="button" class="ms-auto btn btn-secondary" data-minus="${element.title}">-</button><button type="button" class="btn myOrange" data-addus="${element.title}">+</button><button type="button" class="btn" data-trash="${element.title}"><i class="bi bi-trash"></i></button></li>
              <li>Prix : ${element.price} €</li>
          </ul>`
        })

        //initialise avant pour stocker le prix à chaque loop
        let price = 0

        for (let i = 0; i < shopping.length; i++) {
          //addition chaque prix entre eux
          price = +price + +shopping[i].price
        }
        panier.innerHTML += `<div class="mt-3">Totale : ${price} €</div>`

        minus()
        addus()
        TrashItem()
      }
      //le bouton moins
      function minus() {
        let buttonMinus = document.querySelectorAll('button[data-minus]')
        buttonMinus.forEach(element => {
          element.addEventListener('click', function () {
            shopping.forEach((element, index) => {
              //trouve l'element dans la liste
              if (element.title == this.dataset.minus) {
                //recupère le prix initiale
                let myprice = element.price / element.number
                //actualise la quantité
                element.number--
                //actualise le prix avec le prix initiale et la nouvelle quantité
                element.price = myprice * element.number
                //si 0 quantité
                if (element.number == 0) {
                  //supprime l'objet avec l'index du forEach
                  shopping.splice(index, 1)
                }
              }
              //actualise l'html du panier avec les nouvelles valeur
              creerPanier()
              panierNewitem()
            })
          })
        })
      }

      function addus() {
        let buttonaddus = document.querySelectorAll('button[data-addus]')

        buttonaddus.forEach(element => {
          element.addEventListener('click', function () {
            console.log(buttonaddus);
            shopping.forEach((element, index) => {
              if (element.title == this.dataset.addus) {
                let myprice = element.price / element.number
                element.number++
                element.price = myprice * element.number
              }
              creerPanier()
            })
          })
        })
      }

      function TrashItem() {
        let buttonTrashItem = document.querySelectorAll('button[data-trash]')

        buttonTrashItem.forEach(element => {
          element.addEventListener('click', function () {
            shopping.forEach((element, index) => {
              if (element.title == this.dataset.trash) {
                shopping.splice(index, 1);
              }
              creerPanier()
              panierNewitem()
            });
          })
        })
      }

      function panierNewitem() {
        if (shopping.length > 0) {
          panierLogo.classList.add('newitem')
        } else {
          panierLogo.classList.remove('newitem')
        }
      }
    })
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
          model.innerHTML = 'LES VELOS TOUS TERRAINS'
        } else {
          allBike.classList.remove('d-none')
        }
      }
      if (this.dataset.navbutton == 'vtc') {
        if (!params.ref.match('VTC')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES VELOS TOUS CHEMINS'
        } else {
          allBike.classList.remove('d-none')
        }
      }
      if (this.dataset.navbutton == 'elec') {
        if (!params.ref.match('E')) {
          let toDelete = document.querySelector(`div[data-delete="${params.ref}"]`)
          toDelete.classList.add('d-none')
          services.classList.add('d-none')
          model.innerHTML = 'LES VELOS ELECTRIQUES'
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



function scrollToTop() {
  const btn = document.getElementById('scrollTop')

  window.onscroll = function () {
    scrollFunction()
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      btn.style.display = "block";
    } else {
      btn.style.display = "none";
    }
  }
  btn.addEventListener('click', () => {
    topFunction()
  })

  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
}
scrollToTop()

document.getElementById("liveToastBtn").onclick = function () {
  var toastElList = [].slice.call(document.querySelectorAll('.toast'))
  var toastList = toastElList.map(function (toastEl) {
    // Creates an array of toasts (it only initializes them)
    return new bootstrap.Toast(toastEl) // No need for options; use the default options
  });
  toastList.forEach(toast => toast.show()); // This show them

  console.log(toastList); // Testing to see if it works
};