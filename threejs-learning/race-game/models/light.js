import {AmbientLight, AxesHelper, DirectionalLight, DirectionalLightHelper, PointLight} from "three";
import {startPage} from "./index";

const ambientLight = new AmbientLight(0xffffff, 1)
const directionalLight = new DirectionalLight(0xcccccc, 10)
directionalLight.position.set(2000, 2500, -1500)

directionalLight.castShadow = true

directionalLight.shadow.radius = 1

directionalLight.shadow.mapSize.set(2048, 2048)

directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far =5000
directionalLight.shadow.camera.top = 1000
directionalLight.shadow.camera.bottom = -5000
directionalLight.shadow.camera.left = -3000
directionalLight.shadow.camera.right = 1000
const directionalLightHelper = new DirectionalLightHelper(directionalLight, 50)

export {ambientLight, directionalLight, directionalLightHelper}