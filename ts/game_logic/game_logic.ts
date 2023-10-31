//import * as THREE from 'three';
import { ShootingTarget } from '../models/environment';
import { mouseMoveEvent } from '../controls/handle_cursor';
import { score, accuracy, resetStats } from './shooting';
import { startGameElement } from '../models/environment';
import { scene } from '../../main';

export let gameStarted = false;

// force pointerlock when opening game first time
//document.body.requestPointerLock();

export let aimSpheres: ShootingTarget[] = [];
export let hiscore = 0;
export let gameStartTime: number;

document.addEventListener("pointerlockchange", lockChangeAlert, false);
const settingsDiv = document.querySelector('#settings') as HTMLDivElement;
const closeButton = document.getElementById('saveSettings') as HTMLElement;
const waitCircle = document.getElementById('wait-second-circle') as HTMLElement;

function lockChangeAlert () {
    if (document.pointerLockElement === document.body) {
        document.addEventListener('mousemove', mouseMoveEvent);
        settingsDiv.style.display = 'none';
    } else {
        closeButton.style.display = 'none';
        waitCircle.style.display = 'block';
        document.removeEventListener('mousemove', mouseMoveEvent);
        settingsDiv.style.display = 'block';
        setTimeout(() => {
            closeButton.style.display = 'block';
            waitCircle.style.display = 'none';
        }, 1000);

    }
};

/**
 * used to store scores to database for analysis
 */
function addScoresToDB(score: number, accuracy: number) {
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json',
        'X-MS-API-ROLE': 'anonymous'
      }
    const data = {
        currentDateTime: new Date(),
        points: score,
        accuracy: accuracy
    }

    fetch('/data-api/rest/Scores', {method, headers, body: JSON.stringify(data)})
        .then(response => response.json())
        .then(data => {
            console.log(data); // Handle the response data, which may contain the newly created record
        })
        .catch(error => {
            console.error(error); // Handle any errors
        });
}

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


    addScoresToDB(score, parseFloat(accuracy));

    resetStats();
    startGameElement.visible = true;
    // display startgame and hiscore in cube
};
