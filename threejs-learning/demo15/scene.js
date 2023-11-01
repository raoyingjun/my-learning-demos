import * as THREE from 'three'
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建圆柱体的一个框架
const sphere = new THREE.CylinderGeometry(50, 80, 100);
// 材质（理解成上色、着色、外观）：设置会受光源影响的红色材质
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, // 材质颜色
})


const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(600)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
const pointLight = new THREE.PointLight(0xffffff, 1000000)
// 设置点光源的位置
pointLight.position.set(300, 300, 300);
scene.add(pointLight);
export {scene}