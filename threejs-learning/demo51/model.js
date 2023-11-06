import * as THREE from 'three'
import {Vector3} from "three";

const loader = new THREE.TextureLoader()
const texture = loader.load('./bird.png')
/**
 * Texture.offset 继承 Vector2
 * 故其父类的方法和属性可直接使用，
 * 部分用法如下：
 */
texture.offset.x = .5 // 在单位1内，贴图向左偏移 0.5 个单位
texture.offset.setY(.4) // 在单位1内，贴图向下偏移 0.4 个单位

const geometry = new THREE.PlaneGeometry(200, 100)

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
export {group}

