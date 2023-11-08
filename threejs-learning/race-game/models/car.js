import {loadModel} from "../util";
import carUrl from './resource/car.gltf?url'

let car = (await loadModel(carUrl, true)).scene
car = car.getObjectByName('race')
car.scale.set(100, 100, 100)
car.rotateY(Math.PI/2)
export {car}