import { cardsData } from "./cardData.js";

// -----------------------------------------------------------

const registermodal = document.getElementById("registermodal");
const loginmodal = document.getElementById("loginmodal");
const registerForm = document.getElementById("registerForm");
const firstNameRegisterForm = document.getElementById("firstNameRegisterForm");
const lastNameRegisterForm = document.getElementById("lastNameRegisterForm");
const emailRegisterForm = document.getElementById("emailRegisterForm");
const passwordRegisterForm = document.getElementById("passwordRegisterForm");

let userInfo = {};
const users = [];
let isLogin = false;

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  users.push(Object.assign({}, userInfo, { cart: [] }));
  console.log(users);
  userInfo = {};
  alert("Account Created Successfully!");
  bootstrap.Modal.getInstance(registermodal).hide();
  new bootstrap.Modal(loginmodal).show();
});

firstNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value + " " + lastNameRegisterForm.value;
});

lastNameRegisterForm.addEventListener("input", () => {
  userInfo.name =
    firstNameRegisterForm.value + " " + lastNameRegisterForm.value;
});

emailRegisterForm.addEventListener("input", () => {
  userInfo.email = emailRegisterForm.value;

  const isValid = /^\w+@[a-zA-Z]+\.[a-zA-Z]{3}$/.test(emailRegisterForm.value);

  if (isValid) {
    emailRegisterForm.classList.add("is-valid");
    emailRegisterForm.classList.remove("is-invalid");
  } else {
    emailRegisterForm.classList.add("is-invalid");
    emailRegisterForm.classList.remove("is-valid");
  }
});

passwordRegisterForm.addEventListener("input", () => {
  userInfo.password = passwordRegisterForm.value;
});

// -----------------------------------------------------------

const loginGroup = document.getElementById("userLogin");
const loginForm = document.getElementById("loginForm");
const emailLoginForm = document.getElementById("emailLoginForm");
const passwordLoginForm = document.getElementById("passwordLoginForm");
const userLogin = {};
let userIndex;

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  userIndex = users.findIndex((c) => c.email === userLogin.email);
  if (userIndex != -1) {
    if (userLogin.password === users[userIndex].password) {
      isLogin = true;
      bootstrap.Modal.getInstance(loginmodal).hide();
      showLogoutButton(users[userIndex].name);
      renderCards(cardsData);
    } else {
      passwordLoginForm.classList.add("is-invalid");
    }
  } else {
    emailLoginForm.classList.add("is-invalid");
  }
});

emailLoginForm.addEventListener("input", () => {
  userLogin.email = emailLoginForm.value;
  emailLoginForm.classList.remove("is-invalid");
});

passwordLoginForm.addEventListener("input", () => {
  userLogin.password = passwordLoginForm.value;
  passwordLoginForm.classList.remove("is-invalid");
});

function showLoginButton() {
  loginGroup.innerHTML = `<button
              class="btn btn-outline-primary"
              data-bs-toggle="modal"
              data-bs-target="#loginmodal"
            >
              Login
            </button>

            <!-- Register Button -->
            <button
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#registermodal"
            >
              Register
            </button>`;
}

function calcCartProductsCount() {
  let count = 0;
  users[userIndex].cart.forEach((ele) => {
    count += ele.count;
  });
  return count;
}

function showLogoutButton(userName) {
  const firstName = userName.match(/^[a-zA-Z]+(?=\s)/)[0];
  loginGroup.innerHTML = `<h6 class="user align-self-center m-0 p-0">Hello, ${firstName}</h6>
            <div class="cart-container align-self-center mx-3 p-0">
              <a href="" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="cart" class="text-body"
                ><i class="cart bi bi-cart"></i
              ></a>
              <nav
                class="dropdown-menu p-2"
                style="transform: translate(-100px, 5px)"
              ><ul id="cart-group" class="m-0 p-0 d-flex flex-column gap-2 w-100 h-100"></ul>
              </nav>
              <div class="cart-state fw-semibold cart-count">${calcCartProductsCount()}</div>
            </div>
            <button class="btn btn-outline-danger rounded-pill">Logout</button>`;

  loginGroup.querySelector("button").addEventListener("click", () => {
    isLogin = false;
    showLoginButton();
    renderCards(cardsData);
  });

  if (calcCartProductsCount()) {
    loginGroup.querySelector(".cart-state").classList.remove("d-none");
  } else {
    loginGroup.querySelector(".cart-state").classList.add("d-none");
  }

  const cart = document.getElementById("cart");
  const cartGroup = document.getElementById("cart-group");
  console.log("Hazem");
  cart.addEventListener("click", () => {
    cartGroup.innerHTML = "";
    if (calcCartProductsCount()) {
      users[userIndex].cart.forEach((ele) => {
        const listItem = document.createElement("li");
        listItem.classList.add("dropdown-item", "p-2");
        listItem.innerHTML = `<div class="d-flex justify-content-between gap-2 px-2">
                    <p class="fw-semibold d-flex align-items-center m-0 product-cart text-wrap">
                      ${ele.product}
                    </p>
                    <div
                      class="d-flex flex-column justify-content-center align-items-center"
                    >
                      <p class="p-0 m-0">Price:</p>
                      <p class="p-0 m-0">${ele.price}</p>
                    </div>
                  </div>
                  <div class="d-flex gap-2 m-0 mt-2">
                    <a href="#" class="product-control product-control-decrease">-</a>
                    <p class="p-0 m-0 d-flex align-items-center show-count">${ele.count}</p>
                    <a href="#" class="product-control product-control-increase">+</a>
                  </div>`;

        const btnIncrease = listItem.querySelector(".product-control-increase");
        btnIncrease.addEventListener("click", () => {
          console.log("clicked");
          listItem.querySelector(".show-count").innerHTML = `${++ele.count}`;
          loginGroup.querySelector(".cart-count").innerHTML =
            `${calcCartProductsCount()}`;
        });

        const btndecrease = listItem.querySelector(".product-control-decrease");
        btndecrease.addEventListener("click", () => {
          console.log("clicked");
          if (ele.count > 1) {
            listItem.querySelector(".show-count").innerHTML = `${--ele.count}`;
            console.log(ele.count);
          } else {
            listItem.querySelector(".show-count").innerHTML = `${--ele.count}`;
            const index = users[userIndex].cart.findIndex(
              (e) => e.product === ele.product,
            );
            users[userIndex].cart.splice(index, 1);
            cartGroup.removeChild(listItem);
            renderCards(cardsData);
            if (!calcCartProductsCount()) {
              emptyCard();
              loginGroup.querySelector(".cart-state").classList.add("d-none");
            }
          }
          loginGroup.querySelector(".cart-count").innerHTML =
            `${calcCartProductsCount()}`;
        });
        cartGroup.append(listItem);
      });
    } else {
      emptyCard();
    }

    function emptyCard() {
      cartGroup.innerHTML = `
          <li class="dropdown-item text-center py-4 text-muted">
            <i class="bi bi-cart-x fs-3 mb-2 d-block"></i>
            <p class="m-0 fw-semibold">Your cart is empty</p>
            <small class="text-wrap">Add some products to see them here</small>
          </li>
        `;
    }
  });
}

// -----------------------------------------------------------

const cardGroup = document.getElementById("cardgroup");
const searchInput = document.getElementById("search");
const selectionInput = document.getElementById("select");

renderCards(cardsData);

searchInput.addEventListener("input", (e) => searchHandler(e.target.value));
selectionInput.addEventListener("input", (e) =>
  searchHandler(searchInput.value),
);

function searchHandler(value) {
  const searchValue = value.toLowerCase();
  const searchType = selectionInput.value;

  if (searchValue === "") {
    renderCards(cardsData);
    return;
  }

  const filteredCards = cardsData.filter((card) => {
    if (searchType === "product") {
      return card.product.toLowerCase().startsWith(searchValue);
    } else if (searchType === "category") {
      return card.category.toLowerCase().startsWith(searchValue);
    }
  });

  renderCards(filteredCards);
}

function renderCards(data) {
  cardGroup.innerHTML = "";
  data.forEach((card) => {
    cardGroup.appendChild(createCard(card));
  });
}

function createCard({ id, img, product, price, category, favorite }) {
  const div = document.createElement("div");
  div.className = "col-4";

  div.innerHTML = `
    <div class="card product-card text-center">
      <img src="${img}" class="card-img-top object-fit-contain mt-4 mb-2" alt="${product}" />
      
      <div class="card-body">
        <h5 class="card-title">${product}</h5>
        <p class="price">Price: ${price}</p>
        <p class="category">Category: ${category}</p>
      </div>

      <div class="card-footer d-flex justify-content-between align-items-center">
       <i class="bi ${favorite ? "bi-heart-fill text-danger" : "bi-heart"}"></i>
       <button class="btn btn-outline-primary rounded-pill">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  let btnCart = div.querySelector("button");

  let productIsExist;
  let productIndex;

  if (isLogin) {
    users[userIndex].cart.forEach((ele, index) => {
      if (ele.product === product) {
        productIsExist = true;
        productIndex = index;
      }
    });

    if (productIsExist) {
      btnCart.innerText = "Remove From Cart";
      btnCart.classList.remove("btn-outline-primary");
      btnCart.classList.add("btn-outline-danger");
    } else {
      btnCart.innerText = "Add to Cart";
      btnCart.classList.add("btn-outline-primary");
      btnCart.classList.remove("btn-outline-danger");
    }
  }

  function addToCart() {
    btnCart.innerText = "Remove From Cart";
    btnCart.classList.remove("btn-outline-primary");
    btnCart.classList.add("btn-outline-danger");
    users[userIndex].cart.push({
      product: product,
      count: 1,
      category: category,
      price: price,
    });
  }

  function removeFromCart(productIndex) {
    btnCart.innerText = "Add to Cart";
    btnCart.classList.add("btn-outline-primary");
    btnCart.classList.remove("btn-outline-danger");
    users[userIndex].cart.splice(productIndex, 1);
  }

  btnCart.addEventListener("click", () => {
    if (isLogin) {
      let productIsExist;
      let productIndex;
      users[userIndex].cart.forEach((ele, index) => {
        if (ele.product === product) {
          productIsExist = true;
          productIndex = index;
        }
      });

      if (!productIsExist) {
        addToCart();
      } else {
        removeFromCart(productIndex);
      }
      showLogoutButton(users[userIndex].name);
    } else {
      new bootstrap.Modal(loginmodal).show();
    }
  });

  const heart = div.querySelector("i");

  heart.addEventListener("click", () => {
    heart.classList.toggle("bi-heart");
    heart.classList.toggle("bi-heart-fill");
    heart.classList.toggle("text-danger");

    const card = cardsData.find((c) => c.id === id);
    card.favorite = !card.favorite;
  });

  return div;
}

// -----------------------------------------------------------
