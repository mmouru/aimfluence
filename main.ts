import * as THREE from 'three';
import { setupKeyLogger } from './ts/controls/controls.js';
import { playerMove } from './ts/controls/movement.js';
import { stopGame, gameStarted, gameStartTime } from './ts/game_logic/game_logic';
import { crosshair } from './ts/models/crosshair.js';
import { createSceneWithCameraAndModels } from './ts/models/environment';
import { mixer } from './ts/models/animations.js';

// FOR STOPWATCH, NEED TO MOVE LOGIC SOMEWHERE IN FUTURE
const stopWatchElement = document.getElementById('time') as HTMLParagraphElement;

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.autoClear = false;
document.body.appendChild( renderer.domElement );

var havePointerLock = 'pointerLockElement' in document ||
    'mozPointerLockElement' in document ||
    'webkitPointerLockElement' in document;

let crosshairPosition = new THREE.Vector3();

const {scene, camera} = createSceneWithCameraAndModels();

const clock = new THREE.Clock();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  });

function animate() {
	requestAnimationFrame( animate );
    let delta = clock.getDelta();
    mixer.update(delta);
    playerMove(camera, delta);
    
    camera.getWorldDirection(crosshairPosition);
    crosshairPosition.multiplyScalar(10);
    crosshairPosition.add(camera.position);
    crosshair.position.copy(crosshairPosition);
    crosshair.lookAt(camera.position);
    if (gameStarted) {
        let stopWatch = (clock.getElapsedTime() - gameStartTime);
        stopWatch = Math.round(60 - stopWatch);
        let stopWatchString: string
        if (stopWatch < 10) {
            stopWatchString = "0:0" + stopWatch.toString();
        } else if (stopWatch === 60) {
            stopWatchString = "1:00";
        } else { stopWatchString = "0:" + stopWatch.toString() };

        stopWatchElement.textContent = stopWatchString;
        if ( stopWatch <= 0) {
            stopWatchElement.textContent = "1:00";
            stopGame(scene);
        }
    }
    renderer.clear(); // to render crosshair mesh on top of everything
	renderer.render( scene, camera );
    renderer.clearDepth(); // to render crosshair mesh on top of everything
    renderer.render( crosshair, camera ); // to render crosshair mesh on top of everything
}



/**
 * Cuben ja kameran liikkuminen maailmassa pitää määritellä tämänhetkisen cameran posen mukaan
 */

setupKeyLogger();
animate();

export { scene, camera, clock };
