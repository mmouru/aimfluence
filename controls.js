
import { 
    stopMovingForward,
    startMovingForward,
    startMovingRight,
    stopMovingRight,
    startMovingLeft,
    stopMovingLeft,
    startMovingBackward,
    stopMovingBackward,
} from './movement';

// Initial values when the game loads


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
 * @param {*} camera 
 */
function setupKeyLogger(cube, camera) {
    document.onkeydown = function(event) {
        let key = event.code;
        let dir = null;
        console.log(event)
        if (key === "KeyW") {
            startMovingForward();
        }
        else if (key === "KeyS") {
            startMovingBackward();
        }
        else if (key === "KeyA") {
            startMovingLeft();
        }
        else if (key === "KeyD") { 
            startMovingRight();
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

    document.onkeyup = function(event) {
        let key = event.code;
        if (key === "KeyW") {
            stopMovingForward();
        }
        else if (key === "KeyD") { 
            stopMovingRight();
        }
        else if (key === "KeyA") {
            stopMovingLeft();
        }
        else if (key === "KeyS") {
            stopMovingBackward();
        }
    }
}

export { setupKeyLogger };