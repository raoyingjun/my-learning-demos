import * as THREE from "three";
import {camera} from "./camera";


const mesh1 = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 200),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        side: THREE.DoubleSide,
    })
)
const mesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(150, 150),
    new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        side: THREE.DoubleSide,
    })
)

const model = new THREE.Group()
/**
 * 深度冲突（Z-fighting）。当模型重叠，或者模型之间的间隙太小了，都会发生深度冲突。
 * 造成模型渲染时其外观颜色会冲突和叠加，再调整控制器进行交互时会发生闪烁问题且尤为明显，
 * 因为 GPU 渲染时分不清模型谁在前谁在后后，就会出现这种问题。
 */
// 情况一：模型重叠！有深度冲突
model.add(mesh1, mesh2)
// 情况二：修改其中一个模型 z 轴位置，模型不再重叠！无深度冲突
mesh2.position.z = 1
// 情况三：虽然修改了其中一个模型 z 轴位置，但模型之间的间隙太小！有深度冲突
mesh2.position.z = 0.00000000000000000001
// 情况四：虽然修改了其中一个模型 z 轴位置，但受到相机视角影响，
// 由于相机与人眼一样也遵循“近大远小”，此时相机距离模型太远，模型之
// 间的间隙也会变得很小！有深度冲突
mesh2.position.z = 1
camera.position.set(1500, 1500, 1500)
export {model}