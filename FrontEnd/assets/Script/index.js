/* DÉCLARATION DES VARIABLES */
let works = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");

/* QUAND JE CLIQUE SUR UN FILTRE ET QUE JE RECLIQUE SUR "TOUS" LES PHOTOS DISPARAISSE */
/* LISTE DES API */

(async () => {
    try {
        const worksResponse = await fetch("http://localhost:5678/api/works")
        works = await worksResponse.json();
        createWorks();

        const categoriesResponse = await fetch("http://localhost:5678/api/categories")
        const categories = await categoriesResponse.json();
        createFilter(categories);

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

    if (categoryId !== null && categoryId !== 0) {
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

/** Mode Administrateur */


const token = localStorage.getItem("token");
console.log(token);
if (token) {
    modeEnable();
    logoutActivate();
    buttonHide();
    buttonActivate();

}


function modeEnable() {
    document.querySelector(".Mode-bar").style.display = "flex"
}


function logoutActivate() {
    const switchLogout = document.querySelector('li a[href="authentification.html"]')
    switchLogout.textContent = "logout";
    switchLogout.href = "#";
    console.log("bonjour")
    switchLogout.addEventListener("click", () => {
        localStorage.removeItem("token");
        location.reload();
    });
}

function buttonHide() {
    const filterButton = document.querySelectorAll('.category-btn');
    filterButton.forEach(button => {
        button.style.display = 'none';
    });
}

function buttonActivate() {
    const buttonEdit = document.querySelector(".Mode-bar");
    if (buttonEdit) {
        buttonEdit.addEventListener("click", openpopin);
    }
}

/*Ouverture / fermeture Première modal*/

let popin = null

document.addEventListener('DOMContentLoaded', function () {
    const popins = document.querySelectorAll('.popin');
    popins.forEach(a => {
        a.addEventListener('click', openpopin);
    });
});

function openpopin(e) {
    e.preventDefault()
    popin.style.display = null
    popin.removeAttribute('aria-hidden')
    popin.setAttribute('aria-popin', 'true')
    popin = target
    popin.addEventListener('click', closepopin)
    popin.querySelector('.close-popin').addEventListener('click', closepopin)
    popin.querySelector('.popin-stop').addEventListener('click', stopPropagation)
}

const closepopin = function (e) {
    if (popin === null) return
    e.preventDefault()
    popin.style.display = "none"
    popin.setAttribute('aria-hidden', 'true')
    popin.removeAttribute('aria-popin')
    popin.removeEventListener('click', closepopin)
    popin.querySelector('.close-popin').removeEventListener('click', closepopin)
    popin = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closepopin(e)
    }
})