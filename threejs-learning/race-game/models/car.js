import {loadModel} from "../util";
import carUrl from './resource/car.gltf?url'

const CAR_SCALE = 70
let car = (await loadModel(carUrl, true)).scene
car = car.getObjectByName('race')
car.scale.set(CAR_SCALE, CAR_SCALE, CAR_SCALE)
car.rotateY(Math.PI / 2)
export {car}