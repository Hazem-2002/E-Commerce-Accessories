import { getUser, editUser } from "./loginForm.js";
import { updatecartProductsCount } from "./controlHeader.js";

export function renderCartProducts() {
  const cartProductsGroup = document.getElementById("cartProductsgroup");
  cartProductsGroup.innerHTML = "";
  getUser().cart.forEach((ele) => {
    const card = document.createElement("div");
    card.classList.add("col-4");
    card.innerHTML = `
            <div class="card product-card flex-row">
              <img
                src="${ele.img}"
                class="object-fit-contain m-4"
                alt="${ele.product}"
                style="width: 30% !important"
              />
              <div
                class="card-body d-flex flex-column justify-content-around ps-0 gap-2"
              >
                <h5 class="card-title m-0">${ele.product}</h5>
                <p class="cart-product-price price m-0">Price: $${ele.price * ele.count}</p>
                <p class="category m-0">Category: ${ele.category}</p>
                <div class="d-flex gap-3 my-1">
                  <a href="#" class="product-control product-control-decrease"
                    >-</a
                  >
                  <p
                    class="p-0 m-0 d-flex align-items-center show-count text-white"
                  >
                    ${ele.count}
                  </p>
                  <a href="#" class="product-control product-control-increase"
                    >+</a
                  >
                </div>
                <button class="btn btn-danger">Remove from Cart</button>
              </div>
            </div>`;

    // Event Hanlder For Press on Button that Increase Product Count
    card
      .querySelector(".product-control-increase")
      .addEventListener("click", (e) => {
        e.preventDefault();
        card.querySelector(".show-count").innerHTML = `${++ele.count}`;
        card.querySelector(".cart-product-price").innerHTML =
          `Price: $${ele.price * ele.count}`;
        editUser(getUser());
        updatecartProductsCount();
        updateTotalCost();
      });

    // Event Hanlder For Press on Button that Decrease Product Count
    card
      .querySelector(".product-control-decrease")
      .addEventListener("click", (e) => {
        e.preventDefault();
        if (ele.count > 1) {
          card.querySelector(".show-count").innerHTML = `${--ele.count}`;
          card.querySelector(".cart-product-price").innerHTML =
            `Price: $${ele.price * ele.count}`;
          editUser(getUser());
        } else {
          card.querySelector(".show-count").innerHTML = `${--ele.count}`;
          removeProductFromCart(ele, card);
        }
        updatecartProductsCount();
        updateTotalCost();
      });

    card.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      removeProductFromCart(ele, card);
      updatecartProductsCount();
      updateTotalCost();
    });

    cartProductsGroup.append(card);
  });

  // Add Element To Display Total Cost
  const totalPrice = document.createElement("div");
  totalPrice.classList.add("cart-summary");
  totalPrice.innerHTML = `
      <div class="text-center">
        <span>Total Price</span>
        <h2 class="total-cost">$${calcTotalCost()}</h2>
      </div>`;

  cartProductsGroup.append(totalPrice);
}

// ---------------------------------------------------------------------

function calcTotalCost() {
  return getUser().cart.reduce((acc, ele) => acc + ele.price * ele.count, 0);
}

// ---------------------------------------------------------------------

function updateTotalCost() {
  document.querySelector(".total-cost").textContent = `$${calcTotalCost()}`;
}

// ---------------------------------------------------------------------

function removeProductFromCart(ele, item) {
  const index = getUser().cart.findIndex((e) => e.product === ele.product);
  getUser().cart.splice(index, 1);
  editUser(getUser());
  item.parentElement.removeChild(item);
}

// ---------------------------------------------------------------------
