var cameras = getAllCameras();

cameras.then(function(response) {
    
    const cameraCard = document.querySelector('#cameraCard');

    for (let camera of response) {
        
        cameraCard.innerHTML += 
        
        `
        <a href="product.html?id=${camera._id}"> 
        <div class="card m-3">
            <img class="card-img-top" src="${camera.imageUrl}" alt="${camera.name}">
            <div class="card-body">
                <h5 class="card-title">${camera.name}</h5>
                <p class="card-text">${camera.description}</p>
            </div>
        </div>
        </a>
        `
    }
})
