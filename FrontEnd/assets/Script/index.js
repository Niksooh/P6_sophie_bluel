/* DÉCLARATION DES VARIABLES */
let works = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");

/* QUAND JE CLIQUE SUR UN FILTRE ET QUE JE RECLIQUE SUR TOUS LES PHOTOS DISPARAISSE */
/* LISTE DES API */

(async () => {
    try {
        const worksResponse = await fetch("http://localhost:5678/api/works").then(response => {
            if (!response.ok) throw Error(`${response.status}`);
            return response.json();
        });

        works = worksResponse;
        createWorks();

        const categoriesResponse = await fetch("http://localhost:5678/api/categories").then(response => {
            if (!response.ok) throw Error(`${response.status}`);
            return response.json();
        });

        createFilter(categoriesResponse);
    } catch (error) {
        alert("Erreur : " + error);
    }
})();


/* DÉCLARATION DE FONCTIONS */

function deleteWorks() {
    galleryElement.innerHTML = "";
};

function createWorks(categoryId = null) {
    deleteWorks();

    let displayWorks = works;

    if (categoryId !== null) {
        displayWorks = works.filter(work => work.categoryId === categoryId);
    }

    displayWorks.forEach(work => {
        const figureGallery = document.createElement("figure");
        figureGallery.setAttribute("id", `work-${work.id}`);

        const imageElementGallery = document.createElement("img");
        imageElementGallery.src = work.imageUrl;
        imageElementGallery.setAttribute("alt", work.title);

        const titleImageGallery = document.createElement("figcaption");
        titleImageGallery.innerText = work.title;

        figureGallery.appendChild(imageElementGallery);
        figureGallery.appendChild(titleImageGallery);
        galleryElement.appendChild(figureGallery);
    });
}
/**FILTRE */

function createFilter(categories) {
    categories.unshift({ id: 0, name: "Tous" });

    const categoriesElementFilter = document.createElement("div");
    categoriesElementFilter.classList.add("categories");
    portfolio.insertBefore(categoriesElementFilter, galleryElement);

    categories.forEach(categoryElement => {
        const categoryBtnFilter = document.createElement("button");
        categoryBtnFilter.innerText = categoryElement.name;
        categoryBtnFilter.value = categoryElement.id;
        categoryBtnFilter.classList.add("category-btn");
        if (categoryElement.id === 0) {
            categoryBtnFilter.classList.add("categorye-selected");
        }
        categoriesElementFilter.appendChild(categoryBtnFilter);

        categoryBtnFilter.addEventListener("click", (e) => {
            const selectedCategoryId = parseInt(e.target.value);

            createWorks(selectedCategoryId);

            document.querySelectorAll(".category-btn").forEach(filterColor => {
                filterColor.classList.toggle("category-selected", filterColor.value == selectedCategoryId);
            });
        });
    });
}