import {Scene} from "three";
import {axesHelper} from "./models/helper";
import {startPage} from "./models";
import {ambientLight, pointLight} from "./models/light";

const scene = new Scene()

const useScene = () => {
    scene.add(axesHelper)
    scene.add(startPage)
    // scene.add(ambientLight)
    scene.add(pointLight)
}
const useConfig = () => {
    scene.rotateY(Math.PI / 2)
}

export {useScene, useConfig, scene}