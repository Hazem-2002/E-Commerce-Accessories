import { getUser, editUser } from "./loginForm.js";
import { homebackHandler } from "./controlHeader.js";

export function renderFavoriteProductsCards() {
  const favoritesGroup = document.getElementById("favoritesgroup");
  favoritesGroup.innerHTML = ``;

  if (getUser().favorite.length) {
    getUser().favorite.forEach((ele) => {
      const div = document.createElement("div");
      div.classList.add("favorite-card");

      div.innerHTML = `
           <!-- col -->
          <div class="product-card text-center">
            <img
              src="${ele.img}"
              class="card-img-top object-fit-contain p-3"
              style="height: 150px !important"
              alt="${ele.product}"
            />
            <div class="card-footer">
              <div class="card-body m-0 p-0">
                <h5 class="card-title">${ele.product}</h5>
                <p class="price">Price: ${ele.price}</p>
                <p class="category">Category: ${ele.category}</p>
              </div>
              <div class="d-flex justify-content-center align-items-center">
                <i class="bi bi-heart-fill text-danger heart"></i>
              </div>
            </div>
          </div>
          <!-- col -->
          `;

      const heart = div.querySelector(".heart");
      heart.addEventListener("click", () => {
        const index = getUser().favorite.findIndex(
          (el) => el.product == ele.product,
        );
        getUser().favorite.splice(index, 1);
        editUser(getUser());
        div.remove();
        controlJustifyContentCssProperty();
        if (!getUser().favorite.length) {
          defaultFavorite();
        }
      });

      favoritesGroup.append(div);
    });
  } else {
    defaultFavorite();
  }

  controlJustifyContentCssProperty();

  function controlJustifyContentCssProperty() {
    if (favoritesGroup.scrollWidth > favoritesGroup.clientWidth) {
      favoritesGroup.style.setProperty("justify-content", "start", "important");
      // favoritesGroup.style.setProperty("padding", "16px 3px", "important");
    } else {
      favoritesGroup.style.setProperty(
        "justify-content",
        "center",
        "important",
      );
      // favoritesGroup.style.setProperty("padding", "16px", "important");
    }
  }

  function defaultFavorite() {
    const div = document.createElement("div");
    div.classList.add("default-favorite");
    div.innerHTML = `
        <i class="bi bi-heartbreak fs-3 mb-2 d-block"></i>
        <p class="m-0 fw-semibold">No favorites yet</p>
        <small class="text-wrap">Save your favorite pieces to see them here</small>`;

    div.addEventListener("click", () => homebackHandler());
    favoritesGroup.append(div);
  }
}
