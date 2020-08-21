var loginOpt = document.getElementById("iniciosesion");

//Funcion onclick del login para redireccion
function onLogin() {
    window.location.href = "inicio.html"
}

// validación login form
var userName = document.getElementById("username");
var loginPassword = document.getElementById("password");


function checkLoginForm() {

    if (userName.value == "" || loginPassword.value == "") {
        alert("Debe completar todos los campos");
        return false;
    } else {
        return true;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});