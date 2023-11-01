import * as THREE from 'three'
// 场景：创建三维场景，用于存放物体
const scene = new THREE.Scene();

// 盒子（理解成骨架、框架）：创建圆形平面的一个框架
const sphere = new THREE.CircleGeometry(50);
// 材质（理解成上色、着色、外观）：设置会受光源影响的红色材质
const material = new THREE.MeshLambertMaterial({
    color: 0x0000ff, // 材质颜色
    /**
     * 默认平面材质是仅单面（正面）可见，可以调整：
     * FrontSide 正面可见
     * DoubleSide 双面可见（正反面都可以看到）
     */
    side: THREE.DoubleSide,
})


const mesh = new THREE.Mesh(sphere, material)
scene.add(mesh)
// 添加辅助坐标轴。
// size：每条轴的长度
const axesHelper = new THREE.AxesHelper(600)
// 把辅助坐标轴添加到场景
scene.add(axesHelper)
// 设置环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 40)
scene.add(ambientLight);
export {scene}