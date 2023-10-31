import * as THREE from 'three';
import { aimSpheres, gameStarted, startBasicGame, } from './game_logic';
import { clock, scene } from '../../main';
import { createSparkAnimation } from '../models/animations';
import { ShootingTarget, startGameElement } from '../models/environment';
import { currentSettings } from './settings';

/// score for aim trainer
export let score = 0;
export let accuracy = "100";

let hits = 0;
let shots = 0

const scoreMeterValue = document.getElementById("score") as HTMLSpanElement;
const accuracyMeterValue = document.getElementById("accuracy") as HTMLSpanElement;

const raycaster = new THREE.Raycaster();

const shootSound = document.getElementById("shoot1") as HTMLAudioElement;;
shootSound.volume = 0.1;
let currentAudio: HTMLAudioElement | undefined = undefined;

export function resetStats() {
    hits = 0;
    shots = 0;
    score = 0;
}

function updateAccuracy() {
    if (shots === 0) {
        accuracy = "100";
    } else {
        accuracy = (hits / shots * 100).toFixed(2);
        accuracyMeterValue.textContent = accuracy;
    }
};

function incrementScore() {
    score += 1000;
    hits++;
    scoreMeterValue.textContent = score.toString();
};

function playAudio(audioElement: HTMLAudioElement) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = audioElement;
    audioElement.play();
};

export function fire(camera : THREE.Camera, scene: THREE.Scene) {
    const origin = camera.position;
    const direction = camera.getWorldDirection(new THREE.Vector3());
    raycaster.set(origin, direction);
    
    if (currentSettings.sounds) {
        playAudio(shootSound);
    };
    
    const intersects = raycaster.intersectObjects(scene.children);
    const object_ids = intersects.map(intersect => intersect.object.uuid);

    if (gameStarted) {
        shots++;
    }

    if (intersects.length > 0) {
        // start game if hitting the start button
        if (object_ids.includes(startGameElement.uuid) && !gameStarted) {
            startGameElement.visible = false;
            startBasicGame(clock, scene);
        }
        else {
            
            // need indention fix for this part
            aimSpheres.forEach((circle, index) => {

            //console.log(circle)
            if (object_ids.includes(circle.mesh.uuid)) {
                const intersection = intersects.find((intersection) => intersection.object.uuid === circle.mesh.uuid);
                console.log(intersection)
                const point = intersection!.point;
                const normal = intersection!.normal!;
                createSparkAnimation(point.x, point.y, point.z, normal);
                scene.remove(circle.mesh);
                circle.mesh.geometry.dispose();
                aimSpheres.splice(index, 1); // remove the sphere
                
                // add new target to screen to always have 3
                const newTarget = new ShootingTarget();
                aimSpheres.push(newTarget);
                scene.add(newTarget.mesh);
                incrementScore();
            }
        });
        }
    }
    updateAccuracy();
}
