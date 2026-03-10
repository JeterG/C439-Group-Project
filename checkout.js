document.addEventListener('DOMContentLoaded', () => {
    const subtotalEl = document.getElementById('checkout-subtotal');
    const deliveryEl = document.getElementById('checkout-delivery');
    const taxEl = document.getElementById('checkout-tax');
    const totalEl = document.getElementById('checkout-total');

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

    updateSummary();
});
