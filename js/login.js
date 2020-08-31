function checkLoginForm() {

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var expresion = /\w+@\w+\.+[a-z]/;


    if (username == "" || password == "") {
        alert("Debe completar todos los campos");
    } else if (!expresion.test(username)) {
        alert("Correo inválido");
        return false;
    } else {
        localStorage.setItem("user", username);
        window.location.href = "inicio.html";
        alert("La plata se hizo para usarla, disfrute sus compras");
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

});