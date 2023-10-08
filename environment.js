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

function createCircleMesh() {
    const circleGeometry = new THREE.CircleGeometry(0.5, 32);
    return new THREE.Mesh(circleGeometry, createPlaneMaterial(hexColors.red))
}

// aim wall
const shootingWall = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.gray));
shootingWall.rotation.x = -Math.PI;
shootingWall.rotation.z = -Math.PI;
shootingWall.position.z += 12.5;
shootingWall.position.y += 7.5;

/**
 * 
 * @param {THREE.Mesh} target 
 */
function calculatePositionForTarget(target) {
    target.rotation.x = -Math.PI;
    target.rotation.z = -Math.PI;
    target.position.z += 12.4;
    target.position.y += Math.random() * 20;
    target.position.x += Math.random() * 20;
}

export class ShootingTarget {
    constructor(createTime) {
        this.createTime = createTime;
        this.mesh = createCircleMesh();
        calculatePositionForTarget(this.mesh);
    }
}



export { plane, shootingWall };