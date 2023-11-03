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
/**
 * 注意
 * Vector3 对象有 copy() 和 clone() 方法
 */
// 创建一个三维对象
const v1 = new THREE.Vector3(1, 2, 3)
// 克隆一份三维对象
const v2 = v1.clone()
const v3 = new Vector3()
// 复制一份属性
v3.copy(v1)
/**
 * 克隆一份网格对象
 * 注意：
 * 克隆的网格对象与源网格对象
 * 共享相同的几何体和材质！
 */
const mesh2 = mesh.clone()
mesh2.position.x = 70
/**
 * 如何解决共享问题？如下：
 * 把几何体和材质也进行克隆并
 * 设置到克隆的网格模型，这样两个
 * 网格模型独享各自的几何体和材质！
 */
mesh2.material = mesh.material.clone()
mesh2.geometry = mesh.geometry.clone()
// 修改克隆的网格模型的颜色，两个模型的颜色会不一致！
mesh2.material.color.set(0x00ff00)
// position 对象是 Vector3 对象的实例，故可以调用其方法
// 通过复制，设置源网格模型位置与克隆模型一致
mesh.position.copy(mesh2.position)
// 往上移，让源网格模型显示在上方
mesh.position.y = 70
export {mesh, mesh2}
