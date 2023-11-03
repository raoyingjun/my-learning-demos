import * as THREE from 'three'
import {Vector3} from "three";

/**
 * 知识补充：
 * Threejs 中所有几何体都继承于父类 BufferGeometry。
 * 故，父类中的属性和方法均被子类继承
 */
const geometry = new THREE.PlaneGeometry(100, 100)
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide,
})
const mesh = new THREE.Mesh(geometry, material)
/**
 * Material 对象。
 * 材质都继承了 Material对象。
 * 继承了其的属性和方法，如：
 * transparent, opacity,
 * color 属性等
 */

// 允许透明
material.transparent = true
// 设置透明度
material.opacity = .5
/**
 * 材质面 Side
 * THREE.FrontSide 正面
 * THREE.BackSide 背面
 * THREE.DoubleSide 双面
 */
// 设置材质哪面可见
material.side = THREE.BackSide
export {mesh}
