console.log("welcome to the about product page :)");

const productForm = document.querySelector("#add-product-form");
const typeSwitch = document.querySelector("#productType");
const fields = document.querySelector("#type-forms");

const toast = document.querySelector("#toast");

// toast
const showToast = (message) => {
  let html = `
      <p>${message}</p>
  `;

  toast.innerHTML = html;
  toast.classList.add("open");
  setTimeout(() => toast.classList.remove("open"), 3000);
};

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    showFormType(typeSwitch.value);
  }
};

typeSwitch.addEventListener("change", () => {
  console.log("changed to: ", typeSwitch.value);
  showFormType(typeSwitch.value);
});

// form markup
let discHtml = `
  <div class="fieldbox" id="Disc-switch">
    <label>Size (mb)</label>
    <input type="number" placeholder="Enter Disc Size" name="disc" required />
  </div>`;

let ironHtml = `
  <div class="fieldbox" id="Iron-switch">
    <label>Weight (kg)</label>
    <input type="number" placeholder="Enter Iron Weight" name="weight" required />
  </div>
`;

let tableHtml = `
  <div class="fieldbox" id="Table-switch">
    <label>Dimension (cm)</label>
    <input type="number" placeholder="Enter Table Width" name="width" required / >
    <input type="number" placeholder="Enter Table Height" name="height"required / >
    <input type="number" placeholder="Enter Table length" name="length" required / >
  </div>
`;

const showFormType = (typeValue) => {
  switch (typeValue) {
    case "Disc":
      fields.innerHTML = discHtml;
      break;
    case "Iron":
      fields.innerHTML = ironHtml;
      break;
    case "Table":
      fields.innerHTML = tableHtml;
      break;
    default:
      fields.innerHTML = "no field";
      break;
  }
};

const formatPropName = (typeValue) => {
  switch (typeValue) {
    case "Disc":
      return "productSize";
    case "Iron":
      return "productWeight";
    case "Table":
      return "productDimension";
    default:
      return "";
  }
};

// function to return the value of select input prepended/appended with appropriate unit(kg/mb)
const getFieldValue = (typeField) => {
  switch (typeField) {
    case "Disc":
      return `${productForm.disc.value.trim()}MB`;
    case "Iron":
      return `${productForm.weight.value.trim()}kg`;
    case "Table":
      return `${productForm.width.value}x${productForm.height.value}x${productForm.length.value}`;
    // width: productForm.width.value.trim(),
    // height: productForm.height.value.trim(),
    // length: productForm.length.value.trim(),
    default:
      return {};
  }
};

const redirectUser = (endpoint) => {
  // retrive details from url and redirect user to given url
  // protocol + host + pathname + page = redirect path
  let protocol = location.protocol;
  let host = location.host;

  let currentLocation = location.pathname.split("/");
  let redirectPage = currentLocation[currentLocation.length - 1];
  let path = location.pathname
    .split("/")
    .splice(0, currentLocation.length - 1)
    .join("/");
  let redirectUrl = `${protocol}//${host}${path}/${endpoint}`;
  let t =
    "http://127.0.0.1:5500/Scandiweb-Project-main/Scandiweb%20Test%20Assignment/Productpage.html";
  console.log(redirectUrl, "\n", redirectPage);

  location.assign(redirectUrl);
};

productForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectFieldValue = typeSwitch.value;
  const formData = {
    productId: productForm.sku.value.trim(),
    productName: productForm.name.value.trim(),
    productPrice: `$${productForm.price.value.trim()}`,
    [formatPropName(`${typeSwitch.value}`)]: getFieldValue(typeSwitch.value),
  };

  addProduct(formData);
  productForm.reset();
  showToast("new product added");
  setTimeout(() => redirectUser("Productpage.html"), 800);
});
