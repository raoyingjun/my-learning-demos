import * as THREE from "three";
import {camera} from "./camera";


const mesh1 = new THREE.Mesh(
    new THREE.BoxGeometry(200, 200, 200),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
)
const mesh2 = new THREE.Mesh(
    new THREE.BoxGeometry(150, 150, 150),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
    })
)

const model = new THREE.Group()
model.add(mesh1, mesh2)
mesh2.position.x = 200
export {model, mesh1}