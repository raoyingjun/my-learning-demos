import {CameraHelper, Scene} from "three";
import {ambientLight, directionalLight} from "./models/light";
import {gui} from "./models/helper";

const scene = new Scene()

const useScene = () => {
    scene.add(ambientLight)
    scene.add(directionalLight)


    gui.add(directionalLight.shadow.camera, 'near', 0, 10)
    gui.add(directionalLight.shadow.camera, 'far', 0, 5000)

    gui.add(directionalLight.shadow.camera, 'left', -5000, 5000)
    gui.add(directionalLight.shadow.camera, 'right', -5000, 5000)
    gui.add(directionalLight.shadow.camera, 'top', -5000, 5000)
    gui.add(directionalLight.shadow.camera, 'bottom', -5000, 5000)

    gui.add(directionalLight.shadow, 'radius', -200, 200)

    gui.add(directionalLight.shadow.mapSize, 'width', 0, 4096)
    gui.add(directionalLight.shadow.mapSize, 'height', 0, 4096)

    // 当值改变了，更新相机视图
    gui.onChange(() => {
        directionalLight.shadow.camera.updateProjectionMatrix()
    })
}

export {useScene, scene}