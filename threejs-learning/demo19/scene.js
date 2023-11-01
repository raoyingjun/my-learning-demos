import * as THREE from 'three'
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建圆形平面的一个框架
const sphere = new THREE.SphereGeometry(100);
// 材质（理解成上色、着色、外观）：设置会受光源影响的高光材质
/**
 * MeshBasicMaterial 基础网格材质（仅 MeshBasicMaterial 不受光照影响）
 * MeshLambertMaterial 漫反射网格材质
 * MeshPhongMaterial 高光网格材质
 */
const material = new THREE.MeshPhongMaterial({
    color: 0xff0000, // 材质颜色
    /**
     * 默认平面材质是仅单面（正面）可见，可以调整：
     * FrontSide 正面可见
     * DoubleSide 双面可见（正反面都可以看到）
     * 知识补充：
     * MeshLambertMaterial 是漫反射，朝着各个方向发散，不会那么突兀刺眼
     * MeshPhongMaterial 是镜面反射。镜面反射是聚焦的，类似太阳光打在镜子上，
     * 镜子反射出来的光线会比较聚集特别亮，像高光一样
     */
    shininess: 15, // 高光强度
    specular: 0x444444 // 高光颜色
})


const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(600)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
// 设置环境光
const directionalLight = new THREE.DirectionalLight(0xffffff, 100)
directionalLight.position.set(200, 200, 200)
scene.add(directionalLight);
export {scene}