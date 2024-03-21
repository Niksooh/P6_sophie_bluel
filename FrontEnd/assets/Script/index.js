/* DÉCLARATION DES VARIABLES */
let works = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");


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

/** Mode Administrateur */

function adminMode() {
    const token = sessionStorage.getItem("token");
    if (token) {
        enableEditMode();
        enableLogout();
        hideCategoryButtons();
        enableEditButton();
    }
}

function enableEditMode() {
    const editModeBar = `<div class="edit-mode">
        <i class="logo-edit fa-regular fa-pen-to-square"></i>
        <p>Mode édition</p>
    </div>`;
    header.style.marginTop = "80px";
    header.insertAdjacentHTML("afterbegin", editModeBar);

    const containerDivBtn = document.createElement("div");
    containerDivBtn.classList.add("edit-projets");
    containerDivBtn.appendChild(titlemyProjets);

    const btnToModified = `<div class="edit">
        <i class="fa-regular fa-pen-to-square"></i>
        <p>Modifier</p>
    </div>`;

    portfolio.insertBefore(containerDivBtn, portfolio.firstChild);
    titlemyProjets.insertAdjacentHTML("afterend", btnToModified);
}

function enableLogout() {
    switchLogout.textContent = "logout";
    switchLogout.href = "#";

    switchLogout.addEventListener("click", () => {
        sessionStorage.removeItem("token");
        location.reload();
    });
}

function hideCategoryButtons() {
    const categoriesButtonsFilter = document.querySelectorAll('.category-btn');
    categoriesButtonsFilter.forEach(button => {
        button.style.display = 'none';
    });
}

function enableEditButton() {
    const editBtn = document.querySelector(".edit");
    if (editBtn) {
        editBtn.addEventListener("click", openFirstModal);
    }
}