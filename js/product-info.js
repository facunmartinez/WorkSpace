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

function showComments(array) {
    console.log("");

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let cmmts = array[i];
        let score = "";
        for (let i = 1; i <= cmmts.score; i++) {
            score += `<span class="fa fa-star checked"></span>`
        }
        for (let i = cmmts.score + 1; i <= 5; i++) {
            score += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppend += `

        <div class="comments-container">
           <ul id="comments-list" class="comments-list">
              <li>
                 <div class="comment-main-level">
                    <div class="comment-avatar"><img src="img/user.png" alt=""></div>
                     <div class="comment-box">
                         <div class="comment-head">
                             <h6 class="comment-name">` + cmmts.user + `</a></h6>
                             <span>` + cmmts.dateTime + `</span>
                             <span class="score">` + score + `</span>
                          </div>
                          <div class="comment-content">` + cmmts.description + `</div>
                     </div>
                 </div>
              </li>
           </ul>
        </div>


      `

        document.getElementById("comments").innerHTML = htmlContentToAppend;

    }
}

function addCommment() {

    let htmlContentToAppend = "";

    htmlContentToAppend += `

    <form>
    <div class="comments-container">
        <ul id="comments-list" class="comments-list">
            <li>
                <div class="comment-main-level">
                    <!-- Avatar -->
                    <div class="comment-avatar"><img src="img/user.png" alt=""></div>
                    <!-- Contenedor del Comentario -->
                    <div class="comment-box">
                        <div class="comment-head">
                            <h1 id="user-b" class="comment-name"></h1>
                            <span id="HoraActual"></span>
                        </div>
                        <textarea type="text" class="md-textarea form-control" rows="3"></textarea>
                        <button type="submit" class="btn btn-lg btn-primary btn-signin">Comentar</button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</form>
`
    document.getElementById("addComm").innerHTML = htmlContentToAppend;
    document.getElementById("user-b").innerHTML = localStorage.getItem("user");

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

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            showComments(resultObj.data);
            addCommment();


        }
    });
});

showTime();

function showTime() {
    myDate = new Date();
    hours = myDate.getHours();
    minutes = myDate.getMinutes();
    seconds = myDate.getSeconds();

    if (hours < 10) hours = 0 + hours;

    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    $("#HoraActual").text(hours + ":" + minutes + ":" + seconds);
    setTimeout("showTime()", 1000);
}