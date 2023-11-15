import * as THREE from "three";
import {camera} from "./camera";
import {AxesHelper} from "three";


const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300, 300),
        new THREE.MeshStandardMaterial({
        color: 0xffffff,
    })
)
plane.rotateX(-Math.PI / 2)
// 设置平面接收光源的投射阴影
plane.receiveShadow = true

const box = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshStandardMaterial({
        color: 0x00ffff
    })
)
box.position.y = 25
// 开启模型的投射阴影
box.castShadow = true

const model = new THREE.Group()


model.add(plane, box)
export {model,plane, box}