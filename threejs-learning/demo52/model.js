import * as THREE from 'three'
import {Vector3} from "three";

const loader = new THREE.TextureLoader()
const texture = loader.load('./line.png')
// 水平方向以重复贴图的方式进行包裹
texture.wrapS = THREE.RepeatWrapping
/**
 * 水平和垂直方向各重复12次。（12 * 12）
 * Texture.repeat 是 Vector2 类型对象
 * 包含 Vector2.set() 等等
 */
texture.repeat.x = 4
const geometry = new THREE.PlaneGeometry(200, 50)

const material = new THREE.MeshBasicMaterial({
    // 如果不允许透明度可能有黑边，设置透明可以只显示不透明的部分
    transparent: true,
    // 贴图到材质上
    map: texture
})
const mesh = new THREE.Mesh(geometry, material)
// 设置箭头图标的方位在地面上，以符合人的视觉感官
mesh.rotateX(-Math.PI / 2)

const group = new THREE.Group()
// 添加网格模型到这个组
group.add(mesh)
export {group, texture}

