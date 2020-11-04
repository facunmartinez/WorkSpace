//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    traerDatos();
});


function suplantar() {

    document.getElementById("dataName").innerHTML = document.getElementById("profileName").value;
    document.getElementById("dataSecondName").innerHTML = document.getElementById("profileSecondName").value;
    document.getElementById("dataLastName").innerHTML = document.getElementById("profileLastName").value;
    document.getElementById("dataSecondLastName").innerHTML = document.getElementById("profileSecondLastName").value;
    document.getElementById("dataEmail").innerHTML = document.getElementById("profileEmail").value;
    document.getElementById("dataNumber").innerHTML = document.getElementById("profileNumber").value;
}

function guardar() {

    name = document.getElementById("dataName").innerHTML;
    secondName = document.getElementById("dataSecondName").innerHTML;
    lastName = document.getElementById("dataLastName").innerHTML;
    secondLastName = document.getElementById("dataSecondLastName").innerHTML;
    email = document.getElementById("dataEmail").innerHTML;
    number = document.getElementById("dataNumber").innerHTML;

    let datos = {
        profileName: name,
        profileSecondName: secondName,
        profileLastName: lastName,
        profileSecondLastName: secondLastName,
        profileEmail: email,
        profileNumber: number,
    };
    localStorage.setItem("dataUser", JSON.stringify(datos))
}

function traerDatos() {
    if (localStorage.getItem("dataUser") != null) {
        datosProfile = JSON.parse(localStorage.getItem("dataUser"));
        document.getElementById("dataName").innerHTML = datosProfile.profileName;
        document.getElementById("dataSecondName").innerHTML = datosProfile.profileSecondName;
        document.getElementById("dataLastName").innerHTML = datosProfile.profileLastName;
        document.getElementById("dataSecondLastName").innerHTML = datosProfile.profileSecondLastName;
        document.getElementById("dataNumber").innerHTML = datosProfile.profileNumber;
        document.getElementById("dataEmail").innerHTML = datosProfile.profileEmail;
    }
}


$(document).ready(function() {
    $('#profileData').validate({
        rules: {
            profileName: {
                required: true
            },
            profileLastName: {
                required: true,
            },
            profileEmail: {
                required: true,
                email: true
            },
            profileSecondLastName: {
                required: true
            },
            profileNumber: {
                required: true
            }
        },
        messages: {
            profileName: {
                required: "Ingrese nombre",
            },
            profileLastName: {
                required: "Ingrese apellido",
            },
            profileEmail: {
                required: "Ingrese e-mail",
                email: "En el formato: example@domain.com",
            },
            profileSecondLastName: {
                required: "Ingrese segundo apellido",
            },
            profileNumber: {
                required: "Ingrese numero de telefono",
            }
        },
        submitHandler: function(form) {
            alerta();
            suplantar();
        }
    });
});


function alerta() {
    alert("Datos ingresados correctamente");
}

function aviso() {
    alert("Guardaste los datos correctamente")
}