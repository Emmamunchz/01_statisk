let productId = 1163;
let productContainer = document.querySelector(".productContainer");

fetch(`https://kea-alt-del.dk/t7/api/products/${productId}`)
  .then((response) => response.json())
  .then((data) => {
    productContainer.innerHTML = `
       <h2>NIKE - Sahara Team India Fanwear Round Neck Jersey</h2>
    <div class="linje2"></div>
    <main class="product">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp" alt="Sahara Team India Fanwear Round Neck Jersey" />
      <section class="purchaseBox">
        <h3>Sahara Team India Fanwear Round Neck Jersey</h3>
        <p>Tshirts - Nike</p>
        <form>
          <label for="size">
            Choose a size
            <select name="size" id="size">
              <option value="">S</option>
              <option value="">M</option>
              <option value="">L</option>
              <option value="">XL</option>
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
          <dd>Sahara Team India Fanwear Round Neck Jersey</dd>
          <dt>Color</dt>
          <dd>Blue</dd>
          <dt>Inventory number</dt>
          <dd>1163</dd>
        </dl>
        <h4><br />Nike</h4>
        <p>Nike, creating experiences for today´s athlete.</p>
      </section>
    `;
  });
