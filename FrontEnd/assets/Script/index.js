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