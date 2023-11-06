import * as THREE from 'three'

/**
 * TextureLoader 纹理贴图加载器
 * 利用该 API 加载图片然后可以贴图到材质上
 */
const loader = new THREE.TextureLoader()
const texture = loader.load('./earth.jpeg')
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(50, 50, 50),
    new THREE.MeshLambertMaterial({
        // 注意纹理贴图会和 color 颜色叠加。
        // color 为白色，不影响贴图效果，设置与否均可
        color: 0xffffff,
        // 贴图到材质上，以下同
        map: texture
    }))
const mesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(50, 50),
    new THREE.MeshLambertMaterial({
        map: texture
    }))
const mesh3 = new THREE.Mesh(
    new THREE.SphereGeometry(25),
    new THREE.MeshLambertMaterial())

// 或者这样写：
mesh3.material.map = texture
// x 轴方向偏移，方便预览观察
mesh2.translateX(70)
mesh3.translateX(140)
const group = new THREE.Group()
// 添加网格模型到这个组
group.add(mesh)
group.add(mesh2)
group.add(mesh3)

export {group}
