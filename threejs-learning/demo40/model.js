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
// Group 作为组，可以将任意个网格模型添加到这个组，
// 整个组看做一个整体交互和显示
const group = new THREE.Group()
// 添加 mesh 到这个组
group.add(mesh)
// 添加 mesh2 到这个组
group.add(mesh2)
// 或者
// group.add(mesh, mesh2)
// 或者
// group.add(mesh).add(mesh2)

// 将组向上平移（组内所有对象都会受影响平移）
group.translateY(70)
// 将组绕 y 轴旋转（组内所有对象都会受影响旋转）
group.rotateY(Math.PI / 6)

/**
 * 注意：
 * 受 Threejs 历史影响，这样也可以定义组。
 * Group 对象和 Object3D 本质区别不大，Group 对象
 * 只是语义化更好。
 */
const group2 = new THREE.Object3D()
//
/**
 * 甚至，你还可以像下面这样使用。直接在一个网格模型
 * 中添加另一个网格模型。
 * 注意：
 * Scene 对象也有 add()，你应该能感觉这也是类似的。
 * 是的没错！像 Scene 对象，也与上面的 Group 对象类似。
 */
// mesh.add(mesh2)
export {group}
