import * as THREE from 'three'
import {MeshLambertMaterial, MeshStandardMaterial, Object3D, Vector3} from "three";
import {DRACOLoader, GLTFLoader} from "three/addons";

const loader = new GLTFLoader()

const group = new THREE.Group()
// 加载宝石模型
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
    // 遍历外部导入的模型中的所有网格模型
    // 你可以拿它来做些什么，比如：
    gltf.scene.traverse(object3D => {
        // 如果是网格模型
        if (object3D.isMesh) {
            // 材质重设为白色
            /**
             * 知识补充：
             * 外部导入的模型，一般是 MeshStandardMaterial 材质。
             * 但是不同格式的模型（.obj、.gltf、.fbx），可能默认材质也不一样
             */
            object3D.material = new THREE.MeshLambertMaterial({
                color: 0xffffff
            })
        }
    })
})

export {group}

