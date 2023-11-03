import * as THREE from 'three';
import {group} from "./model";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();
// 把 Group 添加到场景
scene.add(group)
/**
 * 在 Scene 里面添加 Group,
 * 又在 Group 里面添加 Mesh1 和 Mesh2
 * 就像一个树形结构的层级模型，像这样：
 * Scene---Group---Mesh1
 *           \
 *            \
 *             \
 *             Mesh2
 */
console.log(scene.children)
console.log(group.children)

// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(150)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
console.log(scene)
// 设置并添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 10)
scene.add(ambientLight)

export {scene}