import * as THREE from 'three';
import {mesh} from "./model";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();
// 把点模型添加到场景
scene.add(mesh)
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