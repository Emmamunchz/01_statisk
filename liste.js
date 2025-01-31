const listContainer = document.querySelector("main");
fetch(`https://kea-alt-del.dk/t7/api/products/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  let markup = "";
  products
    .map((product) => {
      markup += ` 
      
      <article class="smallProduct">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}" />
        <h3> ${product.productdisplayname}</h3>
        <p class="subtle">${product.articletype} - ${product.brandname} - ${product.usagetype}</p>
        <p class="price"><span>Prev.</span>DKK ${product.price},-</p>
        <div class="discounted">
          <p class="price">Now DKK 895,-</p>
          <p>-0%</p>
        </div>

        <a href="produkt.html">
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
