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


mesh.position.x = 100
const group = new THREE.Group()
group.add(mesh)
group.position.x = 50
/**
 * 在上面两次设置 Position 中：
 * 在设置了网格模型和组在 x 轴上的位置后，
 * 能发现，两次设置的值是叠加的。
 * 由上引出“局部坐标（本地坐标）”和“世界坐标”
 * 局部坐标指的是网格模型他自身的 Position。
 * 世界坐标指的是网格模型自身以及父模型的 Position 坐标的累加
 */

const v3 = new THREE.Vector3()
// 返回世界坐标保存到 Vector3 对象。这是规范写法，请务必遵循
mesh.getWorldPosition(v3)
console.log(v3) // v3.x => 150。(100 + 50)

// 创建一个坐标辅助方便观察
const meshAxesHelper = new THREE.AxesHelper(100)
mesh.position.y = 80
mesh.add(meshAxesHelper)
export {group}
