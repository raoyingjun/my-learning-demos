import * as THREE from 'three'
import {Object3D, Vector3} from "three";
import {DRACOLoader, GLTFLoader} from "three/addons";

const loader = new GLTFLoader()

const group = new THREE.Group()
// 加载宝石模型
// GLTF 嵌入式格式。模型、数据、贴图存储到一起（同一个文件）
// 加载 .gltf 后缀的 gltf 模型。
loader.load('./model.gltf', (gltf) => {
    /**
     * 知识补充：.gltf 是一种文件类型，里面存放的是模型的数据
     * 通过导入 gltf 模型，然后就可以添加到自己的代码中了。
     * gltf 模型可以是美工设计的、是网上的资源、自行设计的等待。
     */
    // 把引入的 gltf 模型的场景进行一些调整
    gltf.scene.scale.set(10, 10, 10)
    gltf.scene.position.y = 10
    // 把引入的 gltf 场景添加到组
    group.add(gltf.scene)
})
// GLTF 二进制格式。模型、数据、贴图以二进制形式存储到一起（同一个文件）
// 加载 .glb 后缀的 gltf 模型。
// loader.load('./model.glb', loadedCallback)
// GLTF 分离格式。模型、数据、贴图分开存储（存储到不同文件）。
// 加载 .gltf + .bin（二进制数据） + 贴图 后缀的 gltf模型，
// 在加载 gltf 模型时，同目录下的 .bin 文件、贴图文件也会自动加载，所以请勿随意改动 gltf 模型依赖资源的路径
// loader.load('./model.gltf', loadedCallback)
export {group}

