import {CameraHelper, PerspectiveCamera} from "three";
import {numAnimate, winSize} from "./util";
import {CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR} from "./const";
import {scene} from "./scene";

const camera = new PerspectiveCamera(CAMERA_FOV, winSize().ratio, CAMERA_NEAR, CAMERA_FAR)

const resetView = () => {
    camera.position.set(0, 60, 300)
}

resetView()

const moveView = (x) => {
    numAnimate({
        from: camera.position.x,
        to: x,
        onStep: v => camera.position.x = v,
        step: 100
    })
}


export {camera, moveView, resetView}