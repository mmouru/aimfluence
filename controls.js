import * as THREE from 'three';

function rotatePlayer(cube, camera, dir) {
    const angleRadians = Math.PI/40; // voi muuttaa, kyse kulmanopeudesta
    let currentPosition = {x: camera.position.x, z:camera.position.z};
    switch(dir){
        case "right":
            cube.rotation.y += angleRadians;
            camera.position.x = currentPosition.x * Math.cos(angleRadians) + currentPosition.z * Math.sin(angleRadians);
            camera.position.z = currentPosition.z * Math.cos(angleRadians) - currentPosition.x * Math.sin(angleRadians);
            camera.rotation.y += angleRadians;
            
            break;
        case "left":
            
            cube.rotation.y -= angleRadians;
            camera.position.x = currentPosition.x * Math.cos(angleRadians) - currentPosition.z * Math.sin(angleRadians);
            camera.position.z = currentPosition.z * Math.cos(angleRadians) + currentPosition.x * Math.sin(angleRadians);
            camera.rotation.y -= angleRadians;
            break;
    }
}
/**
 * 
 * @param {*} cube 
 * @param {THREE.PerspectiveCamera} camera 
 * @param {*} dir 
 * @param {*} jump 
 */

function moveInUniverse(cube, camera, dir, jump) {
    const cubeStartPosition = cube.position.y;
    //console.log(cubeStartPosition)
    if (jump) {
        for (let i = 0; i <= 30; i++) {
            cube.position.y += 0.05;
            camera.position.y += 0.05
        }
    }
    switch(dir) {
        case "forward":
            //cube.position += camera.direction * 0.1;
            let cameraDir = camera.getWorldDirection(new THREE.Vector3());
            camera.position.copy(camera.getWorldPosition(new THREE.Vector3()).clone().add(cameraDir.multiplyScalar(0.01)))
            //camera.position.copy(camera.position.clone().add(camera.direction.clone().multiplyScalar(0.01)));
            break;
        case "backward":
            cube.position.z += 0.1;
            camera.position.z += 0.1;
            break;
        case "left":
            cube.position.x -= 0.1;
            camera.position.x -= 0.1;
            break;
        case "right":
            cube.position.x += 0.1;
            camera.position.x += 0.1;
            break;
    }
}

function setupKeyLogger(cube, camera) {
    document.onkeydown = function(event) {
        let key = event.code;
        let dir = null;
        console.log(event)
        if (key === "KeyW") {
            dir = "forward";
            moveInUniverse(cube, camera, dir);
        }
        else if (key === "KeyS") {
            dir = "backward";
            moveInUniverse(cube, camera, dir);
        }
        else if (key === "KeyA") {
            dir = "left";
            moveInUniverse(cube, camera, dir);
        }
        else if (key === "KeyD") { 
            dir = "right";
            moveInUniverse(cube, camera, dir);
        }
        else if (key === "Space") {
            moveInUniverse(cube, camera, dir, true)
        }
        else if (key === "KeyQ"){
            rotatePlayer(cube, camera, "right");
        }
        else if (key === "KeyE") {
            rotatePlayer(cube, camera, "left");
        }
        
    }
}

export { setupKeyLogger };