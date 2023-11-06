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
// 设置该网格不可见
// mesh.visible = false
// 设置组不可见，注意，组里面的元素都会不可见
// group.visible = false
// 设置组不可见，注意，组里面的元素都会不可见
// 克隆一份材质，防止引用同一个对象
mesh.material = material.clone()
// 直接设置材质不可见，网格也会不可见。
// 材质决定外观，外观不可见，那网格不可见理所当然
mesh2.material.visible = false

export {group}
