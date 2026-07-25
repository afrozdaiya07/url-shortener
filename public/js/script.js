// Show / Hide Password
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

// Copy Short URL
function copyURL(url) {
    navigator.clipboard.writeText(url)
        .then(() => {
            alert("Short URL Copied Successfully ✅");
        })
        .catch((err) => {
            console.log(err);
        });
}