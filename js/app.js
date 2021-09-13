const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const title = product.title.slice(0, 21);
    const rate = Math.round(product.rating.rate);
    const rateCount = product.rating.count;
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image img-fluid" src=${image}></img>
      </div>
      <h5>${title}</h5>
      <p>Category: ${product.category}</p>

      <div class="row d-flex align-items-center mb-2">
        <div class="side">
          <div><span class="d-flex" id="star-icon"> ${rate}  <i class="fas fa-star"></i></span></div>
        </div>
        <div class="middle">
          <div class="bar-container">
            <div class="bar-${rate}"></div>
          </div>
        </div>
        <div class="side right">
          <div>${rateCount}</div>
        </div>
      </div>

        <h4>Price: $ ${product.price}</h4>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="add-to-cart-btn common-btn-style">Add To Cart</button>
        <button class="details-btn common-btn-style">Details</button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);
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
    const totalTax = (priceConverted * 0.4);
    setInnerText("total-tax", totalTax);
  }
  else if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    const totalTax = (priceConverted * 0.3);
    setInnerText("total-tax", totalTax);
  }
  else if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    const totalTax = (priceConverted * 0.2);
    setInnerText("total-tax", totalTax);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};
