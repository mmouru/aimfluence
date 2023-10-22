import * as THREE from 'three';
import { aimCircles } from './game_logic';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createSparkAnimation } from '../../main';
import { ShootingTarget } from '../models/environment';

const raycaster = new THREE.Raycaster();

const shootSound = document.getElementById("shoot1") as HTMLAudioElement;;
shootSound.volume = 0.1;
let currentAudio: HTMLAudioElement | undefined = undefined;

const loader = new GLTFLoader();



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
    
    playAudio(shootSound);

    const intersects = raycaster.intersectObjects(scene.children);
    const object_ids = intersects.map(intersect => intersect.object.uuid);
    console.log(intersects)
    if (intersects.length > 0) {
        aimCircles.forEach((circle, index) => {

            //console.log(circle)
            if (object_ids.includes(circle.mesh.uuid)) {
                const intersection = intersects.find((intersection) => intersection.object.uuid === circle.mesh.uuid);
                const point = intersection!.point;
                createSparkAnimation(point.x, point.y, point.z);
                scene.remove(circle.mesh);
                circle.mesh.geometry.dispose();
                aimCircles.splice(index, 1); // remove the sphere

                // add new target to screen to always have 3
                const newTarget = new ShootingTarget();
                aimCircles.push(newTarget);
                scene.add(newTarget.mesh);
            }
        });
    }
}
