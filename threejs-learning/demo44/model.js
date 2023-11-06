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
const mesh2 = new THREE.Mesh(geometry, material)
// x 轴方向偏移，方便预览观察
mesh2.translateX(70)

const group = new THREE.Group()
// 添加 mesh 到这个组
group.add(mesh)
// 添加 mesh2 到这个组
group.add(mesh2)
console.log(group.children.length) // 2
/**
 * 在组里面移除这个网格
 * Group、Scene、Mesh，等等。
 * 都继承自 Object3D，都具有其 remove方法
 */
group.remove(mesh2)
console.log(group.children.length) // 1
export {group}
