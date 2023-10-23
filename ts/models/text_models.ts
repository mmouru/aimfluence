import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

const loader = new FontLoader();

let textGeometry: any;
loader.load('/node_modules/three/examples/fonts/optimer_bold.typeface.json', function (font) {
    console.log(font);
    textGeometry = new TextGeometry("moro", {
      font: font,
      size: 100,      // Size of the text
      height: 100,     // Thickness of the text
    });
    
});
const material = new THREE.MeshNormalMaterial();
const textMesh = new THREE.Mesh(textGeometry, material);
console.log(textMesh)

export { textMesh };

