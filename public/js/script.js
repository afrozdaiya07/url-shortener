const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const password = document.getElementById("password");

        if (password.type === "password") {

            password.type = "text";
            togglePassword.innerText = "🙈";

        } else {

            password.type = "password";
            togglePassword.innerText = "👁️";

        }

    });

}