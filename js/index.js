// Immport hte products.js before this file in the html so that the variales can be loaded

const PAGE_SIZE = 4;
let page = 0;

// Builds the strucutre of the body card for the products that will be displayed in the final section of the index.html
function buildCard(item) {
  return `
    <div class="col">
      <div class="card h-100">
        <img src="${item.image}" alt="${item.name}" class="card-img-top">
        <div class="card-body text-center p-2">
          <span class="badge bg-secondary mb-1 d-block">${item.category}</span>
          <h6 class="fw-bold mb-1">${item.name}</h6>
          <p class="text-success fw-bold mb-0">${item.price}</p>
        </div>
      </div>
    </div>
  `;
}

// Keep track of the total nuber of products that are going to be displayed
function render() {
  const start = page * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, products.length);

  const pageItems = products.slice(start, end);//The range of the images that are going to be slected
  const pageCards = pageItems.map(buildCard);
  const pageHTML = pageCards.join("");

  document.getElementById("carouselTrack").innerHTML = pageHTML;

  document.getElementById("prevBtn").disabled = page === 0;
  document.getElementById("nextBtn").disabled = end >= products.length;
  document.getElementById("carouselCounter").textContent =
    start + 1 + "–" + end + " of " + products.length;
}

document.getElementById("prevBtn").addEventListener("click", function () {
  page--;
  render();
});

document.getElementById("nextBtn").addEventListener("click", function () {
  page++;
  render();
});

render();
