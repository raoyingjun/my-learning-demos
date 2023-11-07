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
                // 清漆（也可以说是”透明涂层“）。在物体表面再叠加一层清漆，也可以反射光线
                // 如何理解？给车身套一个车衣，车衣不就像给车身叠加的清漆吗？
                // 取值范围：0 ~ 1。清漆的厚度。越厚反射光的能力越强
                clearcoat: .9,
                // 清漆的粗糙度。越光滑反射光的能力越强，越粗糙反射光的能力越弱
                clearcoatRoughness: .3
            })
            console.log('td')
            const folder = gui.addFolder(object3D.name)
            folder.add(object3D.material, 'metalness', 0, 1)
            folder.add(object3D.material, 'roughness', 0, 1)
            folder.add(object3D.material, 'envMapIntensity', 0, 10)
            folder.add(object3D.material, 'clearcoat', 0, 1)
            folder.add(object3D.material, 'clearcoatRoughness', 0, 1)
        }
    })
})
export {group, cubeTexture}

