/* DÉCLARATION DES VARIABLES */
let works = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");


/* LISTE DES API */

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

fetch("http://localhost:5678/api/categories")
.then(response => {
    if (!response.ok) {
        throw Error(`${response.status}`)
    }
    return response.json()
})
.then(categoriesData => {
    createFilter(categoriesData);
})
.catch(error => alert("Erreur : " + error))


/* DÉCLARATION DE FONCTIONS */

function deleteWorks (){
    galleryElement.innerHTML = "";
};

function createWorks(categoryId = null){
    deleteWorks()

    if(categoryId) {
        const displayWorks = works.filter(work => work.categoryId === categoryId)
    }else {
        const displayWorks = works
    }


    displayWorks.forEach(work => {

            const figureGallery = document.createElement("figure");
            figureGallery.setAttribute("id", `work-${work.id}`);
            const imageElementGallery = document.createElement("img");
            imageElementGallery.src = work.imageUrl;
            imageElementGallery.setAttribute("alt", work.title);
            const titleImageGallery = document.createElement("figcaption");
            titleImageGallery.innerText = work.title;
            galleryElement.appendChild(figureGallery);
            figureGallery.appendChild(imageElementGallery);
            figureGallery.appendChild(titleImageGallery);
    });
};

    /**FILTRE */

function createFilter(categories){
    categories.unshift({id: 0, name: "Tous"});

    const categoriesElementFilter = document.createElement("div");
    categoriesElementFilter.classList.add("categories");
    portfolio.insertBefore(categoriesElementFilter, galleryElement);

    categories.forEach((categoryElement, i) => {
        const categoryBtnFilter = document.createElement("button");
        categoryBtnFilter.innerText = categoryElement.name;
        categoryBtnFilter.value = categoryElement.id;
        categoryBtnFilter.classList.add("category-btn");
        if(i === 0){
            categoryBtnFilter.classList.add("category-selected")
        };
        categoriesElementFilter.appendChild(categoryBtnFilter);

        categoryBtnFilter.addEventListener("click", (e) => {
            const selectedCategoryId = parseInt(e.target.value);

            createWorks(selectedCategoryId);

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

