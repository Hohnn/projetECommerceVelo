let button = document.querySelectorAll('button[data-button]')

button.forEach(element => {
    element.addEventListener('click', function () {
        console.log(this.dataset.button)
        createObj(this)
        creerPanier()
    })
})

//creer un objet avec l'innerHTML du même data que le bouton 
function createObj(params) {
    let title = document.querySelector(`li[data-title='${params.dataset.button}']`).innerHTML
    let price = document.querySelector(`li[data-price='${params.dataset.button}']`).innerHTML
    //supprime le €
    price = price.slice(0, price.length-2)
    //l'object qui sera push dans la liste
    let productObj = {
        title: title,
        number: 1,
        price: price,
    }
    console.log(productObj);
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
        console.log(element.title);
        console.log(params.title);
        //si un titre existe deja 
        if (element.title == params.title) {
            console.log('yesssss');
            //ajoute la quantité
            element.number++
            //actualise le prix
            element.price = params.price * element.number
        } else {
            //sinon si l'objet existe pas, retire 1 au compteur d'objet
            allObj--
        }
    })
    console.log(allObj);
    console.log(params.number);
    //si le compteur est à 0 c'est qu'il à jamais trouvé le même objet
    if (allObj == 0) {
        //donc on l'ajoute à la liste
        shopping.push(params)
    }
    
    console.log(shopping)
}

function creerPanier() {
    let panier = document.getElementById('panier')
    //reset l'HTML !
    panier.innerHTML =''
    shopping.forEach(element => {
        panier.innerHTML += 
    `<ul>
        <li>Article : ${element.title}</li>
        <li>Quantité : ${element.number}</li>
        <li>Prix : ${element.price} €</li>
    </ul>`
    })
    //initialise avant pour stocker le prix à chaque loop
    let price = 0
    for (let i = 0; i < shopping.length; i++) {
        //addition chaque prix entre eux
        price = +price + +shopping[i].price
        total.innerHTML = `Totale : ${price}`   
    }
}
