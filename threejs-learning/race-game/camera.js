import {PerspectiveCamera} from "three";
import {winSize} from "./util";
import {CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR} from "./const";

const camera = new PerspectiveCamera(CAMERA_FOV, winSize().ratio, CAMERA_NEAR, CAMERA_FAR)

camera.position.set(0, 200, 400)

camera.lookAt(0, 0, -200)

export {camera}