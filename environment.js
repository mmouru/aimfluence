import * as THREE from 'three';

const hexColors = {
    gray: 0x808080,
    white: 0xf0f0f0,
    red: 0xd32213,
    green: 0x6a9e32
}

function createPlaneMaterial(hexColor) {
    return new THREE.MeshBasicMaterial({ color: hexColor });
}
// floor
const planeGeometry = new THREE.PlaneGeometry(25, 25); // Width and height of the plane
const plane = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.white));

plane.rotation.x = -Math.PI / 2;

const circleGeometry = new THREE.CircleGeometry(0.5, 32);
const circle = new THREE.Mesh(circleGeometry, createPlaneMaterial(hexColors.red))
circle.rotation.x = -Math.PI;
circle.position.z += 12.4;
circle.position.y += 7.5;
// aim wall
const plane2 = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.gray));
plane2.rotation.x = -Math.PI;
plane2.rotation.z = -Math.PI;
plane2.position.z += 12.5;
plane2.position.y += 7.5;

export { circle, plane, plane2 };