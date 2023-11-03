import * as THREE from 'three'

/**
 * 生成多个建筑
 * @param h 建筑高度
 * @param y 建筑距离地面的高度
 * @param z 建筑在前在后的位置值
 * @param buildings {THREE.Group} 用于保存生成的多个建筑
 */
const makeBuildings = (h, y, z, buildings, name) => {
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.BoxGeometry(50, h, 50)
        const material = new THREE.MeshLambertMaterial({color: 0xff0000, side: THREE.DoubleSide,})
        const building = new THREE.Mesh(geometry, material)
        building.position.y = y
        building.position.x = i * 80
        building.position.z = z
        // 设置网格模型的名称。
        building.name = `${name} building ${i + 1} room`
        buildings.add(building)
    }
}
// 存放所有高楼
const highBuildings = new THREE.Group()
// 存放所有矮楼
const lowBuildings = new THREE.Group()
// 生成高楼
makeBuildings(100, 70, -50, highBuildings, 'High')
// 生成矮楼
makeBuildings(50, 30, 50, lowBuildings, 'Low')

// 定义一个临时组，保存所有的建筑
const tempGroup = new THREE.Group()
tempGroup.add(highBuildings)
tempGroup.add(lowBuildings)
// 遍历所有建筑
tempGroup.traverse(object3D => {
    /**
     * 判断这个 3D 对象是不是网格模型
     * 注意：
     * Scene、Mesh、Geometry、Material 等，
     * 都继承自 Object3D。
     */
    if (object3D.isMesh /* 或者：object3D.type === 'Mesh' */) {
        // 打印设置到 3D 对象的名称。
        console.log('Building name:', object3D.name)
        // 设置网格模型材质的颜色。
        object3D.material.color.set(0x00ff00)
    }
})
const findName = 'Low building 2 room'
// 根据名称查找指定网格模型。更准确点说，应该是“根据名称查找指定 3D 对象”
const foundMesh = tempGroup.getObjectByName(findName)
foundMesh.material.color.set(0x0000ff)
export {lowBuildings, highBuildings}
