// Build on index.js in order to build the frame that is displayed in the search grid
const PAGE_SIZE = 9; // 3 rows of 3
let currentPage = 0;
let filteredResults = [];

function buildCard(item) {
  return `
    <div class="col">
      <div class="card h-100">
        <img src="${item.image}" alt="${item.name}" class="card-img-top">
        <div class="card-body text-center p-2">
          <span class="tag mb-1 d-block">${item.category}</span>
          <h6 class="fw-bold mb-1">${item.name}</h6>
          <p class="text-success fw-bold mb-2">${item.price}</p>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <input type="number" class="form-control form-control-sm text-center" value="1" min="1" style="width:60px;">
            <button class="btn btn-success btn-sm"><i class="bi bi-cart-plus"></i> Add</button>
          </div>
        </div>
      </div>
    </div>`;
}

// Render only the current page slice of filteredResults
function renderPage() {
  const start = currentPage * PAGE_SIZE;
  const end = Math.min(start + PAGE_SIZE, filteredResults.length);
  const pageItems = filteredResults.slice(start, end);

  document.getElementById("resultsGrid").innerHTML = pageItems
    .map(buildCard)
    .join("");

  // Counter and buttons
  document.getElementById("resultCount").textContent =
    filteredResults.length === 0
      ? "0 results"
      : start + 1 + "–" + end + " of " + filteredResults.length;

  document.getElementById("prevBtn").disabled = currentPage === 0;
  document.getElementById("nextBtn").disabled = end >= filteredResults.length;
}

// Keep track of the tags that are going to be posted, build them and then display them
function render() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  filteredResults = products.filter(function (item) {
    const matchesSearch =
      query === "" ||
      item.name.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.tags.some(function (tag) {
        return tag.includes(query);
      });
    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every(function (tag) {
        return item.tags.includes(tag);
      });
    return matchesSearch && matchesTags;
  });

  // Reset to first page whenever filters/search change
  currentPage = 0;
  renderPage();
}

document.getElementById("searchInput").addEventListener("input", render);

document.getElementById("prevBtn").addEventListener("click", function () {
  currentPage--;
  renderPage();
});

document.getElementById("nextBtn").addEventListener("click", function () {
  currentPage++;
  renderPage();
});

buildTagUI();
render();
