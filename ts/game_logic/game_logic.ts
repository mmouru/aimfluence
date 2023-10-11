//import * as THREE from 'three';
import { ShootingTarget, shootingWall } from '../models/environment';

let gameStarted = false;
// force pointerlock when opening game first time
//document.body.requestPointerLock();

export let aimCircles: ShootingTarget[] = [];

document.addEventListener("pointerlockchange", lockChangeAlert, false);

function lockChangeAlert () {
    if (document.pointerLockElement === document.body) {
        document.addEventListener('mousemove', mouseMoveEvent);
    } else {
        console.log("moro")
    }
}

export function startGame(clock: THREE.Clock, scene: THREE.Scene) {
    gameStarted = true;
    let k = 0;
    setInterval(() => {
        if ( k < 11) {
        const circle = new ShootingTarget(clock.getElapsedTime());
        aimCircles[k] = circle;
        scene.add(circle.mesh)
        k++;
        }
    }, 5000);
};
        
