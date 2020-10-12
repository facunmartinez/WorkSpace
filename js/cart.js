var articlesArray = [];

function showArticlesCart(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let articles = array[i];

        htmlContentToAppend += `
        <div class="list-group-item">

        <div class="row">
        <div class="col-3">
            <img src="` + articles.src + `" class="img-cart">
        </div>
        <div class="col">
            <div>
                <h5><b>Nombre</b></h5>
                <hr>
            </div>
               <div> 
                 <h6>` + articles.name + `<h6>
                </div>
            </div>
        <div class="col">
        <div>
        <h5><b>Cantidad</b></h5>
        <hr>
        </div>
        <div>
        <td><input id="cant-` + i + `" type="number" value="` + articles.count + `" style="width: 50px"></td>
        </div>
        </div>
        <div class="col">
        <div>
        <h5><b>Precio unitario</b></h5>
        <hr>
        </div>
        <h6>` + articles.currency + ` <span id="cost-` + i + `">` + articles.unitCost + `</span></h6>
        </div>
        <div class="col">
        <div>
        <h5><b>Subtotal en pesos</b><h5>
        <hr>
        </div>
        <div>
        <span>$</span><span id="subTotal` + i + `"></span>
        </div>
        </div>
    </div>
</div>
</div>
    `
    }
    document.getElementById("articles-cart").innerHTML = htmlContentToAppend;
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
            document.getElementById("subTotal0").innerHTML = parseInt(cant) * parseInt(cost)
        })
        document.getElementById("cant-1").addEventListener("click", function() {
            var cant = document.getElementById("cant-1").value
            var cost = document.getElementById("cost-1").innerText
            document.getElementById("subTotal1").innerHTML = (parseInt(cant) * parseInt(cost)) * 40
        })
    });
});