// Build on index.js in order to build the frame that is displayed in the search grid
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

// Keep track of the tags that are going to be posted, build them and the ndisplay them through getting the tags or by the filtered tag
function render() {
  const query = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  const filtered = products.filter(function (item) {
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

  const filteredCards = filtered.map(buildCard);
  const filteredHTML = filteredCards.join("");

  document.getElementById("resultsGrid").innerHTML = filteredHTML;
  document.getElementById("resultCount").textContent =
    filtered.length + " result(s)";
}

document.getElementById("searchInput").addEventListener("input", render);

buildTagUI();
render();
