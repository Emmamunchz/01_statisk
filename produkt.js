let productId = 1163;
let productContainer = document.querySelector(".productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Se dataen i konsollen

    // mangler når der er discount på, kan ik lige finde ud af om det er noget man skal regne has

    productContainer.innerHTML = `
      <h2>${data.brandname} - ${data.productdisplayname}</h2>
      <div class="linje2"></div>
      <main class="product">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${data.id}.webp" 
             alt="${data.productdisplayname}" />
        <section class="purchaseBox">
          <h3 class="produkttitel">${data.productdisplayname}</h3>
          <p class="price">Price: ${data.price} DKK</p>

          <p>${data.category} - ${data.articletype}</p>
          <p>Season: ${data.season} (${data.productionyear})</p>
          <p>Usage: ${data.usagetype}</p>
          <p class="${data.soldout === 1 ? "sold-out" : "in-stock"}">
            ${data.soldout === 1 ? "Sold Out" : "In Stock"}
          </p>          <form>
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
    `;
  });
