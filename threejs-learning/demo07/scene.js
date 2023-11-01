import * as THREE from 'three'
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建正方体的一个框架
const box = new THREE.BoxGeometry(100, 100, 100);
// 材质（理解成上色、着色、外观）：设置会受光源影响的红色材质
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000, // 材质颜色
})
// 网格模型（物体）：用盒子和材质抽象出物体
const mesh = new THREE.Mesh(box, material)
// 设置物体在场景中的位置
mesh.position.set(0, 10, 0)
// 把网格模型添加到场景
scene.add(mesh)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(100)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
/**
 * 环境光（AmbientLight）：会发散到物体的每个方位。类似白天，人每个地方都会被照到，
 * 点光源（PointLight）：光纤像太阳一样发散
 * 平行光源（DirectionalLight）：只朝着某个方位发散
 * 聚光灯光源（SpotLight）：光线像手电筒一样发散
 * color：光源颜色
 * intensity：光照强度
 */
const pointLight = new THREE.PointLight(0xffffff, 100000)
// 设置点光源的位置
pointLight.position.set(-200, -300, -300);
scene.add(pointLight)
// 创建一个点光源辅助观察对象，可以显示点光源的位置，方便观察
const pointLightHelper = new THREE.PointLightHelper(pointLight, 10)
scene.add(pointLightHelper)

export {scene}
