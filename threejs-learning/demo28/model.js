import * as THREE from 'three'
// 顶点数据，需要使用类型化数据（Typed Array）存放
const vertices = new Float32Array([
    0, 0, 0,
    80, 0, 0,
    80, 80, 0,
    0, 0, 0,
    80, 80, 0,
    0, 80, 0,
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

// 创建网格材质
const material = new THREE.MeshBasicMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide
})
/**
 * 使用自定义顶点的几何图形及材质创建三角形网格模型
 * 知识点：
 * 一，网格模型本身是由无数个三角形组织拼接的。如矩形、平面、球形等
 * 二，顶点坐标中每三个顶点的位置构成一个三角形
 * 三，Threejs 中三角形有正面和反面。如何区分正反面？设组成三角形的三个顶点分
 * 别记为 a，b，c，如下：
 * a
 * |\
 * | \
 * |  \
 * |   \
 * ------
 * b     c
 * 依次连接 a->b->c 会发现连接顺序是逆时针,
 * 接着，在脑海中建立 3D 视图，从背面看这个三角形，背面视图如下：
 *    a
 *    /|
 *   / |
 *  /  |
 * /   |
 * ------
 * c     b
 * 再次依次连接 a->b->c 会发现连接顺序是顺时针。
 * 以上就是 Threejs 中区分三角形正反面的方式
 */
const rectMesh = new THREE.Mesh(geometry, material)

export {rectMesh}
