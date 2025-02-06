// const
// henter URL-parametrene, fx ?productId=1234.
const queryString = window.location.search;

// gør det lettere at arbejde med URL-parametre.
const urlParams = new URLSearchParams(queryString);

// trækker værdien af productId ud af URL'en.
const productId = urlParams.get("productId") || 1164; // Fallback

console.log("productId:", productId);

// Finder HTML-elementet med klassen .productContainer, hvor produktinfo skal indsættes.
let productContainer = document.querySelector(".productContainer");

// fetch() henter data fra API'et.
fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  //  konverterer svaret til JSON.
  .then((response) => response.json())
  // arbejder videre med dataene.
  .then((data) => {
    console.log(data); // konsollen

    // endelige pris for et produkt, afhængigt af om der er en rabat (discount) eller ej:
    let finalPrice = data.discount ? data.price - (data.price * data.discount) / 100 : data.price;
    if (productContainer) {
      // PRODUKTDATA
      // Billedet hentes dynamisk fra API'et med produktets ID.
      // Rabatpris
      // Hvis der er rabat, vises både den originale pris (overstreget) og den nye pris.
      // Hvis der ikke er rabat, vises kun den normale pris.

      // PRODUKT INFORMATIONEN
      // dl (definition list) bruges til at vise detaljeret produktinfo.
      // basecolour || "Not specified" betyder, at hvis basecolour ikke findes, vises "Not specified".
      productContainer.innerHTML = `
      
        <h2>${data.brandname} - ${data.productdisplayname}</h2>
        <div class="linje2"></div>
        <main class="product">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp" 
               alt="${data.productdisplayname}" />
          <section class="purchaseBox">
            <h3 class="produkttitel">${data.productdisplayname}</h3>
            <p class="price">
              ${data.discount ? `<s>${data.price} DKK</s> ${finalPrice} DKK` : `${data.price} DKK`}
            </p>
            <p>${data.category} - ${data.articletype}</p>
            <p>Season: ${data.season} (${data.productionyear})</p>
            <p>Usage: ${data.usagetype}</p>
            <p class="${data.soldout === 1 ? "sold-out" : "in-stock"}">
              ${data.soldout === 1 ? "Sold Out" : "In Stock"}
            </p>
            <form>
              <label for="size">
                Choose a size
                <select name="size" id="size">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </label>
              <button class="bag">
                Add to bag
                <span class="tooltip">WE HOPE YOU´RE GONNA LOVE IT!</span>
              </button>
            </form>
            <h4>Product information</h4>
            <dl>
              <dt>Model name</dt>
              <dd>${data.productdisplayname}</dd>
              <dt>Color</dt>
              <dd>${data.basecolour || "Not specified"}</dd>
              <dt>Inventory number</dt>
              <dd>${data.id}</dd>
            </dl>
            <h4><br />${data.brandname}</h4>
            <p>${data.brandbio || "No brand description available."}</p>
          </section>
        </main>
      `;
    } else {
      console.error("Element .productContainer blev ikke fundet!");
    }

    // EVENT LISTENER FOR "Add to bag" KNAP
    document.querySelector(".bag").addEventListener("click", function (event) {
      event.preventDefault(); // Forhindrer formularen i at blive sendt

      // Gemmer produktdata i localStorage
      localStorage.setItem(
        "productInBag",
        JSON.stringify({
          id: data.id,
          name: data.productdisplayname,
          price: finalPrice,
          size: document.getElementById("size").value, // Får størrelsen fra dropdown
          image: `https://kea-alt-del.dk/t7/images/webp/640/${productId}.webp`,
        })
      );

      // Sender brugeren til bag.html
      window.location.href = "bag.html";
    });
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
