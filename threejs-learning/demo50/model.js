import * as THREE from 'three'
import {Vector3} from "three";

const loader = new THREE.TextureLoader()
const texture = loader.load('./arrow.png')
const geometry = new THREE.PlaneGeometry(50, 50)

const material = new THREE.MeshBasicMaterial({
    // 如果不允许透明度可能有黑边，设置透明可以只显示不透明的部分
    transparent: true,
    // 贴图到材质上
    map: texture
})
const mesh = new THREE.Mesh(geometry, material)
// 设置箭头图标的方位在地面上，以符合人的视觉感官
mesh.rotateX(-Math.PI / 2)
// 网格模型显示在网格辅助线上面，方便观察
mesh.position.y = 1
const group = new THREE.Group()
// 添加网格模型到这个组
group.add(mesh)
export {group}

