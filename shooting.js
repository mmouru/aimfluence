import * as THREE from 'three';
import { aimCircles } from './game_logic';

const raycaster = new THREE.Raycaster();

export function fire(camera, scene) {
    const origin = camera.position;
    const direction = camera.getWorldDirection(new THREE.Vector3());

    raycaster.set(origin, direction);

    const intersects = raycaster.intersectObjects(scene.children);
    const object_ids = intersects.map(intersect => intersect.object.uuid);
    if (intersects.length > 0) {
        console.log(object_ids, "no moroo");
        aimCircles.forEach(circle => {
            //console.log(circle)
            if (object_ids.includes(circle.mesh.uuid)) {
                console.log("osui")
                scene.remove(circle.mesh);
                circle.mesh.geometry.dispose();
                circle.mesh.material.dispose();
                aimCircles.pop();
            }
        });
    }
}
