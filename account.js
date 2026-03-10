let email = '';

// Sample orders for mockup
const sampleOrders = [
    {
        orderNumber: 12345,
        date: '2026-03-01',
        total: 45.67,
        status: 'Delivered',
    },
    {
        orderNumber: 12346,
        date: '2026-03-03',
        total: 23.89,
        status: 'Processing',
    },
    {
        orderNumber: 12347,
        date: '2026-03-05',
        total: 78.23,
        status: 'Shipped',
    },
];

function validatePassword() {
    password = document.getElementById('registerPassword').value;
    confirmPassword = document.getElementById('registerConfirmPassword').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return false; // stops form submission
    }

    email = document.getElementById('registerEmail').value;
    alert('Registration successful!'); // shows success message
    hideLoginRegister(); // hides login/register section and shows account section
    document.getElementById('registerForm').reset(); // resets registration form
    return false; // prevent page submission
}

function validateLogin() {
    email = document.getElementById('loginEmail').value;
    alert('Login successful!');
    hideLoginRegister(); // hides login/register section and shows account section
    document.getElementById('loginForm').reset(); // resets login form
    return false; // prevent form submission
}

function hideLoginRegister() {
    document.getElementById('accountLoginRegister').classList.add('d-none');
    document.getElementById('accountSection').classList.remove('d-none');
    document.getElementById('accountWelcome').textContent =
        `Welcome, ${email}!`;
    document.getElementById('accountEmail').textContent = email;
    populateOrderHistory();
}

function logout() {
    email = '';
    document.getElementById('accountLoginRegister').classList.remove('d-none');
    document.getElementById('accountSection').classList.add('d-none');
    document.getElementById('accountWelcome').textContent = '';
    document.getElementById('accountEmail').textContent = '';
    alert('You have been logged out.');
}

function populateOrderHistory() {
    const ul = document.getElementById('orderHistory');
    ul.innerHTML = ''; // Clear existing items

    sampleOrders.forEach((order) => {
        const li = document.createElement('li');
        li.classList.add(
            'list-group-item',
            'd-flex',
            'justify-content-between',
            'align-items-center',
        );

        // Color code the status badge
        let badgeClass = 'bg-secondary';
        if (order.status === 'Delivered') badgeClass = 'bg-success';
        else if (order.status === 'Shipped') badgeClass = 'bg-info';
        else if (order.status === 'Processing') badgeClass = 'bg-warning';

        // Add the sample list items
        li.innerHTML = `
            <div>
                <strong>Order #${order.orderNumber}</strong><br>
                Date: ${order.date}<br>
                Total: $${order.total.toFixed(2)}
            </div>
            <span class="badge ${badgeClass} rounded-pill">${order.status}</span>
        `;

        ul.appendChild(li);
    });
}
