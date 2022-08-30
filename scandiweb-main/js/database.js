// product list
let allProducts = [
  {
    productId: "JV0050",
    productName: "Disc",
    productPrice: "$50",
    productSize: "200MB",
  },
  {
    productId: "JV0051",
    productName: "Disc",
    productPrice: "$50",
    productSize: "200MB",
  },
  {
    productId: "JV0052",
    productName: "Disc",
    productPrice: "$50",
    productSize: "200MB",
  },
  {
    productId: "GW0050",
    productName: "Iron",
    productPrice: "$50",
    productWeight: "10kg",
  },
  {
    productId: "GW0051",
    productName: "Iron",
    productPrice: "$50",
    productWeight: "10kg",
  },
  {
    productId: "GW0052",
    productName: "Iron",
    productPrice: "$50",
    productWeight: "10kg",
  },
  {
    productId: "TR0050",
    productName: "Table",
    productPrice: "$50",
    productDimension: "24x30x16",
  },
  {
    productId: "TR0051",
    productName: "Table",
    productPrice: "$50",
    productDimension: "24x30x16",
  },
  {
    productId: "TR0052",
    productName: "Table",
    productPrice: "$50",
    productDimension: "24x30x16",
  },
];

// function to dynamically generate cards
const generateCards = (product, container) => {
  let html = `
  <label>
    <div class="Product-wrap" id=${product.productId}>
      <input type="checkbox" class="delete-checkbox" id=${product.productId} />
      <div class="Center-div">
        <div class="Product-id">${product.productId}</div>
        <div class="Product-name">${product.productName}</div>
        <div class="Product-price">${product.productPrice}</div>
        <div class=${
          product.productSize ||
          product.productWeight ||
          product.productDimension
        }>${
    product.productSize || product.productWeight || product.productDimension
  }</div>
      </div>
    </div>
  </label>
  `;

  // productGrid.innerHTML += html;
  container.innerHTML += html;
};

// add new data function
const addProduct = (newProduct) => {
  // retrive product list from local storage and add the new product
  let retrieved = JSON.parse(localStorage.getItem("products"));
  retrieved = [newProduct, ...retrieved];
  localStorage.setItem("products", JSON.stringify(retrieved));
};

// delete product
const deleteProducts = (container) => {
  const inputElements = document.querySelectorAll(".delete-checkbox:checked");
  inputElements.forEach((input) => {
    // filter out products from local storage that are not checked and store them
    let retrieved = JSON.parse(localStorage.getItem("products"));
    retrieved = [
      ...retrieved.filter((product) => product.productId !== input.id),
    ];

    // update local storage
    localStorage.setItem("products", JSON.stringify(retrieved));
  });
};
