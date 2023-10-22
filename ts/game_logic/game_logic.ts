//import * as THREE from 'three';
import { ShootingTarget } from '../models/environment';
import { mouseMoveEvent } from '../controls/handle_cursor';
let gameStarted = false;
// force pointerlock when opening game first time
//document.body.requestPointerLock();

export let aimCircles: ShootingTarget[] = [];

document.addEventListener("pointerlockchange", lockChangeAlert, false);
const settingsDiv = document.querySelector('#settings') as HTMLDivElement;

function lockChangeAlert () {
    if (document.pointerLockElement === document.body) {
        document.addEventListener('mousemove', mouseMoveEvent);
        settingsDiv.style.display = 'none';
    } else {
        document.removeEventListener('mousemove', mouseMoveEvent);
        settingsDiv.style.display = 'block';
    }
};

export function startBasicGame(clock: THREE.Clock, scene: THREE.Scene) {
    gameStarted = true;
    // init three spheres
    for( let i = 0; i < 3; i++) {
        const sphere = new ShootingTarget();
        aimCircles.push(sphere);
        scene.add(sphere.mesh);
    };
};

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
        
