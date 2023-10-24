import * as THREE from 'three';
import { currentSettings, SkyboxTexture } from '../game_logic/settings';
import { aimSpheres } from '../game_logic/game_logic';

// Constants for sphere target ranges in world
const maxX = 20; const minX = 10; 
const maxY = 12; const minY = -3;
// constant for little more space in between spheres
const lambda = 0.1;

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

function createPhongMaterial(hexColor: number) {
    return new THREE.MeshPhongMaterial({color: hexColor, shininess: 60, specular: 0x00139E})
}
// floor
const planeGeometry = new THREE.PlaneGeometry(25, 25); // Width and height of the plane
const plane = new THREE.Mesh(planeGeometry, createPlaneMaterial(hexColors.white, true, 0.5));

plane.rotation.x = -Math.PI / 2;

const sphereRadius = 1;

function createSphereMesh() {
    const geometry = new THREE.SphereGeometry( sphereRadius, 32, 16 ); 
    const sphere = new THREE.Mesh(geometry, createPhongMaterial(hexColors.orange))
    sphere.castShadow = true;
    sphere.position.z += 13;
    return sphere;
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

const circleGeometry = new THREE.CircleGeometry(3, 25);
const startingCircle = new THREE.Mesh(circleGeometry, createPlaneMaterial(hexColors.green));
startingCircle.rotation.y += (Math.PI / 180) * 180;
startingCircle.position.z += 12.5;
startingCircle.position.y += 8;

skybox.position.set(0,0,0);

// Helper function to calculate random position for spheres without collision
function getRandomNumberInRangeWithExclusions(max: number, min: number, exclusions: number[][]) {
    let randomValue: number;
    do {
        randomValue = Math.random() * max - min;
    } while (exclusions.some(([exclusionStart, exclusionEnd]) => randomValue >= exclusionStart && randomValue <= exclusionEnd));
    return randomValue;
}

/**
 * 
 * @param {THREE.Mesh} target 
 */
function calculatePositionForTarget(target: THREE.Mesh) {
    // create exclusion ranges so spheres do not stack on top of each other
    const exclusionRangeX: number[][] = [];
    const exclusionRangeY: number[][] = [];
    aimSpheres.forEach(sphere => {
        exclusionRangeX.push(sphere.exclusionRange.x);
        exclusionRangeY.push(sphere.exclusionRange.y);
    });
    target.position.y = getRandomNumberInRangeWithExclusions(maxY, minY, exclusionRangeY);
    target.position.x = getRandomNumberInRangeWithExclusions(maxX, minX, exclusionRangeX);
};

interface ExclusionRangeForXY {
    x: number[],
    y: number[]
};

export class ShootingTarget {
    public createTime: number | undefined;
    public mesh: THREE.Mesh;
    public exclusionRange: ExclusionRangeForXY; // this needs interface in future
    constructor(createTime?: number) {
        this.createTime = createTime || undefined;
        this.mesh = createSphereMesh();
        calculatePositionForTarget(this.mesh);
        const x = this.mesh.position.x;
        const y = this.mesh.position.y;
        this.exclusionRange = {
                                x: [x - (sphereRadius + lambda), x + (sphereRadius + lambda)], 
                                y: [y - (sphereRadius + lambda), y + (sphereRadius + lambda)]
                              };
    }
}

export { plane, skybox, startingCircle };
