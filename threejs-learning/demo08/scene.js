import * as THREE from 'three'
import {AmbientLight} from "three";
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
// 设置环境光提高物体整体亮度（多重光源可叠加）
const ambientLight = new AmbientLight(0xffffff, 1.5);
scene.add(ambientLight)


export {scene}