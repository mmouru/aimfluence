
import * as THREE from 'three';
import { aimCircles } from './js/game_logic/game_logic';

const deleteMeshAfterTime = 5.0;

/**
 * 
 * @param {THREE.clock} clock 
 */
export function removeMissedTargets(clock, scene) {
    const timeNow = clock.getElapsedTime();
    aimCircles.forEach(circle => {
        if(timeNow - circle.createTime > deleteMeshAfterTime) {
            // remove circle from render
            scene.remove(circle.mesh);
            // discard mesh buffers from memory;
            circle.mesh.geometry.dispose();
            circle.mesh.material.dispose();
        }
    });
}
