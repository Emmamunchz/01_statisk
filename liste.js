// CONSTANTS
const listContainer = document.querySelector("main");
const getUrl = window.location.search;
const getSearch = new URLSearchParams(getUrl);
const category = getSearch.get("category");

fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((response) => response.json())
  .then((data) => showList(data));

// FUNCTIONS
function showList(products) {
  console.log(products);
  let markup = "";
  products
    .map((product) => {
      // Beregner den nedsatte pris, hvis der er rabat
      let finalPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;
      markup +=
        // putter discount på article small product ved at sætte dataen på classen onSale. Pp den måde fordeler den tilbuddene ud på dem der har rabat, hvor dem der har 0=null vises bare som standart.

        // toFixed(0) betyder at jeg har fjernet decimalerne. så fx 249. så hvis der stod 249,50 så havde det været toFixed(2) osv..
        ` 
      <article class="smallProduct ${product.discount && "onSale"} ${product.soldout && "soldOut"}">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
        <h3> ${product.productdisplayname}</h3>
        <p class="subtle">${product.articletype} - ${product.brandname} - ${product.usagetype}</p>

        
        ${product.discount ? `<div class="discounted"><p>${product.discount}% off</p></div>` : ""}


       <p class="price">
          ${
            product.discount
              ? `<span class="prev-price">Prev. ${product.price},-</span> <span class="current-price"> <br>
              Now  ${finalPrice.toFixed(0)},-</span>`
              : `DKK ${finalPrice.toFixed(0)},-`
          }
        </p>




        <a href="produkt.html?productId=${product.id}">
          <div>
            Read More
            <button class="floating-cart">🛒</button>
          </div>
        </a>
      </article>`;
    })
    .join("");
  console.log(markup);
  listContainer.innerHTML = markup;
}
