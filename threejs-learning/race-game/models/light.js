import {AmbientLight, PointLight} from "three";

const ambientLight = new AmbientLight(0xffffff, 1)
const pointLight = new PointLight(0xFFC80D, 100000)
pointLight.position.set(0, 100, 0)
export {ambientLight, pointLight}