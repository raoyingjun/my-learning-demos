import * as THREE from 'three'
import {Object3D, Vector3} from "three";
import {DRACOLoader, GLTFLoader} from "three/addons";

const loader = new GLTFLoader()
// Draco 是用于压缩和解压 3D 模型数据，特别是针对 WebGL 等 3D 图形应用的数据压缩和传输而设计的。
const dracoLoader = new DRACOLoader()
// 引入 Draco 相关目录，并指定引入 Draco 模块的路径
dracoLoader.setDecoderPath('./draco/')
// GLTFLoader 使用 DracoLoader 解压 3D 模型
loader.setDRACOLoader(dracoLoader)
const group = new THREE.Group()
// 加载宝石模型
loader.load('./model.gltf', (gltf) => {
    /**
     * 知识补充：.gltf 是一种文件类型，里面存放的是模型的数据
     * 通过导入 gltf 模型，然后就可以添加到自己的代码中了。
     * gltf 模型可以是美工设计的、是网上的资源、自行设计的等待。
     */
    // 把引入的 gltf 模型的场景进行一些调整
    gltf.scene.scale.set(30, 30, 30)
    gltf.scene.position.y = 20
    // 把引入的 gltf 场景添加到组
    group.add(gltf.scene)
})

export {group}

