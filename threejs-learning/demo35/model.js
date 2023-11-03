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
 * 知识点：Euler 是一个三维欧拉对象，是可以用来
 * 表示网格模型的角度数据对象之一，
 * 另一个是 Quaternion 四元数对象。
 * Euler 对象拥有 x, y, z, set() 等属性和方法，
 * 可以直接进行设置和调用。
 * 而 mesh.rotation 是一个 Euler 对象，
 * 支持所有 Euler 操作，例如：
 */
// 绕 x 轴旋转
mesh.rotation.set(Math.PI / 9, 0, 0)
// 绕 y 轴旋转
mesh.rotation.y = Math.PI / 4
/**
 * 再上一步的基础上再旋转
 * 注意：
 * 根据 mesh.rotateX/Y/Z 的源码，
 * 推测其内部使用的是  Quaternion 四元数对象
 * 来表示网格模型的角度数据
 */
mesh.rotateY(Math.PI / 4)
export {mesh}
