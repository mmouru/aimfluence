
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


export function setupKeyLogger() {
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
        // keycode 27
        else if (key === "Escape") {
            
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
