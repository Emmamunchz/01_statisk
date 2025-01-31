const top = document.querySelector("top");
fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  let markup = "";
  products
    .map((product) => {
      markup += ` 
      <section class="top">
      <div class="linje"></div>
      <h2>SHOP CATEGORIES</h2>
      <div class="linje2"></div>
      <h2 class="nike">${product.brandname}</h2>
      <p class="nike1">
      ${product.articletype}
      </p>
    </section>`;
    })
    .join("");
  console.log(markup);
  listContainer.innerHTML = markup;
}

// DET ER TEST!!!
