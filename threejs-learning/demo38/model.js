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

// 访问传入网格模型 Mesh 的几何体 Geometry
console.log(mesh.geometry)
// 访问传入网格模型 Mesh 的几何体 Material
console.log(mesh.material)
// 通过网格模型设置网格材质的颜色
mesh.material.color.set(0xffffff)
// 与上面等价，直接设置网格材质的颜色
material.color.set(0xffffff)
// 通过网格模型平移几何体
mesh.geometry.translate(50, 0, 0)
// 与上面等价，直接平移几何体
geometry.translate(0, 50, 0)

const mesh2 = new THREE.Mesh(geometry, material)
// 设置另一个网格模型的位置
mesh2.position.x = 70
// 修改另一个网格模型的颜色和平移
mesh2.material.color.set(0x00ff00)
mesh2.geometry.translate(0, 50, 0)
/**
 * 能通过预览效果发现，改变了另一个网格材质和几何体的颜色和平移，
 * 两个网格模型的颜色均发生了改变且效果一致。因为两者使用的是同
 * 一个网格材质和几何体，包括其他属性也一样。
 *
 */
export {mesh, mesh2}
