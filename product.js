var url = new URL(window.location.href);
var params = new URLSearchParams(url.search);

getCamera(params.get("id"))
    .then(function (response) {
        const productHeading = document.querySelector('#productHeading');
        productHeading.innerHTML += response.name + " Camera";

        let formattedPrice = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Math.round(response.price) / 100);
        
        const productCard = document.querySelector('#productCard');
        productCard.innerHTML +=
        `
        <div class="card m-3">
            <img class="card-img-top" src="${response.imageUrl}" alt="${response.name}">
            <div class="card-body">
                <h5 class="card-title">${response.name}</h5>
                <p class="card-text">${response.description}</p>
                <p class="card-text">${formattedPrice}</p>
                <label for="selectLense">Choose your lense: </label>
                <select class="form-select" name="selectLense" id="selectLense">
                </select>
            </div>
        </div>
        <button type="button" class="btn btn-success m-3 p-3" >Add to Cart</button>
        `
        const lenseOption = response.lenses;
        const lenseDropdown = document.querySelector('#selectLense');

        for(let lense = 0; lense < lenseOption.length; lense++){
            let option = document.createElement('option');
            option.value = lenseOption[lense];
            option.innerHTML = lenseOption[lense];
            lenseDropdown.appendChild(option);
        }

        const addCart = document.querySelector('.btn-success');
        addCart.addEventListener('click', function(){
            const selectedProduct = {
                selectedCamera: response._id,
                cameraLense: lenseDropdown.value
            }

            const cart = JSON.parse(localStorage.getItem('cart')) || {}
            const key = `${selectedProduct.selectedCamera}-${selectedProduct.cameraLense}`;

            let quantity = 1;

            if (cart[key]){
                quantity = cart[key]['quantity'] + 1;
            }

            cart[key] = {
                ...response,
                quantity,
                lense: lenseDropdown.value
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert("You have successfully added the item to the cart!");
        })
    }
)