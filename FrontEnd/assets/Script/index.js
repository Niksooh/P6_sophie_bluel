// Appel à la fonction fetch
fetch("http://localhost:5678/api/works").then((data) => {
    return data.json()
})
    .then((works) => {
        console.log(works)
        displayWorks(works)
    })

fetch("http://localhost:5678/api/categories").then((data) => {
    return data.json()
})
.then((categories) => {
    console.log(categories)
    categories.splice(0, 0, {name : "Tous"})
    for (let i = 0; i < categories.length; i++) {
        const button = document.createElement("button")
        button.innerText = categories[i].name
        document.getElementById("btn").appendChild(button)
    }
})

// variables
let i = 0
const portfolio = document.getElementById("portfolio")
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
    for (let i = 0; i < array.length; i++) {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        img.src = array[i].imageUrl
        img.alt = array[i].title
        figcaption.innerText = array[i].title

        //// Ajout des éléments au DOM
        gallery.appendChild(figure)
        figure.appendChild(img)
        figure.appendChild(figcaption)
    }
}

