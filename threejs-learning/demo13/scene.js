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
// 生成10*10个网格
const makeMeshes = () => {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            // 网格模型（物体）：用盒子和材质抽象出物体
            const mesh = new THREE.Mesh(box, material)
            // 设置物体在场景中的位置
            mesh.position.set(j * 200, 0, i * 200)
            // 把网格模型添加到场景
            scene.add(mesh)
        }

    }

}
makeMeshes()
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(800)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
const pointLight = new THREE.PointLight(0xffffff, 100000)
// 设置点光源的位置
pointLight.position.set(400, 400, 400);
scene.add(pointLight)
export {scene}