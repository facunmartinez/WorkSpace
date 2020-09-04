var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let rltPrd = array[i];

        if (i == 1 || i == 3) {

            htmlContentToAppend += `

        <div class="card" style="width: 18rem;">
        <img src="` + rltPrd.imgSrc + `" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">` + rltPrd.name + `</h5>
          <p class="card-text">` + rltPrd.description + `</p>
          <a href="./product-info.html" class="btn btn-primary">Ver producto</a>
        </div>
      </div>
      `

            document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
        }
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let soldCountHTML = document.getElementById("soldCount");
            let currencyHTML = document.getElementById("currency");
            let costHTML = document.getElementById("cost");
            let categoryHTML = document.getElementById("category");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            soldCountHTML.innerHTML = product.soldCount;
            currencyHTML.innerHTML = product.currency;
            costHTML.innerHTML = product.cost;
            categoryHTML.innerHTML = product.category;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            //Muestro los productos relacionados
        }

    });
});

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showRelatedProducts(resultObj.data);


        }
    });
});