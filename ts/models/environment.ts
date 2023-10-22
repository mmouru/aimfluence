import * as THREE from 'three';
import { currentSettings, SkyboxTexture } from '../game_logic/settings';

const hexColors = {
    gray: 0x808080,
    white: 0xf0f0f0,
    red: 0xd32213,
    green: 0x6a9e32,
    orange: 0xf37413
}

function createPlaneMaterial(hexColor: number, transparent?: boolean, opacity?: number) {
    return new THREE.MeshBasicMaterial({ color: hexColor, transparent: transparent, opacity: opacity });
}
// floor
const planeGeometry = new THREE.PlaneGeometry(25, 25); // Width and height of the plane
const plane = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.white, true, 0.5));

plane.rotation.x = -Math.PI / 2;

function createSphereMesh() {
    const geometry = new THREE.SphereGeometry( 1, 32, 16 ); 
    return new THREE.Mesh(geometry, createPlaneMaterial(hexColors.orange))
}
    


// sky box
const skyboxSize = 512;
const skyboxGeo = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);

const textureLoader = new THREE.TextureLoader();
const spaceTextureUrls = [
                            '/assets/textures/sky_lf.jpg',
                            '/assets/textures/sky_rt.jpg',
                            '/assets/textures/sky_up.jpg',
                            '/assets/textures/sky_dn.jpg',
                            '/assets/textures/sky_ft.jpg',
                            '/assets/textures/sky_bk.jpg',
                        ];

const blackTexture = spaceTextureUrls.map(txt => new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }));

const spaceSkyboxMaterial = spaceTextureUrls.map(url => new THREE.MeshBasicMaterial({ map: textureLoader.load(url), side: THREE.BackSide }));

let skyboxMaterial = spaceSkyboxMaterial;

let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);

/**
 * Update skybox geometrys textures during rendering
 * @param texture Unique texture defined in settings
 */
export function changeSkyBoxTexture(texture: SkyboxTexture) {
    switch(texture) {
        case("space"):
            skybox.material = spaceSkyboxMaterial;
            break;
        case("black"):
            skybox.material = blackTexture;
            break;
    }
}



skybox.position.set(0,0,0);

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
    public createTime: number;
    public mesh: THREE.Mesh;
    constructor(createTime: number) {
        this.createTime = createTime;
        this.mesh = createSphereMesh();
        calculatePositionForTarget(this.mesh);
    }
}

export { plane, shootingWall, skybox };
