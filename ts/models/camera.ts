import * as THREE from 'three';

const camera = new THREE.PerspectiveCamera( 74, window.innerWidth / window.innerHeight, 0.1, 2000 );
camera.position.set(0,4,-6);
camera.rotation.x -= Math.PI / 180;

export { camera }

