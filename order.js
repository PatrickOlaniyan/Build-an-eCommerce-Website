var url = new URL(window.location.href);

var params = new URLSearchParams(url.search);

orderId = params.get("orderId");
firstName = params.get("firstName");
lastName = params.get("lastName");
total = params.get("total");

const displayName = document.querySelector('#name');

displayName.innerHTML += `${firstName} ${lastName}`

const displayOrderId = document.querySelector('#orderId');

displayOrderId.innerHTML += `${orderId} `

const displayTotal = document.querySelector('#total');

displayTotal.innerHTML += `${total} `