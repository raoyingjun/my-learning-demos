import * as THREE from 'three'
// 顶点坐标数据，需要使用类型化数据（Typed Array）存放
const vertices = new Float32Array([
    0, 0, 0, // 顶点坐标0
    80, 0, 0, // 顶点坐标1
    80, 80, 0, // 顶点坐标2
    0, 0, 0, // 顶点坐标3
    80, 80, 0, // 顶点坐标4
    0, 80, 0, // 顶点坐标5
])
// 定义
const normals = new Float32Array([
    0, 0, 1, // 该法线坐标参照顶点坐标0
    0, 0, 1, // 该法线坐标参照顶点坐标1
    0, 0, 1, // 该法线坐标参照顶点坐标2
    0, 0, 1, // 该法线坐标参照顶点坐标3
    0, 0, 1, // 该法线坐标参照顶点坐标4
    0, 0, 1, // 该法线坐标参照顶点坐标5
])
// 定义一个缓冲几何体（没有任何顶点坐标数据，也就是空几何体）
const geometry = new THREE.BufferGeometry();
/**
 * 定义一个缓冲属性，可以存放顶点坐标数据
 * array：顶点坐标数据的数组
 * itemSize：数据中每几个数组项作为一个顶点坐标坐标。
 * 本示例中，数组中每三项数据作为一个顶点坐标坐标，分
 * 别对应 x、y、z。
 */
const attrs = new THREE.BufferAttribute(vertices, 3)

// 将存放了顶点坐标数据的属性设置到几何体
geometry.attributes.position = attrs
/**
 * 定义一个缓冲属性，可以存放顶点坐标法线数据。
 * 正确设置法线，光源材质才能正常显示！
 * 本例中，法线坐标以顶点坐标坐标为参照
 * array：法线数组
 * itemSize：数据中每几个数组项作为一个法线坐标。
 * 本示例中，法线数组中每三项数据（x, y, z）作为一个法线坐标
 */
// 依据顶点坐标索引构建几何体
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide
})
/**
 * 使用自定义顶点坐标的几何图形及材质创建三角形网格模型
 * 知识点：
 * 一，网格模型本身是由无数个三角形组织拼接的。如矩形、平面、球形等
 * 二，顶点坐标坐标中每三个顶点坐标的位置构成一个三角形
 * 三，Threejs 中三角形有正面和反面。如何区分正反面？设组成三角形的三个顶点坐标分
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
