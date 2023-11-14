import {AxesHelper, Scene} from "three";
import {axesHelper} from "./models/helper";
import {ambientLight, directionalLight, directionalLightHelper} from "./models/light";

const scene = new Scene()

const useScene = () => {
    scene.add(axesHelper)
    scene.add(ambientLight)
    scene.add(directionalLight, directionalLightHelper)
}
const useConfig = () => {
    scene.rotateY(Math.PI / 2)
}

export {useScene, useConfig, scene}