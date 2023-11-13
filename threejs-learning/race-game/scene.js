import {AxesHelper, Scene} from "three";
import {axesHelper} from "./models/helper";
import {ambientLight, pointLight} from "./models/light";

const scene = new Scene()

const useScene = () => {
    scene.add(axesHelper)
    scene.add(ambientLight)
    scene.add(pointLight)
}
const useConfig = () => {
    scene.rotateY(Math.PI / 2)
    scene.position.set(0, -100, 120)
}

export {useScene, useConfig, scene}