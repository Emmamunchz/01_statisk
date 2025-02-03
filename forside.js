console.log("siden vises");
const listContainer = document.querySelector(".categorylist");
fetch(`https://kea-alt-del.dk/t7/api/categories/`)
  .then((response) => response.json())
  .then((data) => showList(data));

function showList(products) {
  console.log(products);
  let markup = "";
  products
    .map((product) => {
      markup += ` 
        <a class="list" href="produktliste.html?category=${product.category}">${product.category} </a>
  `;
    })
    .join("");
  console.log(markup);
  listContainer.innerHTML = markup;
}
