import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as THREE from 'three'


//createApp(App).mount('#app')

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, .1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight);

const geometry = new THREE.BoxGeometry(
    1.3, // Width
    1, // Height
    1, // Depth
    1, // Width segments
    1, // Height segments
    1, // Depthy segments
);
const material = new THREE.MeshBasicMaterial( { color: 0xAAA000 } );

const cube = new THREE.Mesh(
    geometry,
    material
);
// For eventlisteners
const raycaster = new THREE.Raycaster();

scene.add( cube );
camera.position.z = 2.13;

const addObjectClickListener = (
    camera: THREE.Camera,
    scene: THREE.Scene,
    raycaster: THREE.Raycaster,
    objectToWatch: THREE.Mesh,
  ) => {
    const objectToWatchId = objectToWatch.uuid;
    let mouse = new THREE.Vector2();

    document.addEventListener(
      "click",
      (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children);

        const isIntersected = intersects.find(
          (intersectedEl) => intersectedEl.object.uuid === objectToWatchId
        );

        // When clicked
        if (isIntersected) {
            let v = 0.13/9;
            xAxisRotate(cube, v)
            yAxisRotate(cube, v)
            zAxisRotate(cube, v)
            randomColor(cube);
        }
      },
      false
    );
};

addObjectClickListener(camera, scene, raycaster, cube)

function randomColor(object: THREE.Mesh) {
    const hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    var hexColor = '0x';

    for (let i = 0; i < 6; i++) {
        hexColor += hexChars [parseInt( (Math.random() * hexChars.length) + '')];
    }
    const newRandomColor = new THREE.Color();
    newRandomColor.setHex(parseInt(hexColor));

    object.material = new THREE.MeshBasicMaterial( { color: newRandomColor } );
}

function xAxisRotate(
    object: THREE.Mesh,
    speed: number
) {
    object.rotation.z += speed;
}
function yAxisRotate(
    object: THREE.Mesh,
    speed: number
) {
    object.rotation.z += speed;
}
function zAxisRotate(
    object: THREE.Mesh,
    speed: number
) {
    object.rotation.z += speed;
}

function animate() {
	requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
	renderer.render( scene, camera );
    
}
animate();

document.body.appendChild( renderer.domElement );