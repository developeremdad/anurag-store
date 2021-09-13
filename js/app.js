const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data, "all-products"));
};
loadProducts();

// search all category
const loadCategoryProducts = () => {
  const searchName = document.getElementById('input-field').value;
  document.getElementById('all-products').innerHTML = '';
  const url = `https://fakestoreapi.com/products/category/${searchName}`;
  fetch(url)
    .then(res => res.json())
    .then((data) => showProducts(data, "all-products"));
};

// show all product in UI 
const showProducts = (products, containerId) => {
  const allProducts = products.map((pd) => pd);
  if (containerId === 'category-container') {
    document.getElementById('category-container').innerHTML = '';
  }
  for (const product of allProducts) {
    const title = product.title.slice(0, 25);
    const rate = Math.round(product.rating.rate);
    const rateCount = product.rating.count;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("col","product","mb-2");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image img-fluid" src=${image}></img>
      </div>
      <h5>${title}</h5>
      <p><b>Category:</b> ${product.category}</p>

      <div class="row p-3 d-flex align-items-center justify-content-around mb-1">
        <div class="side">
          <div class="d-flex">${rate}<span class="ms-2" id="star-icon"><i class="fas fa-star"></i></span></div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-${rate}"></div>
          </div>
        </div>
        <div class="side right">
          <div class="d-flex">${rateCount}<span class="ms-2" id="star-icon"><i class="fas fa-users"></i></span></div>
        </div>
      </div>

        <h4 class="mb-1">Price: $ ${product.price}</h4>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-to-cart-btn common-btn-style">Add To Cart</button>
        <button onclick="loadDetails(${product.id})" class="details-btn common-btn-style">Details</button>
      </div>
      `;
    document.getElementById(containerId).appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  document.getElementById("total-Products").innerText = count;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
  else if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  else if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  else {
    setInnerText("delivery-charge", 20);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

// buy total products 

const makeEmptyFile = (id) => {
  document.getElementById(id).innerText = 0;
}

const buyProducts = () => {
  makeEmptyFile('total-Products');
  count = 0;
  makeEmptyFile('price');
  makeEmptyFile('delivery-charge');
  makeEmptyFile('total-tax');
  makeEmptyFile('total');
  alert('Thank You For Buy Our Products');
}

// show details for product 
const loadDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => showDetails(data))
};

// display product details 
const showDetails = (product) => {
  const detailContainer = document.getElementById("details-container");
  detailContainer.innerHTML = '';
  loadCategory(product.category);
  const title = product.title;
  const rate = Math.round(product.rating.rate);
  const rateCount = product.rating.count;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product text-center">
      <div>
    <img class="product-image img-fluid" src=${image}></img>
      </div>
      <h5>${title}</h5>
      <p><b>Category:</b> ${product.category}</p>
      <p><b>Description:</b> ${product.description}</p>

      <div class="row p-3 d-flex align-items-center justify-content-around mb-1">
        <div class="side">
          <div class="d-flex">${rate}<span class="ms-2" id="star-icon"><i class="fas fa-star"></i></span></div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-${rate}"></div>
          </div>
        </div>
        <div class="side right">
          <div class="d-flex">${rateCount}<span class="ms-2" id="star-icon"><i class="fas fa-users"></i></span></div>
        </div>
      </div>

        <h4 class="mb-1">Price: $ ${product.price}</h4>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-to-cart-btn common-btn-style">Add To Cart</button>
      </div>
      `;
  detailContainer.appendChild(div);
};

// load category base product 
const loadCategory = (category) => {
  const url = `https://fakestoreapi.com/products/category/${category}?limit=4`;
  fetch(url)
    .then(res => res.json())
    .then(data => showProducts(data, "category-container"))
};
