import * as THREE from 'three'
import {model} from "./model";
import {OrbitControls} from "three/addons";
import {camera} from "../demo06/camera";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();
// 把网格模型添加到场景
scene.add(model)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(100)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
console.log(scene)
export {scene}