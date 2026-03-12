document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cart-items-container");
  const countEl = document.getElementById("cart-count");

  const subtotalEl = document.getElementById("cart-subtotal");
  const deliveryEl = document.getElementById("cart-delivery");
  const taxEl = document.getElementById("cart-tax");
  const totalEl = document.getElementById("cart-total");

  const clearBtn = document.getElementById("clear-cart-btn");

  function renderCart() {
    container.innerHTML = "";

    if (cartItems.length === 0) {
      container.innerHTML = `<div class="empty-cart-message text-center py-5">
                <h5>Your cart is empty</h5>
                <p class="text-muted mb-0">Add some groceries to your cart.</p>
                </div> `;

      updateSummary();
      return;
    }

    cartItems.forEach((item, index) => {
      const row = document.createElement("div");
      row.className =
        "cart-item d-flex justify-content-between align-items-center";

      row.innerHTML = `<div>
                <h6 class="mb-1">${item.name}</h6>
                <small class="text-muted">$${item.price.toFixed(2)} each</small>
                </div>

                <div class="d-flex align-items-center gap-3">
                <input type="number" min="1" value="${item.qty}" class="form-control form-control-sm qty-input" style="width:70px">
                <span class="fw-semibold">$${(item.price * item.qty).toFixed(2)}</span>
                <button class="btn btn-sm btn-outline-danger remove-btn">✕</button>
                </div> `;

      const qtyInput = row.querySelector(".qty-input");
      const removeBtn = row.querySelector(".remove-btn");

      qtyInput.addEventListener("change", () => {
        item.qty = parseInt(qtyInput.value) || 1;
        renderCart();
      });

      removeBtn.addEventListener("click", () => {
        cartItems.splice(index, 1);
        renderCart();
      });

      container.appendChild(row);
    });

    countEl.textContent = `${cartItems.length} item${cartItems.length > 1 ? "s" : ""}`;

    updateSummary();
  }

  function updateSummary() {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const delivery = subtotal > 0 ? 5 : 0;
    const tax = subtotal * 0.15;
    const total = subtotal + delivery + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    deliveryEl.textContent = `$${delivery.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  clearBtn.addEventListener("click", () => {
    cartItems.length = 0;
    renderCart();
  });

  renderCart();
});
