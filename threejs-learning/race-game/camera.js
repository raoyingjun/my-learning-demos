import {CameraHelper, PerspectiveCamera} from "three";
import {winSize} from "./util";
import {CAMERA_FAR, CAMERA_FOV, CAMERA_NEAR} from "./const";
import {scene} from "./scene";
const camera = new PerspectiveCamera(CAMERA_FOV, winSize().ratio, CAMERA_NEAR, CAMERA_FAR)

camera.position.set(0, 108, 300)

export {camera}