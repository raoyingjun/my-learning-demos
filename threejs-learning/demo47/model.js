import * as THREE from 'three'
import {Vector3} from "three";

// uv 顶点坐标，要使用的贴图的尺寸
// 注意是相对单位
const uvs = new Float32Array([
    0, 0, // 左下
    1, 0, // 右下
    1, 1, // 右上
    0, 1  // 左上
])
const uvs2 = new Float32Array([
    0, 0, // 左下
    .5, 0, // 右下
    .5, .5, // 右上
    0, .5  // 左上
])
// 几何体的顶点坐标
const vertices = new Float32Array([
    0, 0, 0, // 左下
    100, 0, 0, // 右下下
    100, 50, 0, // 右上
    0, 50, 0  // 左上
])
// 使用索引引用顶点坐标构建矩形
const indexes = new Uint16Array([
    0, 1, 2, 0, 2, 3
])

/**
 * TextureLoader 纹理贴图加载器
 * 利用该 API 加载图片然后可以贴图到材质上
 */
const loader = new THREE.TextureLoader()
const texture = loader.load('./earth.jpeg')

const geometry = new THREE.BufferGeometry()
geometry.index = new THREE.BufferAttribute(indexes, 1)
geometry.attributes.position = new THREE.BufferAttribute(vertices, 3)
// 根据 uv 顶点坐标，决定要使用的贴图的尺寸
geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2)
// 值使用贴图左下角部分尺寸
geometry.attributes.uv = new THREE.BufferAttribute(uvs2, 2)
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
