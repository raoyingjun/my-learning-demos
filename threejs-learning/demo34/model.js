import * as THREE from 'three'
import {Vector3} from "three";

/**
 * 知识补充：
 * Threejs 中所有几何体都继承于父类 BufferGeometry。
 * 故，父类中的属性和方法均被子类继承
 */
const geometry = new THREE.BoxGeometry(50, 50, 50)
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide,
})
const mesh = new THREE.Mesh(geometry, material)
// 设置物体在场景中的位置
/**
 * 知识点：Vector3 是一个三维向量对象。该
 * 对象拥有 x, y, z, set() 等属性和方法，
 * 可以直接进行设置和调用。
 * 而 mesh.position 是一个 Vector3 对象，
 * 支持所有 Vector3 操作，例如：
 */
mesh.position.set(0, 0, 0)
// 或者
mesh.position.x = 60
/**
 * 知识点：Vector3 是一个三维向量对象。该
 * 对象拥有 x, y, z, set() 等属性和方法，
 * 可以直接进行设置和调用。
 * 而 mesh.scale 是一个 Vector3 对象，
 * 支持所有 Vector3 操作，例如：
 */
mesh.scale.set(1.5, 1.5, 1.5)
// 或者
mesh.scale.x = 1
// 或者
mesh.position.x = 60
/**
 * 知识点：TranslateX/Y/Z 本质上改变的是 Position.X/Y/Z 属性的分量。
 * 本例中， translateX() 方法改变了 mesh.position.x 的分量。
 * 则实际在 Mesh 在 x 轴上的位置为 60 + 100 = 160
 */
mesh.translateX(20)

// 创建一个三维向量
const v = new Vector3(1, 1, 1)
// 把向量转变为单位向量
v.normalize()
/**
 * 沿着单位向量平移
 * 单位向量 v 在 x, y, z 三个轴方位均有设置，
 * 故 Mesh 在三个轴方向都会产生平移效果
 */
mesh.translateOnAxis(v, 80)
export {mesh}
