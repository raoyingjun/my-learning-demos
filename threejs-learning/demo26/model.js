import * as THREE from 'three'
// 顶点数据，需要使用类型化数据（Typed Array）存放
const vertices = new Float32Array([
    0, 0, 0,
    50, 0, 0,
    0, 100, 0,
    0, 0, 10,
    0, 0, 100,
    50, 0, 10,
])
// 定义一个缓冲几何体（没有任何顶点数据，也就是空几何体）
const geometry = new THREE.BufferGeometry();
/**
 * 定义一个缓冲属性，可以存放顶点数据
 * array：顶点数据的数组
 * itemSize：数据中每几个数组项作为一个顶点坐标。
 * 本示例中，数组中每三项数据作为一个顶点坐标，分
 * 别对应 x、y、z。
 */
const attrs = new THREE.BufferAttribute(vertices, 3)
// 将存放了顶点数据的属性设置到几何体
geometry.attributes.position = attrs
// 创建线材质
const material = new THREE.LineBasicMaterial(({
    // 线条的颜色
    color: 0xff0000,
}))
/**
 * 使用自定义顶点的几何图形及材质创建线模型
 * Line 创建常规线模型
 * LineLoop 相比于 Line 线模型，最后
 * 一个顶点会和第一个顶点连接，形成闭合
 * LineSegments 非连续的线模型。每两个
 * 顶点之间的线条是一段有、一段无、如此往
 * 返。比如存在顶点 a、b、c、d、e，用”-“
 * 进行连接，那么结果大致是：a-b c-d e
 */
const line = new THREE.Line(geometry, material)

export {line}
