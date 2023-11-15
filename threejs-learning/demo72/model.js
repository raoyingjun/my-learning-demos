import * as THREE from "three";
import {camera} from "./camera";
import {AxesHelper} from "three";


const model = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 300),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
)

model.position.setX(30)

export {model}