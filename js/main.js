const cardGroup = document.getElementById("cardgroup");
const searchInput = document.getElementById("search");
const selectionInput = document.getElementById("select");

const cardsData = [
  {
    id: 1,
    img: "images/Chrono Classic Watch.png",
    product: "Chrono Classic Watch",
    price: "$250",
    category: "Watches",
    favorite: false,
  },
  {
    id: 2,
    img: "images/Noir Leather Watch.png",
    product: "Noir Leather Watch",
    price: "$180",
    category: "Watches",
    favorite: false,
  },
  {
    id: 3,
    img: "images/Silver Edge Watch.png",
    product: "Silver Edge Watch",
    price: "$300",
    category: "Watches",
    favorite: false,
  },
  {
    id: 4,
    img: "images/Minimal Steel Watch.png",
    product: "Minimal Steel Watch",
    price: "$220",
    category: "Watches",
    favorite: false,
  },
  {
    id: 5,
    img: "images/Oud Royale.png",
    product: "Oud Royale",
    price: "$220",
    category: "Perfumes",
    favorite: false,
  },
  {
    id: 6,
    img: "images/Bracelets.png",
    product: "Silver Bracelets",
    price: "$80",
    category: "Jewelry",
    favorite: false,
  },
  {
    id: 7,
    img: "images/Black Bracelets.png",
    product: "Black Bracelets",
    price: "$65",
    category: "Jewelry",
    favorite: false,
  },
  {
    id: 8,
    img: "images/Necklaces.png",
    product: "Necklaces",
    price: "$350",
    category: "Jewelry",
    favorite: false,
  },
  {
    id: 9,
    img: "images/Rings.png",
    product: "Rings",
    price: "$400",
    category: "Jewelry",
    favorite: false,
  },
];

renderCards(cardsData);

searchInput.addEventListener("input", (e) => {
  const searchValue = e.target.value.toLowerCase();
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
});

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
        <i class="bi ${
          favorite ? "bi-heart-fill text-danger" : "bi-heart"
        }"></i>
        <button class="btn btn-outline-primary rounded-pill">
          Add to Cart
        </button>
      </div>
    </div>
  `;

  div.querySelector("button").addEventListener("click", () => {
    alert(`${product} added to cart 🛒`);
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
