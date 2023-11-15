import {CameraHelper, PerspectiveCamera} from "three";
import {numAnimate, winSize} from "./util";
import {CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR} from "./const";
import {gui} from "./models/helper";

const camera = new PerspectiveCamera(CAMERA_FOV, winSize().ratio, CAMERA_NEAR, CAMERA_FAR)

const defaultView = {x: -280, y: -30, z: 0}
const currentView = {...{defaultView}}

const moveView = (position, target, updateCallback, doneCallback) => {
    for (const axis in position) {
        numAnimate({
            from: target[axis],
            to: position[axis],
            onStep: v => {
                target[axis] = v
                currentView[axis] = v
                updateCallback && updateCallback()
            },
            step: 100,
            onComplete: doneCallback
        })
    }
}


const resetView = () => {
    moveView(defaultView, camera.position)

    gui.add(camera.position, 'x', -500, 500)
    gui.add(camera.position, 'y', -500, 500)
    gui.add(camera.position, 'z', -500, 500)
    gui.onChange(() => camera.updateProjectionMatrix())
}


resetView()


export {camera, moveView, resetView, defaultView}