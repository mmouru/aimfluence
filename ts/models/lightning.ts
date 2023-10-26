import * as THREE from 'three';
import { camera } from './camera';

const ambientLight = new THREE.AmbientLight( 0x404040, 30);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(0, 30, 0);
directionalLight.target.position.set(0, 0, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = 3
directionalLight.shadow.camera.far = camera.far;
directionalLight.shadow.camera.left = -15
directionalLight.shadow.camera.right = 15
directionalLight.shadow.camera.bottom = -15
directionalLight.shadow.camera.top = 15

directionalLight.shadow.mapSize.x = 2048;
directionalLight.shadow.mapSize.y = 2048;

export { ambientLight, directionalLight }
