import * as THREE from 'three'
import {Object3D, Vector3} from "three";
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
    // 外部导入的模型，一般都具有名称。
    // 通过 Threejs 导入后，即可以通过 name 属性进行获取。
    // 你可以拿它来做些什么，比如：
    const findName = 'menhir_mini'
    const foundObj = gltf.scene.getObjectByName(findName)
    // 设置颜色
    foundObj.material.color.set(0xff0000)
})

export {group}

