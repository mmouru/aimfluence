
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

/**
 * 
 * @param {*} cube 
 * @param {*} camera 
 */
export function setupKeyLogger(cube, camera) {
    document.onkeydown = function(event) {
        let key = event.code;
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
