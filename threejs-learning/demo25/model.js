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
// 创建点材质
const material = new THREE.PointsMaterial(({
    // 点的颜色
    color: 0xff0000,
    // 点的大小
    size: 10,
}))
const point = new THREE.Points(geometry, material)

export {point}
