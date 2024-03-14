/* DÉCLARATION DES VARIABLES */
let works = [];
let categories = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");


/* LISTE DES API */

/**RÉCUPÉRATION API "works"(GALERIE) */
fetch("http://localhost:5678/api/works")
.then(response => {
    if (!response.ok) {
        throw Error(`${response.status}`)
    }
    return response.json()
})
.then(galleryData => {
    works = galleryData;
    createWorks();
})
.catch(error => alert("Erreur : " + error))

/**RÉCUPÉRATION API "categories" */
fetch("http://localhost:5678/api/categories")
.then(response => {
    if (!response.ok) {
        throw Error(`${response.status}`)
    }
    return response.json()
})
.then(categoriesData => {
    categories = categoriesData;
    createFilter();
})
.catch(error => alert("Erreur : " + error))


/* DÉCLARATION DE FONCTIONS *

        /**GALERIE */

/**Fonction SUPPRIMER l'ancienne image HTML */
function deleteWorks (){
    galleryElement.innerHTML = "";
};

/**Fonction CRÉER une nouvelle API de travaux*/
function createWorks(categoryId = null){
    /**Delete gallery(works) */
    deleteWorks()

    /**Déterminez quel tableau fonctionne à utiliser en fonction de la catégorie */
    const displayWorks = categoryId ? works.filter(work => work.categoryId === categoryId) : works;

    /**Parcourez chaque œuvre en boucle */
    displayWorks.forEach(work => {
            /**Créer un élément <figure> pour chaque œuvre */
            const figureGallery = document.createElement("figure");
            figureGallery.setAttribute("id", `work-${work.id}`);
            /**Créer un élément <img> pour afficher l'image de l'œuvre */
            const imageElementGallery = document.createElement("img");
            imageElementGallery.src = work.imageUrl;
            imageElementGallery.setAttribute("alt", work.title);
            /**Créer un élément <figcaption> pour afficher le titre de l'œuvre */
            const titleImageGallery = document.createElement("figcaption");
            titleImageGallery.innerText = work.title;
            /**Ajouter les éléments à la galerie */
            galleryElement.appendChild(figureGallery);
            figureGallery.appendChild(imageElementGallery);
            figureGallery.appendChild(titleImageGallery);
    });
};

        /**FILTRE */

/**Ajout de filtres de catégories pour filtrer les œuvres dans la galerie */
function createFilter(){
    /**Ajout d'une catégorie par défaut "Tous" (Tous)*/
    categories.unshift({id: 0, name: "Tous"});

    /**Création d'un élément <div> pour les catégories */
    const categoriesElementFilter = document.createElement("div");
    categoriesElementFilter.classList.add("categories");
    portfolio.insertBefore(categoriesElementFilter, galleryElement);

    /**Parcourez chaque catégorie */
    categories.forEach((categoryElement, i) => {
        /**Create buttons for different categories */
        const categoryBtnFilter = document.createElement("button");
        categoryBtnFilter.innerText = categoryElement.name;
        categoryBtnFilter.value = categoryElement.id;
        categoryBtnFilter.classList.add("category-btn");
        /**Ajouter une classe au premier bouton */
        if(i === 0){
            categoryBtnFilter.classList.add("category-selected")
        };
        /**Ajouter des boutons aux catégories <div> */
        categoriesElementFilter.appendChild(categoryBtnFilter);

        /**Changer de catégorie avec la fonction addEventListener cliquez */
        categoryBtnFilter.addEventListener("click", (e) => {
            /**Obtenir l'ID de la catégorie sélectionnée */
            const selectedCategoryId = parseInt(e.target.value);

            /**Mettre à jour la galerie */
            createWorks(selectedCategoryId);

            /**changer la couleur du bouton */
            const filterColorCategory = document.querySelectorAll(".category-btn");
            filterColorCategory.forEach((filterColor, i) => {
                if(i === selectedCategoryId){
                    filterColor.classList.add("category-selected")
                } else {
                    if(filterColor.classList.contains("category-selected")){
                        filterColor.classList.remove("category-selected")
                    };
                };
            });
        });
    });
};

