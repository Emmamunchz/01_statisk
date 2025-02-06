document.addEventListener("DOMContentLoaded", function () {
  const productInBag = JSON.parse(localStorage.getItem("productInBag"));

  if (productInBag) {
    // Vis produktdata på bag.html
    const bagContainer = document.querySelector(".bag-container"); // Sørg for, at du har et container-element på bag.html
    bagContainer.innerHTML = `
        <div class="product-in-bag">
                  <h3>${productInBag.name}</h3>

<img src="${productInBag.image}" alt="${productInBag.name}" class="product-image" />
          <p class"price">Price: ${productInBag.price} DKK</p>
          <p>Size: ${productInBag.size}</p>
        </div>
      `;
  } else {
    // Hvis der ikke er nogen produkter i baggen
    console.log("No product in the bag.");
  }
});
