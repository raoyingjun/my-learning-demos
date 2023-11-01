import * as THREE from 'three'
import {DirectionalLightHelper} from "three";
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
 * 创建一个平行光源辅助观察对象。
 * Tip：平行光源的一个反射知识点。（投影到物体上）
 * 光源打在物体上跟真实世界是类似的，
 * 如有一个正方体，光源打在前上方，
 * 那么上面会比较亮，左、右侧面会暗一点。
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
// 平行光的位置
directionalLight.position.set(50, 100, 60)
// 光源要照射的位置
directionalLight.target = mesh
scene.add(directionalLight)
/**
 * light：要观察的光源
 * size：略
 * color:略
 */
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5, 0xff0000)
scene.add(directionalLightHelper)
export {scene, mesh}