// Funcion que valida logueo.
var status = null;

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var expresion = /\w+@\w+\.+[a-z]/;
    if (username === "" || password === "") {
        alert("Debe ingresar usuario y contraseña");
        return false;
    } else if (!expresion.test(username)) {
        alert("Correo inválido");
        return false;
    } else {
        logueado = "true";
        sessionStorage.setItem("estaLogueado", logueado);
        window.location.replace("./index.html");
        alert("Se ha logueado correctamente");
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});