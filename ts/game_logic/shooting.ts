import * as THREE from 'three';
import { aimCircles } from './game_logic';

const raycaster = new THREE.Raycaster();

const shootSound = document.getElementById("shoot1") as HTMLAudioElement;;
shootSound.volume = 0.1;
let currentAudio: HTMLAudioElement | undefined = undefined;

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
    if (intersects.length > 0) {
        aimCircles.forEach(circle => {
            //console.log(circle)
            if (object_ids.includes(circle.mesh.uuid)) {
                scene.remove(circle.mesh);
                circle.mesh.geometry.dispose();
                aimCircles.pop();
            }
        });
    }
}
