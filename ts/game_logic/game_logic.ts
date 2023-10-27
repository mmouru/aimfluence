//import * as THREE from 'three';
import { ShootingTarget } from '../models/environment';
import { mouseMoveEvent } from '../controls/handle_cursor';
import { score, resetStats } from './shooting';
import { startingCircle } from '../models/environment';
import { scene } from '../../main';

export let gameStarted = false;

// force pointerlock when opening game first time
//document.body.requestPointerLock();

export let aimSpheres: ShootingTarget[] = [];
export let hiscore = 0;
export let gameStartTime: number;

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

function showScoreMeters() {
    const scoreMeters = document.querySelectorAll('.meters') as NodeListOf<Element>;
    scoreMeters.forEach((element) => {
        const div = element as HTMLElement;
        div.style.visibility = "visible";
    })
};

export function startBasicGame(clock: THREE.Clock, scene: THREE.Scene) {
    gameStarted = true;
    gameStartTime = clock.getElapsedTime();
    showScoreMeters();
    // init three spheres
    for( let i = 0; i < 3; i++) {
        const sphere = new ShootingTarget();
        aimSpheres.push(sphere);
        scene.add(sphere.mesh);
    };
};

export function stopGame() {
    gameStarted = false;
    // clear leftover spheres from screen
    aimSpheres.forEach(leftOverSphere => {
        scene.remove(leftOverSphere.mesh);
        leftOverSphere.mesh.geometry.dispose();
    });
    
    // update hiscore if new one is made and set points back to zero
    if (score > hiscore) {
        hiscore = score;
        // displaySerpentine();
    };
    resetStats();
    startingCircle.visible = true;
    // display startgame and hiscore in cube
};
