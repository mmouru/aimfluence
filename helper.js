
import * as THREE from 'three';
import { aimCircles } from './game_logic';

const deleteMeshAfterTime = 5.0;

/**
 * 
 * @param {THREE.clock} clock 
 */
export function removeMissedTargets(clock, scene) {
    const timeNow = clock.getElapsedTime();
    aimCircles.forEach(circle => {
        console.log(circle.createTime);
        console.log(clock.getElapsedTime())
        if(timeNow - circle.createTime > deleteMeshAfterTime) {
            // remove circle from render
            scene.remove(circle.mesh);
            // discard mesh buffers from memory;
            circle.mesh.geometry.dispose();
            circle.mesh.material.dispose();
        }
    });
}
