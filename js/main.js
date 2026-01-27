import { cardsData } from "./cardData.js";
import { createCard } from "./cards.js";

// -----------------------------------------------------------
const cardGroup = document.getElementById("cardgroup");
const searchInput = document.getElementById("search");
const selectionInput = document.getElementById("select");

renderCards(cardsData);

searchInput.addEventListener("input", (e) => searchHandler(e.target.value));

selectionInput.addEventListener("input", (e) =>
  searchHandler(searchInput.value),
);

// -----------------------------------------------------------

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

// -----------------------------------------------------------

export function renderCards(data) {
  cardGroup.innerHTML = "";
  data.forEach((card) => {
    cardGroup.appendChild(createCard(card));
  });
}

// -----------------------------------------------------------
export function reRenderCards() {
  renderCards(cardsData);
}
// -----------------------------------------------------------
