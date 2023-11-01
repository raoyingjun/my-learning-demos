import * as THREE from 'three'
import {GUI} from "three/addons/libs/lil-gui.module.min";
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建正方体的一个框架
const box = new THREE.BoxGeometry(100, 100, 100);
// 材质（理解成上色、着色、外观）：红色材质
const material = new THREE.MeshLambertMaterial({
    color: 0xff0000,
})
// 网格模型（物体）：用盒子和材质抽象出物体
const mesh = new THREE.Mesh(box, material)
// 设置物体在场景中的位置
mesh.position.set(0, 0, 0)
// 把网格模型添加到场景
scene.add(mesh)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(100)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
console.log(scene)

const pointLight = new THREE.PointLight(0xffffff, 100000)
pointLight.position.set(100, 200, 200)
scene.add(pointLight)

// 创建 GUI 对象，可视化调试工具会自动呈现到页面
const gui = new GUI()
/**
 * 参数分别为：指定对象、要实时更新的对象属性、滚动条的最小值、滚动条的最大值
 * 被 add 的对象属性，会在滚动条位置改变时实时更新属性值
 */
// .name()：设置这个调节项的名称
gui.add(pointLight.position, 'x', 0, 400).name('light position x')
// .step()：设置这个调节项的步长
gui.add(pointLight.position, 'y', 0, 400).step(50)
/**
 * .onChange() 当值被改编
 * value：改变后的属性值
 */
gui.add(pointLight.position, 'z', 0, 400).onChange((value) => {
    // value => 更新后的 z 值
    console.log('value', value)
})
gui.add(mesh.position, 'x', 0, 400)
gui.add(mesh.position, 'y', 0, 400).name('mesh.position.y')
gui.add(mesh.position, 'z', 0, 400)

const colorConfig = {color: 0x00ff00}
/**
 * 参数分别为：指定对象、要实时更新的对象属性
 * add() 和 addColor（） 功能类似，但后者会生成一个取色器
 */
gui.addColor(colorConfig, 'color').onChange((v) => {
    // 当取色盘的颜色改变，更新材质的颜色
    mesh.material.color.set(v)
})
export {scene}