import {AmbientLight, AxesHelper, DirectionalLight, DirectionalLightHelper, PointLight} from "three";
import {startPage} from "./index";

const ambientLight = new AmbientLight(0xffffff, 1)
const directionalLight = new DirectionalLight(0xFFC80D, 5)
directionalLight.position.set(-300, 300, 300)
directionalLight.castShadow = true
// 设置阴影贴图模糊度
directionalLight.shadow.radius = 20
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(4096, 4096)
// 设置平行光投射相机的属性
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 200
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.bottom = -5
directionalLight.shadow.camera.left = -5
directionalLight.shadow.camera.right = 5
const directionalLightHelper = new DirectionalLightHelper(directionalLight, 50)

export {ambientLight, directionalLight, directionalLightHelper}