import * as THREE from 'three'

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

const group = new THREE.Group()
group.add(mesh)
// 修改局部坐标 Group 的原点
group.position.x = 100
// 平移几何体自身
geometry.translate(25, 0, 0)
/**
 * 修改上述两个位置设置后。可以看到网格模型旋转的坐标及原点发生了改变
 * 网格模型相对的局部坐标原点为 Group，绕着 Group 的原点旋转
 * 而几何体自身的位置又发生了平移，所以旋转效果并非在几何体中心点
 */

// 创建一个坐标辅助方便观察
const meshAxesHelper = new THREE.AxesHelper(100)
mesh.position.y = 80
mesh.add(meshAxesHelper)
export {group}
