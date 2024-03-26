/* Variable */

const loginForm = document.querySelector(".identif-form");
const email = document.getElementById("mail");
const password = document.getElementById("password");
const emailError = document.querySelector(".email-verification");
const passError = document.querySelector(".password-error");

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

function btnSubmit() {
    const isDisabled = !(email.value && password.value);
    stateButton(isDisabled);
}

/* Déclaration event */

email.addEventListener("input", btnSubmit);
password.addEventListener("input", btnSubmit);

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    function objectLogin(email, password) {
        return {
            email: email,
            password: password
        };
    }

    const userLogin = objectLogin(email.value, password.value);

    try {
        const response = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userLogin)
        });

        if (!response.ok) {
            throw new Error(response.status.toString());
        }

        emailError.style.display = "none";
        passError.style.display = "none";

        const data = await response.json();
        btnSubmit();
        localStorage.setItem("token", data.token);
        location.href = "index.html";
    } catch (error) {
        if (error.message === "401") {
            passError.style.display = "block";
            emailError.style.display = "none";
        } else if (error.message === "404") {
            emailError.style.display = "block";
            passError.style.display = "none";
        } else {
            alert("Erreur : " + error);
        }
    }
});