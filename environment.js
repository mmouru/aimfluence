import * as THREE from 'three';

const hexColors = {
    gray: 0x808080,
    white: 0xf0f0f0
}

function createPlaneMaterial(hexColor) {
    return new THREE.MeshBasicMaterial({ color: hexColor });
}
// floor
const planeGeometry = new THREE.PlaneGeometry(25, 25); // Width and height of the plane
const plane = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.green));

plane.rotation.x = -Math.PI / 2;

// aim wall
const plane2 = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.gray));
plane2.rotation.x = -Math.PI;
plane2.rotation.z = -Math.PI;
plane2.position.z += 12.5;
plane2.position.y += 7.5;

export { plane, plane2 };