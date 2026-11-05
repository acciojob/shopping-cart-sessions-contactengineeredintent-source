// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.querySelector("#cart-list");
let cartArray = JSON.parse(sessionStorage.getItem("productArray")) || [];

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.classList.add("mb-2");
    li.innerHTML = `${product.name} - ${product.price} <button class="add-to-cart-btn btn btn-primary" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
  // attaching event listener to each button
  let addBtnArr = document.querySelectorAll(".add-to-cart-btn");
  addBtnArr.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      let productId = e.target.dataset.id;
      addToCart(productId);
    });
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  let productArray = JSON.parse(sessionStorage.getItem("productArray"));
  if (productArray === null) {
    return;
  } else {
    productArray.forEach((product) => {
      const li = document.createElement("li");
      li.classList.add("mb-2");
      li.innerHTML = `${product.name} - ${product.price} <button class="remove-from-cart-btn btn btn-primary" data-id="${product.id}">Remove From Cart</button>`;
      cartList.appendChild(li);
    });
  }
}

// Add item to cart
function addToCart(productId) {
  products.forEach((product) => {
    if (product.id == productId) {
      cartArray.push(product);
    }
  });
  sessionStorage.clear();
  sessionStorage.setItem("productArray", JSON.stringify(cartArray));
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  let productArray = JSON.parse(sessionStorage.getItem("productArray"));
  productArray = productArray.filter((product) => {
    return product.id != productId;
  });
  sessionStorage.clear();
  sessionStorage.setItem("productArray", JSON.stringify(productArray));
  renderCart();
}
cartList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-from-cart-btn")) {
    removeFromCart(Number(e.target.dataset.id));
  }
});

// Clear cart
function clearCart() {
  sessionStorage.clear();
  renderCart();
}
document.querySelector("#clear-cart-btn").addEventListener("click", (e) => {
  e.preventDefault();
  clearCart();
});

// Initial render
renderProducts();
renderCart();
