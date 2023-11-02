import * as THREE from 'three'

/**
 * 知识补充：
 * Threejs 中所有几何体都继承于父类 BufferGeometry。
 * 故，父类中的属性和方法均被子类继承
 */
const geometry = new THREE.PlaneGeometry(100, 100,)
// x, y, z 轴的缩放系数
geometry.scale(2, 2, 2);
// x, y, z 轴的平移量
geometry.translate(100, 0, 0)
// 绕 x 轴旋转 30°
geometry.rotateX(Math.PI / 6)
// 使用 Transform 变换后，将几何体重新居中
geometry.center()
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide,
})
const mesh = new THREE.Mesh(geometry, material)
export {mesh}
