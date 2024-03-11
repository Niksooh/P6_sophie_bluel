// Appel à la fonction fetch
fetch ("http://localhost:5678/api/works").then ((data) => {
    return data.json()
})
.then ((works) => {
    console.log(works)
})


// variables
let i = 0
const portfolio = document.getElementById("portefolio")
const figure = document.createElement("figure")
const img = document.createElement("img")
const figcaption = document.createElement("figcaption")
const categoryFilters = document.createElement("article")
  categoryFilters.classList.add("filters")
const gallery = document.createElement("article")
  gallery.classList.add("gallery")

portfolio.appendChild(categoryFilters)
portfolio.appendChild(gallery)

 //// Création des éléments pour chaque objet
 function displayWorks(array) {
    gallery.innerHTML = ""

    //// Création des éléments pour chaque objet
    for(let i = 0; i < array.length; i++){

      img.src = array[i].imageUrl
      img.alt = array[i].title
      figcaption.innerText = array[i].title

      //// Ajout des éléments au DOM
      gallery.appendChild(figure)
      figure.appendChild(img)
      figure.appendChild(figcaption)
    }
  }


//// Images/projets du portfolio à afficher
 function getWorks(){
    try{
        const workString = JSON.stringify(works)
        sessionStorage.setItem("works", workString)
    }catch(err) {
        console.error(err.message)
        let content = "Erreur de connexion avec L'API"
        alertPopup(content, true)
    }
    return JSON.parse(sessionStorage.getItem("works"))
 }

// Création et affichage des boutons de filtres par catégories
 function displayCategoryFilters(array){
    //// Par défaut, au premier chargement de la page, afficher l'intégralité de la galerie
    displayWorks(array)
    ////  Création du bouton d'affichage par défaut
    const btn0 = document.createElement("button")
      btn0.classList.add("btn","btn-category","unselectable","btn-selected")
      btn0.id = 0
      btn0.textContent = "Tous"
    categoryFilters.appendChild(btn0)
      //// Action au clic du bouton
      btn0.addEventListener("click", ()=>{
        removeFilterSelected()
        displayWorks(array)
        btn0.classList.add("btn-selected")
      })
    }