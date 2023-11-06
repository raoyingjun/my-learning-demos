import * as THREE from 'three'
import {Vector3} from "three";

const loader = new THREE.TextureLoader()
const texture = loader.load('./floor.png')
// 水平方向以重复贴图的方式进行包裹
texture.wrapS = THREE.RepeatWrapping
// 垂直方向以重复贴图的方式进行包裹
texture.wrapT = THREE.RepeatWrapping
/**
 * 水平和垂直方向各重复12次。（12 * 12）
 * Texture.repeat 是 Vector2 类型对象
 * 包含 Vector2.set() 等等
 */
texture.repeat.set(12, 12)
const geometry = new THREE.PlaneGeometry(400, 400)

const material = new THREE.MeshBasicMaterial({
    // 注意纹理贴图会和 color 颜色叠加。
    // color 为白色，不影响贴图效果，设置与否均可
    color: 0xffffff,
    // 贴图到材质上
    map: texture
})
const mesh = new THREE.Mesh(geometry, material)
// 设置地板的方位在地面上，以符合人的视觉感官
mesh.rotateX(-Math.PI / 2)
const group = new THREE.Group()
// 添加网格模型到这个组
group.add(mesh)
export {group}

