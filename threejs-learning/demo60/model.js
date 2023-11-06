import * as THREE from 'three'
import {DRACOLoader, GLTFLoader} from "three/addons";
import {Mesh} from "three";

/**
 * 立方体纹理图片，也可以说是环境贴图。一般用在 PBR 材质上
 * 在模型的上下左右前后 6 个方位的环境各设置一张贴图，
 * PBR 材质会把各个方位的贴图反射到自身，使材质呈现出来的反光效果更好。
 * 设置合适的环境贴图，效果看起来会更逼真。
 *
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()
const cubeTexture = cubeTextureLoader
    .setPath('./imgs/')
    .load([
        'nx.png',
        'ny.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ])

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
    gltf.scene.position.y = 30
    // 把引入的 gltf 场景添加到组
    group.add(gltf.scene)
    console.log(gltf.scene)

    // 遍历外部导入的模型中的所有网格模型
    gltf.scene.traverse(object3D => {

        /**
         * 知识补充：
         * PBR 材质，Physically-based Rendering（基于物理的渲染）
         * 渲染资源占用&渲染效果表现：MeshBasicMaterial > MeshLambertMaterial >
         * MeshPhongMaterial > MeshStandardMaterial > MeshPhysicalMaterial
         * 从上可知：
         * 一，渲染表现越好，渲染占用的资源越多。
         * 二，上述材质的光照模型不同，也就是他们的光照算法不同，模拟的光线效果也有区别。
         */

        // 如果是网格模型
        if (object3D.isMesh) {
            /**
             * metalness 类似金属材质的程度。（0~1）
             * 越贴近 1 材质表现越像金属
             * 为 0 时，表现为非金属材质
             * 为 1 时，表现为金属材质
             */
            object3D.material.metalness = .8
            /**
             * roughness 粗糙度。（0~1）
             * 与现实世界类似，指的是材质的粗糙程度、或者说是光滑程度。
             * 越粗糙反射光线能力越弱，反之，越光滑反射光线能力越强。
             * 越光滑材质表现越贴近镜面反射效果，为 0 时完全表现为镜面反射
             * 越粗糙材质表现越贴近漫反射效果，为 1 时完全表现为漫反射
             */
            object3D.material.roughness = 0.3
            // 设置环境贴图
            object3D.material.envMap = cubeTexture
            // 环境贴图对材质的影响程度
            object3D.material.envMapIntensity = 1
        }
    })
})

export {group}

