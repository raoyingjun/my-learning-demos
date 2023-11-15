import {AxesHelper} from "three";
import {OrbitControls} from "three/addons";
import {camera} from "../camera";
import {renderer} from "../render";
import {GUI} from "three/addons/libs/lil-gui.module.min";



const axesHelper = new AxesHelper(500)
const gui = new GUI()

export {axesHelper, gui}