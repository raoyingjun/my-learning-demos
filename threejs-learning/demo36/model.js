import * as THREE from 'three'
import {Vector3} from "three";

/**
 * 知识补充：
 * Threejs 中所有几何体都继承于父类 BufferGeometry。
 * 故，父类中的属性和方法均被子类继承
 */
const geometry = new THREE.BoxGeometry(50, 50, 50)
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide,
})
const mesh = new THREE.Mesh(geometry, material)
/**
 * Color 对象
 * 默认为 白色
 * r、g、b 属性通道取值范围如下：
 * r： 0~1，而不是 0~255
 * g： 0~1，而不是 0~255
 * b： 0~1，而不是 0~255
 */
const c = new THREE.Color()
// material.color 是 Color 对象的实例
// 可以直接使用如下写法修改 color 的值
// 直接设置颜色对象，白色
material.color = c
// r 通道修改为 0，青色
material.color.r = 0
// g 通道修改为 0，蓝色
c.g = 0
// 重新设置为红色，rgb 方式
c.setRGB(1, 0, 0)
// 重新设置为红色，#xxxxxx 方式
c.setStyle('#ff0000')
// 重新设置为红色，16 进制数方式
material.color.setHex(0xff0000)
// 重新设置为红色，直接使用 set() 方法
c.set(1, 0, 0)
material.color.set('#ff0000')
c.set(0xff0000)
export {mesh}
