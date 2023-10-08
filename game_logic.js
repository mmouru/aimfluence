import * as THREE from 'three';
import { ShootingTarget, shootingWall } from './environment';

let gameStarted = false;

export let aimCircles = [];

/**
 * 
 * @param {THREE.scene} scene
 * @param {THREE.Clock} clock 
 */
export function startGame(clock, scene) {
    gameStarted = true;
    let k = 0;
    while ( k < 11) {
        const circle = new ShootingTarget(clock.getElapsedTime());
        aimCircles[k] = circle;
        scene.add(circle.mesh)
        k++;
    }
       
};
