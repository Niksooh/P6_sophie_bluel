/* DÉCLARATION DES VARIABLES */
let works = [];
const galleryElement = document.querySelector(".gallery");
const portfolio = document.getElementById("portfolio");
const token = localStorage.getItem("token");

/* LISTE DES API */

(async () => {
  try {
    const worksResponse = await fetch("http://localhost:5678/api/works");
    works = await worksResponse.json();
    createWorks();
    createWorkspopinFirst ();
    if (!token) {
      const categoriesResponse = await fetch(
        "http://localhost:5678/api/categories"
      );
      const categories = await categoriesResponse.json();
      createFilter(categories);
    }
  } catch (error) {
    alert("Erreur : " + error);
  }
})();

/* DÉCLARATION DE FONCTIONS */

function deleteWorks() {
  galleryElement.innerHTML = "";
}

function createWorks(categoryId = null) {
  deleteWorks();

  let displayWorks = works;

  if (categoryId !== null && categoryId !== 0) {
    displayWorks = works.filter((work) => work.categoryId === categoryId);
  }

  displayWorks.forEach((work) => {
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

  categories.forEach((categoryElement) => {
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

      document.querySelectorAll(".category-btn").forEach((filterColor) => {
        filterColor.classList.toggle(
          "category-selected",
          filterColor.value == selectedCategoryId
        );
      });
    });
  });
}

/** Mode Administrateur */

if (token) {
  modeEnable();
  logoutActivate();
  buttonActivate();
}

function modeEnable() {
  document.querySelector(".Mode-bar").style.display = "flex";
  document.querySelector(".Bar-modif-2").style.display = "flex";
}

function logoutActivate() {
  const switchLogout = document.querySelector(
    'li a[href="authentification.html"]'
  );
  switchLogout.textContent = "logout";
  switchLogout.href = "#";
  switchLogout.addEventListener("click", () => {
    localStorage.removeItem("token");
    location.reload();
  });
}

function buttonActivate() {
  const buttonEdit = document.querySelector(".Mode-bar");
  if (buttonEdit) {
    buttonEdit.addEventListener("click", openpopin);
  }
}

/*Ouverture / fermeture Première popin*/

const popin = document.querySelector(".popin");

document.addEventListener("DOMContentLoaded", function () {
  const popinButtons = document.querySelectorAll(".Bar-modif-2");
  popinButtons.forEach((button) => {
    button.addEventListener("click", openpopin);
  });
});

function openpopin(e) {
  e.preventDefault();
  popin.style.display = "flex";
  popin.removeAttribute("aria-hidden");
  popin.setAttribute("aria-popin", "true");
  popin.addEventListener("click", closePopin);
  popin.querySelector(".popin-close").addEventListener("click", closePopin);
  popin.querySelector(".popin-stop").addEventListener("click", stopPropagation);
}

const closePopin = function (e) {
  if (popin === null) return;
  e.preventDefault();
  popin.style.display = "none";
  popin.setAttribute("aria-hidden", "true");
  popin.removeAttribute("aria-popin");
  popin.removeEventListener("click", closePopin);
  popin.querySelector(".popin-close").removeEventListener("click", closePopin);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closePopin(e);
  }
});

/*Fonction pour afficher le contenu du popin*/

const galleryContentPopinFirst = document.querySelector(".gallery-listener")

function createWorkspopinFirst() {

    galleryContentPopinFirst.innerHTML = "";

    works.forEach(work => {
        const popinFirst = document.createElement("figure");
        popinFirst.classList.add("gallery-popinFirst");
        popinFirst.id = `popin-${work.id}`;

        const imgPopinFirst = new Image();
        imgPopinFirst.classList.add("popin-img");
        imgPopinFirst.src = work.imageUrl;

        const garbage = document.createElement("i");
        garbage.classList.add("fa-solid", "fa-trash-can", "delete-work");
        garbage.id = `garbage-${work.id}`;
        garbage.addEventListener("click", () => deleteWorkspopinFirst(work.id));

        popinFirst.appendChild(imgPopinFirst);
        popinFirst.appendChild(garbage);

        galleryContentPopinFirst.appendChild(popinFirst);
    });
};

async function deleteWorkspopinFirst(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
        });

        if (!response.ok) {
            throw new Error(`${response.status}`);
        }

        works = works.filter(work => work.id !== id);

        createWorkspopinFirst();

        messagePhotoDeleted.style.display = "flex";
        setTimeout(() => {
            messagePhotoDeleted.style.display = "none";
        }, 1500);

        createWorks();
    } catch (error) {
        alert("Erreur : " + error);
    }
}

/* fonction ajout photo */

const firstPop = document.querySelector(".popin-delete");
const popAdd = document.querySelector(".popin-add");
const addBtn = document.querySelector(".btn-add-photo");

  addBtn.addEventListener("click", () => {

      firstPop.style.display = "none";
      popAdd.style.display = "flex";

      const btnCross = document.querySelector(".close-icon");
      btnCross.addEventListener("click", closePopin);
      popAdd.addEventListener("click", stopPropagation);

      const returnPopin = document.querySelector(".return-popin");
      returnPopin.addEventListener("click", firstPopReturn);
  });

function firstPopReturn() {

  popAdd.style.display = "none";
  firstPop.style.display = "block";

};

/* Fonction retour à la première popin Probleme CSS apres retour popin*/
const arrowLeft = document.querySelector(".return-left")

  arrowLeft.addEventListener("click", () => {
    firstPop.style.display = "flex";
    popAdd.style.display = "none";
  });



function categoryAdd() {
  category.shift();

  for (let i = 0; i < categories.length; i++) {
      const category = category[i];
      const worksCategory = document.createElement("option");
      worksCategory.setAttribute("value", category.id);
      worksCategory.setAttribute("name", category.name);
      worksCategory.innerText = category.name;
      popAdd.appendChild(worksCategory);
  }
};