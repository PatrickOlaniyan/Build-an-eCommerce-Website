const cart = JSON.parse(localStorage.getItem('cart')) || []
let keys = Object.keys(cart);

let counterCart = document.querySelector('#counterCart');
counterCart.innerHTML += `${keys.length}`;

const cartDetails = document.querySelector('#cartDetails');
 
let totalPrice = 0;

for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    productPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart[key].price / 100);
    quantityPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart[key].price / 100 * cart[key].quantity);
    totalPrice += cart[key].quantity * cart[key].price / 100;

    cartDetails.innerHTML += 
    `
    <li class="list-group-item d-flex justify-content-between lh-sm">
        <div>
            <h6 class="my-0">${cart[key].name} - ${cart[key].lense}</h6>
            <span class="text-muted">Item price: ${productPrice}</span>
            <br>
        </div>
        <div class="d-flex flex-column" >
        <span>${quantityPrice}</span>
        <span class="text-muted">Quantity: ${cart[key].quantity}</span>
    </li>
    `
}

totalFormattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);

cartDetails.innerHTML +=
`
<li class="list-group-item d-flex justify-content-between">
    <span>Total (USD)</span>
    <strong>${totalFormattedPrice}</strong>
</li>
`

const buttonDanger = document.querySelector('.btn-danger');
buttonDanger.addEventListener('click', function() {
    localStorage.clear();
    location.reload();
    }
);

const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const total = totalFormattedPrice;
    const orderCameras = {
        products: [],
        contact: {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            address: e.target.address.value,
            city: e.target.city.value,
            email: e.target.email.value,
        }
    }
    let products = orderCameras.products;
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const product = cart[key];
        const productsOrder = product._id;
        products.push(productsOrder);
    }
    if(e.target.firstName.value && e.target.lastName.value && e.target.address.value && e.target.city.value && e.target.email.value){
        postOrder(orderCameras)
        .then((resp) => {
            localStorage.removeItem('cart');
            window.location.href = `order.html?orderId=${resp.orderId}&firstName=${resp.contact.firstName}&lastName=${resp.contact.lastName}&total=${total}`
    })
    }
});