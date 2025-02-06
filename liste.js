// CONSTANTS
const listContainer = document.querySelector("main");
const getUrl = window.location.search;
const getSearch = new URLSearchParams(getUrl);
const category = getSearch.get("category");
const saleFilterCheckbox = document.getElementById("saleFilter"); // Henter checkboksen for udsalg
const inStockFilterCheckbox = document.getElementById("inStockFilter"); // Henter checkboksen for 'In stock only'

let allProducts = []; // Gemmer alle produkter globalt

// Fetch produkter fra API'et
fetch(`https://kea-alt-del.dk/t7/api/products?category=${category}`)
  .then((response) => response.json())
  .then((data) => {
    allProducts = data; // Gemmer alle produkter
    showList(allProducts); // Viser alle produkter ved start
  });

// FUNCTIONS
function showList(products) {
  let markup = "";
  products
    .filter((product) => {
      // Filtrer på udsalg og in stock hvis checket af
      return (
        (!saleFilterCheckbox.checked || product.discount) && // Kun vis produkter på udsalg, hvis checked
        (!inStockFilterCheckbox.checked || !product.soldout) // Kun vis produkter som ikke er udsolgt, hvis checked
      );
    })
    .map((product) => {
      let finalPrice = product.discount ? product.price - (product.price * product.discount) / 100 : product.price;
      markup += `
        <article class="smallProduct ${product.discount ? "onSale" : ""} ${product.soldout ? "soldOut" : ""}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
          <h3>${product.productdisplayname}</h3>
          <p class="subtle">${product.articletype} - ${product.brandname} - ${product.usagetype}</p>

          ${product.discount ? `<div class="discounted"><p>${product.discount}% off</p></div>` : ""}

          <p class="price">
            ${
              product.discount
                ? `<span class="prev-price">Prev. ${product.price},-</span> <br>
                   <span class="current-price">Now ${finalPrice.toFixed(0)},-</span>`
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

  listContainer.innerHTML = markup;
}

// EVENT LISTENERS FOR FILTERS
saleFilterCheckbox.addEventListener("change", () => showList(allProducts)); // Opdaterer listen ved ændring af "On sale"
inStockFilterCheckbox.addEventListener("change", () => showList(allProducts)); // Opdaterer listen ved ændring af "In stock only"
