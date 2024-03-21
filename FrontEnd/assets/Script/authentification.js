/* Variable */

const loginForm = document.querySelector(".identif-form");
const email = document.querySelector("mail");
const password = document.querySelector("password");
const emailError = document.querySelector("email-verification");
const passwordError = document.querySelector("password-error");
/* Déclaration fonction */

function stateButton(disabled) {
    const button = document.getElementById("connect");

    if (disabled) {
        button.disabled = true;
        button.style.cursor = "not-allowed";
        button.style.backgroundColor = "grey";
    } else {
        button.disabled = false;
        button.style.cursor = "pointer";
        button.style.backgroundColor = "#1D6154";
    }
}
stateButton(true);

function toggleSubmitBtn() {
    const isDisabled = !(email.value && password.value);
    stateButton(isDisabled);
}

/* Déclaration event */

email.addEventListener("input", toggleSubmitBtn);
password.addEventListener("input", toggleSubmitBtn);

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    function createLoginObject(email, password) {
        return {
            email: email,
            password: password
        };
    }

    const loginUsers = createLoginObject(email.value, password.value);

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginUsers)
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        emailError.style.display = "none";
        passwordError.style.display = "none";

        const data = await response.json();
        toggleSubmitBtn();
        sessionStorage.setItem("token", data.token);
        location.href = "index.html";
    } catch (error) {
        if (error.message === "401") {
            passwordError.style.display = "block";
            emailError.style.display = "none";
        } else if (error.message === "404") {
            emailError.style.display = "block";
            passwordError.style.display = "none";
        } else {
            alert("Erreur : " + error);
        }
    }
});