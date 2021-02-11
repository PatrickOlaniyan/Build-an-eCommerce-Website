function getAllCameras() {
    return new Promise(function (resolve) {
        var cameras = new XMLHttpRequest();
        cameras.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            }
        }
        cameras.open("GET", "http://localhost:3000/api/cameras/");
        cameras.send();
    })
}

function getCamera(id) {
    return new Promise(function (resolve) {
        var camera = new XMLHttpRequest();
        camera.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            }
        }
        camera.open("GET", "http://localhost:3000/api/cameras/" + id);
        camera.send();
    })
}

function postOrder(orderCameras) {
    return new Promise(function (resolve) {
        var cameras = new XMLHttpRequest();
        cameras.onreadystatechange = function () {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
                var response = JSON.parse(this.responseText);
                resolve(response);
            }
        }
        cameras.open("POST", "http://localhost:3000/api/cameras/order");
        cameras.setRequestHeader('Content-Type', 'application/json');
        cameras.send(JSON.stringify(orderCameras));
    })
}