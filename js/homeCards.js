import { isLogin, getUser, editUser } from "./loginForm.js";
import { showUserProfileHeader } from "./controlHeader.js";

export function createCard({ id, img, product, price, category, favorite }) {
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
       <button class="btn btn-outline-warning rounded-pill">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  let btnCart = div.querySelector("button");

  let productIsExist;
  let productIndex;

  if (isLogin) {
    getUser().cart.forEach((ele, index) => {
      if (ele.product === product) {
        productIsExist = true;
        productIndex = index;
      }
    });

    if (productIsExist) {
      btnCartState(false);
    } else {
      btnCartState(true);
    }
  }

  function btnCartState(addState) {
    if (addState) {
      btnCart.innerText = "Add to Cart";
      btnCart.classList.add("btn-outline-warning");
      btnCart.classList.remove("btn-outline-danger");
    } else {
      btnCart.innerText = "Remove From Cart";
      btnCart.classList.remove("btn-outline-warning");
      btnCart.classList.add("btn-outline-danger");
    }
  }

  function addToCart() {
    btnCartState(false);
    getUser().cart.push({
      product: product,
      count: 1,
      category: category,
      price: price,
      img: img,
    });
    editUser(getUser());
  }

  function removeFromCart(productIndex) {
    btnCartState(true);
    getUser().cart.splice(productIndex, 1);
    editUser(getUser());
  }

  btnCart.addEventListener("click", () => {
    if (isLogin) {
      let productIsExist;
      let productIndex;
      getUser().cart.forEach((ele, index) => {
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
      showUserProfileHeader(getUser().name);
    } else {
      new bootstrap.Modal(loginmodal).show();
    }
  });

  const heart = div.querySelector("i");

  if (isLogin) {
    if (checkProductIsExistInFavorite(product)) {
      productIsUserFavorite(true);
    } else {
      productIsUserFavorite(false);
    }
  }

  heart.addEventListener("click", () => {
    if (isLogin) {
      if (checkProductIsExistInFavorite(product)) {
        productIsUserFavorite(false);
        const index = getUser().favorite.findIndex((ele) => ele.product == product);
        getUser().favorite.splice(index, 1);
        editUser(getUser());
      } else {
        productIsUserFavorite(true);
        getUser().favorite.push({
          product: product,
          price: price,
          category: category,
          img: img,
        });
        editUser(getUser());
      }
    } else {
      new bootstrap.Modal(loginmodal).show();
    }
  });

  function checkProductIsExistInFavorite(product) {
    return getUser().favorite.some((ele) => ele.product === product);
  }

  function productIsUserFavorite(isFavorite) {
    if (isFavorite) {
      heart.classList.add("bi-heart-fill");
      heart.classList.add("text-danger");
      heart.classList.remove("bi-heart");
    } else {
      heart.classList.remove("bi-heart-fill");
      heart.classList.remove("text-danger");
      heart.classList.add("bi-heart");
    }
  }

  return div;
}

// ---------------------------------------------------------------------
