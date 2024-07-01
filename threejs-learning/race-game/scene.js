import {AxesHelper, CameraHelper, Color, DirectionalLightHelper, Scene} from "three";
import {ambientLight, directionalLight} from "./models/light";
import {gui} from "./models/helper";
import {pageBackground} from "./models";
import {renderer} from "./render";
import {numAnimate, rgbToHex} from "./util";

const scene = new Scene()

const useScene = () => {
    scene.background = pageBackground

    scene.add(ambientLight)
    scene.add(directionalLight)
    // scene.add(new DirectionalLightHelper(directionalLight, 100, 'red'))
    // scene.add(new CameraHelper(directionalLight.shadow.camera))

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
    // scene.add(new AxesHelper(500))
}

const setBgLight = light => scene.backgroundIntensity = light
const fade = (from, to, step = 100) => {
    numAnimate({
        from,
        to,
        onStep: v => setBgLight(v),
        step: step
    })
}

const fadeInBg = (from = 0, to = 1) => fade(from, to)
const fadeOutBg = (from = 1, to = 0) => fade(from, to)

export {useScene, scene, setBgLight, fadeInBg, fadeOutBg}