import * as THREE from 'three';
import { aimSpheres } from '../game_logic/game_logic';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { camera } from './camera';
import { ambientLight, directionalLight } from './lightning';
import { crosshair } from './crosshair';

interface ExclusionRangeForXY {
    x: number[],
    y: number[]
};

// Constants for sphere target ranges in world
const maxX = 20; const minX = 10; 
const maxY = 12; const minY = -3;
// constant for little more space in between spheres
const lambda = 0.1;

const skyboxSize = 512;

const sphereRadius = 1;

const hexColors = {
    gray: 0x808080,
    white: 0xf0f0f0,
    red: 0xd32213,
    green: 0x6a9e32,
    orange: 0xf37413
}

const modelLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

function createPlaneMaterial(hexColor: number, transparent?: boolean, opacity?: number) {
    return new THREE.MeshBasicMaterial({ color: hexColor, transparent: transparent, opacity: opacity });
}

function createPhongMaterial(hexColor: number) {
    return new THREE.MeshPhongMaterial({color: hexColor, shininess: 60, specular: 0x00139E})
}

function createSphereMesh() {
    const geometry = new THREE.SphereGeometry( sphereRadius, 32, 16 ); 
    const sphere = new THREE.Mesh(geometry, createPhongMaterial(hexColors.orange))
    sphere.castShadow = true;
    sphere.position.z += 13;
    return sphere;
}

// sky box
const skyboxGeo = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);


const spaceTextureUrls = [
                            'textures/sky_lf.jpg',
                            'textures/sky_rt.jpg',
                            'textures/sky_up.jpg',
                            'textures/sky_dn.jpg',
                            'textures/sky_ft.jpg',
                            'textures/sky_bk.jpg',
                        ];

const texture = textureLoader.load("textures/tekstuuri.png");
const startGameTexture = textureLoader.load("textures/start.jpg");
const logoTexture = textureLoader.load("textures/logo.png");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 10, 10 );

const blackTexture = spaceTextureUrls.map(txt => new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide }));

const spaceSkyboxMaterial = spaceTextureUrls.map(url => new THREE.MeshBasicMaterial({ map: textureLoader.load(url), side: THREE.BackSide }));

let skyboxMaterial = spaceSkyboxMaterial;

let skybox = new THREE.Mesh(skyboxGeo, skyboxMaterial);

/**
 * Update skybox geometrys textures during rendering
 * @param texture Unique texture defined in settings
 */
export function changeSkyBoxTexture(texture: string) {
    console.log("TÄÄLLÄ ASTI", texture);
    switch(texture) {
        case("space"):
            skybox.material = spaceSkyboxMaterial;
            break;
        case("black"):
            console.log("black sky")
            skybox.material = blackTexture;
            break;
        default:
            skybox.material = spaceSkyboxMaterial;
            break;
    }
}

/**
 *  GLTF LOADER FOR ARENA
 */

function add3DModelsToScene(scene: THREE.Scene) {

    modelLoader.load('models/room.glb', function (gltf) {
        const model = gltf.scene;
        //model.rotation.x -= (Math.PI / 180) *;
        model.position.y += 1;
        var mat;
        var geo;
        gltf.scene.traverse( function( object ) {            
                       if ((object instanceof THREE.Mesh))
                        {   
                            object.receiveShadow = true;
                            mat = object.material;
                            geo = object.geometry;
                            mat.map = texture;
                        }
                    });
        scene.add(model); })
};

// start game button
const material = new THREE.MeshBasicMaterial({ map: startGameTexture });
const planeGeometry = new THREE.PlaneGeometry(10, 3);
const startGameElement = new THREE.Mesh(planeGeometry, material);
startGameElement.rotation.y += (Math.PI / 180) * 180;
startGameElement.position.z += 14.9;
startGameElement.position.y += 7;

// logo to show
const logoMaterial = new THREE.MeshBasicMaterial({ map: logoTexture, transparent: true });
const logoGeometry = new THREE.PlaneGeometry(20, 5);
const logoElement = new THREE.Mesh(logoGeometry, logoMaterial);
logoElement.rotation.y += (Math.PI / 180) * 180;
logoElement.position.z += 14.9;
logoElement.position.y += 12;

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

export function createSceneWithCameraAndModels() : { scene: THREE.Scene, camera: THREE.PerspectiveCamera }  {
    const scene = new THREE.Scene();
    // add binary 3D models to scene
    add3DModelsToScene(scene);
    // add skybox
    scene.add(skybox);
    // add lightning
    scene.add(ambientLight, directionalLight);
    // add crosshair;
    scene.add(crosshair);
    // add start play button, logo
    scene.add(startGameElement, logoElement);
    // add camera
    scene.add(camera);

    return {scene, camera};
};

export { skybox, startGameElement, logoElement };
