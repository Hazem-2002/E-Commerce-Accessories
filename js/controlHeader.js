import { reRenderCards } from "./main.js";
import { logout, getUser, editUser } from "./loginForm.js";

const loginGroup = document.getElementById("userLogin");

// -----------------------------------------------------------

function showLoginButton() {
  loginGroup.innerHTML = `<button
              class="btn btn-outline-warning rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#loginmodal"
            >
              Login
            </button>

            <button
              class="btn btn-warning rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#registermodal"
            >
              Register
            </button>`;
}

// -----------------------------------------------------------

function calcCartProductsCount() {
  let count = 0;
  getUser().cart.forEach((ele) => {
    count += ele.count;
  });
  return count;
}

// -----------------------------------------------------------

export function showUserProfileHeader(userName) {
  const firstName = userName.match(/^[a-zA-Z]+(?=\s)/)[0];
  loginGroup.innerHTML = `<h6 class="user-title align-self-center m-0 p-0">Hello, ${firstName}</h6>
            <div class="cart-container align-self-center mx-3 p-0">
              <a href="" data-bs-toggle="dropdown" data-bs-auto-close="outside" id="cart" class="text-body"
                ><i class="cart-icon bi bi-cart"></i
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
    logout();
    showLoginButton();
    reRenderCards();
  });

  if (calcCartProductsCount()) {
    loginGroup.querySelector(".cart-state").classList.remove("d-none");
  } else {
    loginGroup.querySelector(".cart-state").classList.add("d-none");
  }

  const cart = document.getElementById("cart");
  const cartGroup = document.getElementById("cart-group");
  cart.addEventListener("click", () => {
    cartGroup.innerHTML = "";
    if (calcCartProductsCount()) {
      getUser().cart.forEach((ele) => {
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
          listItem.querySelector(".show-count").innerHTML = `${++ele.count}`;
          editUser(getUser());
          loginGroup.querySelector(".cart-count").innerHTML =
            `${calcCartProductsCount()}`;
        });

        const btndecrease = listItem.querySelector(".product-control-decrease");
        btndecrease.addEventListener("click", () => {
          if (ele.count > 1) {
            listItem.querySelector(".show-count").innerHTML = `${--ele.count}`;
            editUser(getUser());
          } else {
            listItem.querySelector(".show-count").innerHTML = `${--ele.count}`;
            const index = getUser().cart.findIndex(
              (e) => e.product === ele.product,
            );
            getUser().cart.splice(index, 1);
            editUser(getUser());
            cartGroup.removeChild(listItem);
            reRenderCards();
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
