import * as THREE from "three";
import {camera} from "./camera";
import {AxesHelper} from "three";


const model = new THREE.Mesh(
    new THREE.SphereGeometry(50),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
)
model.position.set(20,50,30)
// 创建包围盒。构建一个将模型所有顶点包裹在内的长方体，这个长方体就是包围盒。
// 通过将不规则模型用包围盒包裹，方便我们实现一些功能，比如碰撞检测。
const box = new THREE.Box3()
// 计算包围盒尺寸。通过计算得出一个可以将模型所有顶点包裹在内的包围盒。
box.expandByObject(model)

// 包围盒尺寸数据会被设置到目标向量
const size = new THREE.Vector3()
// 获取包围盒的尺寸，
console.log(box.getSize(size))
// 获取包围盒的中心坐标，
console.log(box.getCenter(size))

export {model}