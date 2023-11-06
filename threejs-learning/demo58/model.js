import * as THREE from 'three'
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
    gltf.scene.scale.set(20, 20, 20)
    gltf.scene.position.y = 1
    // 把引入的 gltf 场景添加到组
    group.add(gltf.scene)
    console.log(gltf.scene)

    // 找不到合适的外部模型示例，这里假装一下外部导入模型引用的相同材质！！！
    group.getObjectByName('Cylinder017_1').material = group.getObjectByName('Cylinder017').material

    // 找到并修改对应网格模型材质的颜色
    group.getObjectByName('Cylinder017').material.color.set(0xff0000) // 树枝
    group.getObjectByName('Cylinder017_1').material.color.set(0x00ff00) // 树干
    /**
     * 注意上面存在一个问题，只修改了指定名称的模型材质，
     * 但所有模型的颜色都改变了，因为模型的材质被共享了！
     * 如何解决，如下：
     */
    // 遍历外部导入的模型中的所有网格模型
    gltf.scene.traverse(object3D => {
        // 如果是网格模型
        if (object3D.isMesh) {
            // 对材质执行 clone 操作，使其不再共享相同的材质
            object3D.material = object3D.material.clone()
        }
    })
    // 找到并修改对应网格模型材质的颜色。
    // 下面结果符合预期，模型有各自的颜色，不再共享。
    group.getObjectByName('Cylinder017').material.color.set(0xff0000) // 树枝
    group.getObjectByName('Cylinder017_1').material.color.set(0x00ff00) // 树根
})

export {group}

