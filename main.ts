import * as THREE from 'three';
import { setupKeyLogger } from './ts/controls/controls.js';
import { playerMove } from './ts/controls/movement.js';
import { stopGame, gameStarted, gameStartTime } from './ts/game_logic/game_logic';
import { crosshair } from './ts/models/crosshair.js';
import { createSceneWithCameraAndModels } from './ts/models/environment';
import { mixer } from './ts/models/animations.js';
import { updateCrosshairLocation } from './ts/models/crosshair.js';
import { updateUserInterfaceStopWatchTime } from './ts/models/ui.js';
import { checkForSettingsInLocalStorage } from './ts/game_logic/settings.js';

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

const {scene, camera} = createSceneWithCameraAndModels();

checkForSettingsInLocalStorage();

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
    updateCrosshairLocation();
    
    if (gameStarted) {
        updateUserInterfaceStopWatchTime(clock.getElapsedTime());
    };
    renderer.clear(); // to render crosshair mesh on top of everything
	renderer.render( scene, camera );
    renderer.clearDepth(); // to render crosshair mesh on top of everything
    renderer.render( crosshair, camera ); // to render crosshair mesh on top of everything
}

setupKeyLogger();
animate();

export { scene, camera, clock };
