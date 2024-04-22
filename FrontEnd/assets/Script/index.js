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
    worksCreate();
    worksCreatepopinFirst();
    const categoriesResponse = await fetch(
      "http://localhost:5678/api/categories"
    );
    const categories = await categoriesResponse.json();
    if (!token) {
      createFilter(categories);
    }
    addCategoriesPopin(categories);
  } catch (error) {
    alert("Erreur : " + error);
  }
})();

/* DÉCLARATION DE FONCTIONS */

function worksDelete() {
  galleryElement.innerHTML = "";
}

function worksCreate(categoryId = null) {
  worksDelete();

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

      worksCreate(selectedCategoryId);

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

const galleryContentPopinFirst = document.querySelector(".gallery-listener");

function worksCreatepopinFirst() {
  galleryContentPopinFirst.innerHTML = "";

  works.forEach((work) => {
    const popinFirst = document.createElement("figure");
    popinFirst.classList.add("gallery-popinFirst");
    popinFirst.id = `popin-${work.id}`;

    const imgPopinFirst = new Image();
    imgPopinFirst.classList.add("popin-img");
    imgPopinFirst.src = work.imageUrl;

    const garbage = document.createElement("i");
    garbage.classList.add("fa-solid", "fa-trash-can", "delete-work");
    garbage.id = `garbage-${work.id}`;
    garbage.addEventListener("click", () => worksDeletepopinFirst(work.id));

    popinFirst.appendChild(imgPopinFirst);
    popinFirst.appendChild(garbage);

    galleryContentPopinFirst.appendChild(popinFirst);
  });
}

async function worksDeletepopinFirst(id) {
  try {
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    works = works.filter((work) => work.id !== id);

    worksCreatepopinFirst();

    messagePhotoDeleted.style.display = "flex";
    setTimeout(() => {
      messagePhotoDeleted.style.display = "none";
    }, 1500);

    worksCreate();
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

  const btnCrossDeux = document.querySelector(".close-icon-2");
  btnCrossDeux.addEventListener("click", closePopin);
  popAdd.addEventListener("click", stopPropagation);

  const returnPopin = document.querySelector(".return-left");
  returnPopin.addEventListener("click", firstPopReturn);
});

function firstPopReturn() {
  popAdd.style.display = "none";
  firstPop.style.display = "block";
}

const arrowLeft = document.querySelector(".return-left");

arrowLeft.addEventListener("click", () => {
  firstPop.style.display = "flex";
  popAdd.style.display = "none";
});

/* Menu déroulant choix catégorie popin */

const categoriesPopin = document.getElementById("photo-category");

function addCategoriesPopin(categories) {
  categories.forEach((category) => {
    const worksCategories = document.createElement("option");

    worksCategories.setAttribute("value", category.id);
    worksCategories.setAttribute("name", category.name);
    worksCategories.innerText = category.name;
    categoriesPopin.appendChild(worksCategories);
  });
}

const downloadNewImg = document.getElementById("file");
const previewNewImg = document.getElementById("preview");
const maxFileSize = 4 * 1024 * 1024;
const valid = document.querySelector(".btn-add-photo-2");

downloadNewImg.addEventListener("change", () => {
  const file = downloadNewImg.files[0];

  if (file.size > maxFileSize) {
    alert(
      "Le fichier est trop volumineux. Veuillez sélectionner un fichier plus petit."
    ); /* Alerte si fichier dépasse 4Mo*/
    return;
  }

  let readerImg = new FileReader();
  readerImg.readAsDataURL(downloadNewImg.files[0]);
  readerImg.onload = function (e) {
    document.querySelector(".upload-content").style.display = "none";
    previewNewImg.style.display = "block";
    previewNewImg.classList.add("show");
    previewNewImg.src = e.target.result;
  };
});

/* valid.addEventListener("click", (e) => {
  e.preventDefault();
  if (downloadNewImg.files.length === 0) {
    alert(
      "Veuillez sélectionner un fichier."
    );
    return;
  }
}); */

/**Fonction pour publier la photo depuis l'API */



async function publiNewImg() {
  try {
    const photoTitle = document.getElementById("photo-title");
    const dataForm = new FormData();
    dataForm.append("title", photoTitle.value);
    dataForm.append("category", categoriesPopin.value);
    dataForm.append("image", downloadNewImg.files[0]);

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
      body: dataForm,
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    console.log("coucou");
    const worksResponse = await response.json();
    works.push(worksResponse);
    worksCreate();
    closePopin();
  } catch (error) {
    alert("Erreur : " + error);
  }
}

const photoValid = document.querySelector("#photo-form");

photoValid.addEventListener("submit", function (e) {
  publiNewImg();
});
