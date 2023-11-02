import * as THREE from 'three'
import {GUI} from "three/addons/libs/lil-gui.module.min";

const WIDTH = 800,
    HEIGHT = 600,
    RATE = WIDTH / HEIGHT;
/**
 * 相机：用于 3D 场景的呈现，用相机来模拟现实中的视角。
 * 有点类似 CSS 中 3D 动画的 Perspective，定义一个
 * 呈现 3D 元素的透视点
 */
const camera = new THREE.PerspectiveCamera(50, RATE, 0.2, 2000)
/**
 * Camera 相关概念参照视频讲解：
 * https://www.bilibili.com/video/BV14r4y1G7h4/?p=7&spm_id_from=pageDriver&vd_source=d3eb8039ed509b4da23ee8cd508456f6
 * PerspectiveCamera(fov, aspect, near, far)
 * fov 相机所能看到的视角，值越大相机可以看到的视角越大
 * aspect 视椎体的宽高比，一般与 Canvas 画布的宽高比一致。
 *        我的理解视椎体就是相机从一个m:n比例的视野透过去看物体。
 *        即：相机 -> 近裁截面（m:n） -> 网格模型（物体）->远裁截面（m:n）
 * near 近裁截面距离相机的距离。
 *      相机 -> 近裁截面（near） -> 网格模型（物体）->远裁截面（m:n）
 *      |___________________|
 * far 远裁截面距离相机的距离。
 *      相机 -> 近裁截面（near） -> 网格模型（物体）->远裁截面（m:n）
 *      |___________________________________________________|
 */
// 设置相机的位置（相机位于哪里）
const gui = new GUI()
camera.position.set(400, 400, 400);
// gui传入数组生成下拉框调节器
gui.add(camera.position, 'z', [300, 400, 500])
/** gui传入对象生成的下拉框调节器。
 * 属性名作为选项的显示名称
 * 属性值作为选项的对应值
 */
gui.add(camera.position, 'y', {
    '相机往上点': 300,
    '相机再往上点': 400,
    '相机再再往上点': 500
})
// 设置相机视线，用于设置相机要看向哪里
camera.lookAt(0, 0, 0)


export {WIDTH, HEIGHT, camera}