import {AmbientLight, AxesHelper, DirectionalLight, DirectionalLightHelper, PointLight} from "three";
import {startPage} from "./index";

const ambientLight = new AmbientLight(0xffffff, 1)
const directionalLight = new DirectionalLight(0xeeeeee, 10)
directionalLight.position.set(200, 200, -200)

directionalLight.castShadow = true

directionalLight.shadow.radius = 20

directionalLight.shadow.mapSize.set(2048, 2048)

directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far =3000
directionalLight.shadow.camera.top = 1000
directionalLight.shadow.camera.bottom = -1000
directionalLight.shadow.camera.left = -3000
directionalLight.shadow.camera.right = 1000
const directionalLightHelper = new DirectionalLightHelper(directionalLight, 50)

export {ambientLight, directionalLight, directionalLightHelper}