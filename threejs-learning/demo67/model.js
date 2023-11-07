import * as THREE from 'three'
import {DRACOLoader, GLTFLoader} from "three/addons";
import {Mesh} from "three";
import {GUI} from "three/addons/libs/lil-gui.module.min";

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
        /**
         * p => positive
         * n => negative
         */
        'px.png',
        'nx.png',
        'py.png',
        'ny.png',
        'pz.png',
        'nz.png'
    ])

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)

const group = new THREE.Group()

const gui = new GUI()

// 加载汽车模型
/**
 * 导入 gltf 模型，一般使用 MeshStandardMaterial 材质进行解析，
 * 但如果模型设置了折射率（ior）、透光率（transmission）、
 * 清漆（clearcoat）等 MeshStandardMaterial 无法呈现的
 * 特性，则会改用 MeshPhysicalMaterial 材质进行解析。
 */
loader.load('./model.gltf', (gltf) => {
    /**
     * 知识补充：.gltf 是一种文件类型，里面存放的是模型的数据
     * 通过导入 gltf 模型，然后就可以添加到自己的代码中了。
     * gltf 模型可以是美工设计的、是网上的资源、自行设计的等待。
     */
    // 把引入的 gltf 模型的场景进行一些调整
    gltf.scene.scale.set(20, 20, 20,)
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
             * MeshPhysicalMaterial 继承自 MeshStandardMaterial。
             * 继承并拓展了其特性，如： clearcoat 清漆、transmission 透光率、
             * reflectivity 反射率、sheen 光泽、ior 折射率等。
             */
            object3D.material = new THREE.MeshPhysicalMaterial({
                color: object3D.material.color,
                metalness: .8,
                roughness: .3,
                envMap: cubeTexture,
                envMapIntensity: 1,
                // 透光率。注意，这和 opacity 不一样。透光率使用在物理材质上，并且透光效果更为逼真
                // 方便模拟玻璃、半透明塑料材质等透光效果
                // 取值范围：0~1，默认为 0，值越大透光效果越好。
                transmission: 1,
                // 折射率，默认为 1.5。一般不需要调整，因为折射率默认以玻璃
                // 作为参照（推测），而玻璃的折射率是 1.5。不同材质的折射率可能不同
                ior: 1.5

            })
            const folder = gui.addFolder(object3D.name)
            folder.add(object3D.material, 'metalness', 0, 1)
            folder.add(object3D.material, 'roughness', 0, 1)
            folder.add(object3D.material, 'envMapIntensity', 0, 10)
            folder.add(object3D.material, 'transmission', 0, 1)
            folder.add(object3D.material, 'ior', 0, 3)
        }
    })
}, (progress) => {
    const {loaded, total} = progress
    document.getElementById('step').value = (loaded / total) * 100
})
export {group, cubeTexture}

