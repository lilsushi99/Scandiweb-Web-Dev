const deleteBtn = document.querySelector("#delete-product-btn");
const selectAll = document.querySelector("#pick-all");
const selectAllContainer = document.querySelector("#select-all");

const productGrid = document.querySelector(".Product-Grid");

// fetch product data from local storage
localStorage.clear()
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    let retrieved = JSON.parse(localStorage.getItem("products"));
    if (retrieved) {
      if (!retrieved.length) {
        selectAll.checked = false;
        selectAllContainer.style.display = "none";
        productGrid.innerHTML = `<p class="empty">There are no items left!</p>`;
      }
      retrieved.forEach((product) => generateCards(product, productGrid));
    } else {
      allProducts.forEach((product) => generateCards(product, productGrid));
      retrieved = allProducts;
      localStorage.setItem("products", JSON.stringify(retrieved));
      retrieved = JSON.parse(localStorage.getItem("products"));
      retrieved.forEach((product) => generateCards(product, productGrid));
    }
  }
};

// function to select and deselect all products cards
selectAll.addEventListener("input", () => {
  const inputElements = document.querySelectorAll(".delete-checkbox");
  if (selectAll.checked) {
    inputElements.forEach((input) => {
      // if the user checks any of the products when the 'select all' input is checked,
      // then uncheck the 'select-all' input
      input.checked = true;
      input.addEventListener("input", () => {
        if (!input.checked) {
          selectAll.checked = false;
        }
      });
    });
  } else {
    inputElements.forEach((input) => (input.checked = false));
  }
});

// delete functionality
deleteBtn.addEventListener("click", () => {
  deleteProducts();
  productGrid.innerHTML = "";
  // retrieve product list from local storage
  let retrieved = JSON.parse(localStorage.getItem("products"));
  retrieved.map((product) => generateCards(product, productGrid));

  if (!retrieved.length) {
    selectAll.checked = false;
    selectAllContainer.style.display = "none";
    productGrid.innerHTML = `<p class="empty">There are no items left!</p>`;
  }
});