import * as THREE from 'three'
import {Vector3} from "three";

const loader = new THREE.TextureLoader()
const texture = loader.load('./earth.jpeg')

/**
 * radius 圆半斤
 * segments 分段数。分段越多越光滑越圆润。
 * 注意：
 * CircleGeometry 默认提取的 uv 坐标就是一个圆形区域，
 * 故，依据 uv 坐标提取出的纹理贴图只包含圆形区域部分。
 */
const geometry = new THREE.CircleGeometry(50, 64)

const material = new THREE.MeshBasicMaterial({
    // 注意纹理贴图会和 color 颜色叠加。
    // color 为白色，不影响贴图效果，设置与否均可
    color: 0xffffff,
    // 贴图到材质上
    map: texture
})
const mesh = new THREE.Mesh(geometry, material)
const group = new THREE.Group()
// 添加网格模型到这个组
group.add(mesh)
export {group}