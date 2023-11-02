import * as THREE from 'three'

/**
 * 知识补充：
 * Threejs 中所有几何体都继承于父类 BufferGeometry。
 * 故，父类中的属性和方法均被子类继承
 */
const geometry = new THREE.PlaneGeometry(
    100,
    100,
    // 平面几何体在水平方向上分成两段
    2,
    // 平面几何体在垂直方向上分成三段
    3,
    /**
     * 一，依我看分段对平面材质的表现好像没啥影响
     * 只有设置 material.wireframe 才能看
     * 出其被分段了。
     * 二，但是，对于曲面。细分数越多，表面越光滑。比如
     * 球体，细分数越多，三角形（几何体大都是由三角
     * 形组合拼接成的）和顶点数量越多，越光滑圆润。
     * 同时消耗的性能也更多。
     * 不好理解第”二“点？拿正多边形举例，正多边形的边
     * 越多越光滑越逼近圆
     */
)
// 创建网格材质
const material = new THREE.MeshLambertMaterial({
    // 线条的颜色
    color: 0xff0000,
    side: THREE.DoubleSide,
    wireframe: true, // 显示构成材质的线（方便观测顶点结构）
})
const mesh = new THREE.Mesh(geometry, material)
// 查看索引
console.log(geometry.index)
// 查看坐标位置
console.log(geometry.attributes.position)
// 查看法线
console.log(geometry.attributes.normal);
export {mesh}
