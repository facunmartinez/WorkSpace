var articlesArray = [];
let productCost = 0;
let comissionPercentage = 0.15;
let MONEY_SYMBOL = "$";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Se ha realizado la compra con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";
let total = 0;

function showArticlesCart(array) {

    let htmlContentToAppend = "";
    let htmlContentToAppendII = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];
        let monenda = articles.unitCost * articles.count;
        if (articles.currency == "USD") {
            monenda = monenda * 40
        } else {
            monenda = monenda
        }


        htmlContentToAppend += `
        <div class="list-group-item">

    <div class="item row">
        <div class=" col-3">
            <img src="` + articles.src + `" class="item-image img-cart">
        </div>
        <div class="col">
            <div>
                <h6><b>Nombre</b></h6>
                <hr>
            </div>
            <div>
                <h7 class="item-name">` + articles.name + `</h7>
            </div>
        </div>
        <div class="col">
            <div>
                <h6><b>Cantidad</b></h6>
                <hr>
            </div>
            <div>
                <td><input class="item-cant" id="cant-` + i + `" type="number" value="` + articles.count + `" style="width: 50px" min="0"></td>
            </div>
        </div>
        <div class="col">
            <div>
                <h6><b>Precio unitario</b></h6>
                <hr>
            </div>
            <h7 class="item-price">` + articles.currency + ` <span id="cost-` + i + `">` + articles.unitCost + `</span></h7>
        </div>
        <div class="col">
            <div>
                <h6><b>Subtotal en pesos</b>
                    <h6>
                        <hr>
            </div>
            <div>
                <span class="item-total" id="subTotal` + i + `">$` + monenda + `</span>
            </div>
        </div>
    </div>
</div>
    `

    }


    htmlContentToAppendII += `

<div class="container">
<div class="row justify-content-md-center">
    <div class="col-md-8 order-md-1">
        <form class="needs-validation" id="sell-info">

            <h5 class="mb-3">Tipo de envío</h5>
            <div class="d-block my-3">
                <div class="custom-control custom-radio">
                    <input id="premiumradio" name="publicationType" type="radio" class="custom-control-input" checked="" required="">
                    <label class="custom-control-label" for="premiumradio">Premium 2 a 5 días (15%)</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="expressradio" name="publicationType" type="radio" class="custom-control-input" required="">
                    <label class="custom-control-label" for="expressradio">Express 5 a 8 días (7%)</label>
                </div>
                <div class="custom-control custom-radio">
                    <input id="standardradio" name="publicationType" type="radio" class="custom-control-input" required="">
                    <label class="custom-control-label" for="standardradio">Standard 12 a 15 días (5%)</label>
                </div>
            </div>
            <hr class="mb-4">
            <h5 class="mb-3">Dirección de envío</h5>
            <div class="row">
                <div class="col-md-6 mb-3">
                    <label for="shippingStreet">Calle</label>
                    <input type="text" class="form-control" id="shippingStreet" placeholder="" value="">
                    <div class="invalid-feedback">
                        Ingresa una calle
                    </div>
                    <label for="shippingCorner">Esquina</label>
                    <input type="text" class="form-control" id="shippingCorner" placeholder="" value="">
                    <div class="invalid-feedback">
                        Ingresa una esquina
                    </div>

                </div>
                <div class="col-md-6 mb-3">

                    <label for="shippingNumber">Número</label>
                    <input type="text" class="form-control" id="shippingNumber" placeholder="" value="">
                    <div class="invalid-feedback">
                        Ingresa un número
                    </div>

                </div>
            </div>
            <hr class="mb-4">
            <h4 class="mb-3">Costos</h4>
            <ul class="list-group mb-3">
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Subtotal</h6>
                        <small class="text-muted">Costo unitario del producto por cantidad</small>
                    </div>
                    <span class="text-muted" id="productCostText">-</span>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">Costo de envío</h6>
                        <small class="text-muted">Según el tipo de envío</small>
                    </div>
                    <span class="text-muted" id="comissionText">-</span>
                </li>
                <li class="list-group-item d-flex justify-content-between">
                    <span>Total ($)</span>
                    <strong id="totalCostText">-</strong>
                </li>
            </ul>
            <hr class="mb-4">
            <h5 class="mb-3">Forma de pago</h5>
            <span id="tarjeta">Aún no se ha seleccionado un medio de pago</span>
            <div class="row">
                <button type="button" class="m-1 btn btn-link" data-toggle="modal" data-target="#contidionsModal">Seleccionar</button>
            </div>
            <br>
            <br>
            <button class="btn btn-primary btn-lg" type="submit">Finalizar compra</button>

        </form>
    </div>
</div>
</div>

`
    document.getElementById("articles-cart").innerHTML = htmlContentToAppend;
    document.getElementById("shipping").innerHTML = htmlContentToAppendII;
}

//Función que se utiliza para actualizar los costos de envío
function updateTotalCosts() {
    let unitProductCostHTML = document.getElementById("productCostText");
    let comissionCostHTML = document.getElementById("comissionText");
    let totalCostHTML = document.getElementById("totalCostText");

    let unitCostToShow = MONEY_SYMBOL + productCost;
    let comissionToShow = Math.round(comissionPercentage * 100) + PERCENTAGE_SYMBOL;
    let totalCostToShow = MONEY_SYMBOL + (Math.round(productCost * comissionPercentage) + productCost);

    unitProductCostHTML.innerHTML = unitCostToShow;
    comissionCostHTML.innerHTML = comissionToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CARTS_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            articlesArray = resultObj.data;
        }
        showArticlesCart(articlesArray.articles);
        document.getElementById("cant-0").addEventListener("click", function() {
            var cant = document.getElementById("cant-0").value
            var cost = document.getElementById("cost-0").innerText
            total = (cant * cost);
            document.getElementById("subTotal0").innerHTML = MONEY_SYMBOL + (parseInt(cant) * parseInt(cost))
        });
        document.getElementById("cant-1").addEventListener("click", function() {
            var cant = document.getElementById("cant-1").value
            var cost = document.getElementById("cost-1").innerText
            document.getElementById("subTotal1").innerHTML = MONEY_SYMBOL + (parseInt(cant) * parseInt(cost)) * 40
        });

        document.getElementById("cant-1").addEventListener("click", function() {
            var cant = document.getElementById("cant-1").value
            var cost = document.getElementById("cost-1").innerText
            productCost = (total + (cant * cost * 40))
            updateTotalCosts();
        });

        document.getElementById("premiumradio").addEventListener("click", function() {
            comissionPercentage = 0.15;
            updateTotalCosts();
        });

        document.getElementById("expressradio").addEventListener("click", function() {
            comissionPercentage = 0.07;
            updateTotalCosts();
        });

        document.getElementById("standardradio").addEventListener("click", function() {
            comissionPercentage = 0.05;
            updateTotalCosts();
        });


        //Se obtiene el formulario de envío de producto
        var sellForm = document.getElementById("sell-info");


        //Se agrega una escucha en el evento 'submit' que será
        //lanzado por el formulario cuando se seleccione 'Finalizar compra'.
        sellForm.addEventListener("submit", function() {

            let shippingStreet = document.getElementById("shippingStreet");
            let shippingCorner = document.getElementById("shippingCorner");
            let shippingNumber = document.getElementById("shippingNumber");
            let infoMissing = false;

            //Quito las clases que marcan como inválidos
            shippingStreet.classList.remove('is-invalid');
            shippingCorner.classList.remove('is-invalid');
            shippingNumber.classList.remove('is-invalid');

            //Se realizan los controles necesarios,
            //En este caso se controla que se haya ingresado los datos correspondientes
            //Consulto por la calle
            if (shippingStreet.value === "") {
                shippingStreet.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por el número de esquina
            if (shippingCorner.value === "") {
                shippingCorner.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por el número de puerta
            if (shippingNumber.value === "") {
                shippingNumber.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto si la información de medio de pago ha cambiado
            if (document.getElementById("tarjeta").innerHTML == "Aún no se ha seleccionado un medio de pago") {
                alert("Seleccione un medio de pago")
                infoMissing = true;
            }

            if (document.getElementById("totalCostText").innerText == "$0" || document.getElementById("totalCostText").innerText == "-") {
                alert("Ocurrió un error, verifique la cantidad de su producto")
                infoMissing = true
            }

            if (!infoMissing) {
                //Aquí ingresa si pasó los controles, irá a enviar
                //la solicitud para crear la publicación.

                getJSONData(COMPRA_PRODUCT_URL).then(function(resultObj) {
                    let msgToShowHTML = document.getElementById("resultSpan");
                    let msgToShow = "";

                    //Si la publicación fue exitosa, devolverá mensaje de éxito,
                    //de lo contrario, devolverá mensaje de error.
                    if (resultObj.status === 'ok') {
                        msgToShow = resultObj.data.msg;
                        document.getElementById("alertResult").classList.add('alert-success');
                    } else if (resultObj.status === 'error') {
                        msgToShow = ERROR_MSG;
                        document.getElementById("alertResult").classList.add('alert-danger');
                    }

                    msgToShowHTML.innerHTML = msgToShow;
                    document.getElementById("alertResult").classList.add("show");
                });
            }

            //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
            if (e.preventDefault) e.preventDefault();
            return false;
        });
    });

});


// Estas funciones son para mostrar el tipo de medio de pago seleccionado
// Se activan con un onclick 
function tarjeta() {
    document.getElementById("tarjeta").innerHTML = "Tarjeta de crédito";
}

function transfer() {
    document.getElementById("tarjeta").innerHTML = "Transferencia Bancaria";
}