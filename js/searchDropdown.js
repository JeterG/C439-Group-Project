let activeTags = [];

// Rebuilds the dropdown and active tag list whenever a tag is toggled
function buildTagUI() {
  // Marked active tags
  document.getElementById("tagDropdownMenu").innerHTML = tags
    .map(function (tag) {
      const isActive = activeTags.includes(tag);
      return `<li><a class="dropdown-item tag-option ${isActive ? "active" : ""}" href="#" data-tag="${tag}"><i class="bi ${isActive ? "bi-check2" : "bi-plus"} me-1"></i>${tag}</a></li>`;
    })
    .join("");

  //  Show selected tags and nothing if they are not selected
  document.getElementById("activeTagList").innerHTML = activeTags.length
    ? activeTags
        .map(function (tag) {
          return `<span class="tag active-tag me-1 mb-1" data-tag="${tag}">${tag} <i class="bi bi-x"></i></span>`;
        })
        .join("")
    : '<span class="text-muted small">No tags selected</span>';
}

// toggle a tag if it's already selected
document
  .getElementById("tagDropdownMenu")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const option = e.target.closest(".tag-option");
    if (!option) return;

    const tag = option.getAttribute("data-tag");
    const tagIndex = activeTags.indexOf(tag);

    if (tagIndex === -1) {
      activeTags.push(tag); // tag not in list, add it
    } else {
      activeTags.splice(tagIndex, 1); // tag already in list, remove it
    }

    buildTagUI();
    render();
  });

//remove active tag
document
  .getElementById("activeTagList")
  .addEventListener("click", function (e) {
    const tagEl = e.target.closest(".active-tag");
    if (!tagEl) return;

    const tag = tagEl.getAttribute("data-tag");
    const tagIndex = activeTags.indexOf(tag);
    activeTags.splice(tagIndex, 1); // remove tag at that index

    buildTagUI();
    render();
  });

//remove all active tags
document.getElementById("clearTagsBtn").addEventListener("click", function () {
  activeTags = [];
  buildTagUI();
  render();
});

buildTagUI();
