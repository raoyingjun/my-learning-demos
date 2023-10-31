import * as THREE from 'three'
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建正方体的一个框架
const box = new THREE.BoxGeometry(100, 100, 100);
// 材质（理解成上色、着色、外观）：红色材质
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000
})
// 网格模型（物体）：用盒子和材质抽象出物体
const mesh = new THREE.Mesh(box, material)
// 设置物体在场景中的位置
mesh.position.set(0, 10, 0)
// 把网格模型添加到场景
scene.add(mesh)
console.log(scene)

export {mesh}