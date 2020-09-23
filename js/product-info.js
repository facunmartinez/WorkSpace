var product = {};


function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i === 0) {

            htmlContentToAppend += `
                <div class="carousel-item active">
                      <img src="` + imageSrc + `" class="d-block w-100 alt="...">
                </div>
            `
        } else {
            htmlContentToAppend += `
                <div class="carousel-item">
                      <img src="` + imageSrc + `" class="d-block w-100" alt="...">
                </div>
            `
        }
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
                            <a href="my-profile.html" id="user-b" class="comment-name"></a>
                            <span id="HoraActual"></span>
                            <span class="score">
                            <form>
  <p class="clasificacion">
    <input id="radio1" type="radio" name="estrellas" value="5"><!--
    --><label for="radio1">★</label><!--
    --><input id="radio2" type="radio" name="estrellas" value="4"><!--
    --><label for="radio2">★</label><!--
    --><input id="radio3" type="radio" name="estrellas" value="3"><!--
    --><label for="radio3">★</label><!--
    --><input id="radio4" type="radio" name="estrellas" value="2"><!--
    --><label for="radio4">★</label><!--
    --><input id="radio5" type="radio" name="estrellas" value="1"><!--
    --><label for="radio5">★</label>
  </p>
</form>
                            </span>
                        </div>
                        <textarea type="text" class="md-textarea form-control" rows="3"></textarea>
                    </div>
                    <button type="submit" class="btn btn-lg btn-primary btn-signin">Comentar</button>
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

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2000);
}