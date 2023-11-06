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
// const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
// directionalLight.position.set(200,200,200)
// scene.add(directionalLight)
/**
 * size：网格辅助系统的尺寸
 * divisions：分割的份数，几乘几
 * color1： 中线的颜色。中线指的是围绕中点的十字轴
 * color2：线条的颜色
 * @type {GridHelper}
 */
const gridHelper = new THREE.GridHelper(300, 32, 0xffff00, 0x00ffff)
// 网格辅助线显示在辅助坐标轴下面，方便观察
gridHelper.position.y = -1
// 辅助坐标轴显示在网格模型上面，方便观察
axesHelper.position.y = 1
scene.add(gridHelper)
/**
 * HemisphereLight 半球光光源。可以创建更加贴近自然的户外效果，该光源不会产生阴影
 * 考虑到了天空和地面的反射
 * skyColor：天空发出的光源的颜色，
 * groundColor：地面发出的光源颜色。
 * 如何理解该光源？
 * 横放一张白纸在空中
 * 白纸上方的光线由天空（skyColor）提供
 * 白纸下方的光线由天空（groundColor）提供
 */
const lightness = new THREE.HemisphereLight(0xffffff, 0x444444);
lightness.position.set(0, 20, 0);
scene.add(lightness);
export {scene}