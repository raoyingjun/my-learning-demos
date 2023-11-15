import {generateModels, getRandomModel, isEmpty} from "../util";
import carData from './resource/cars/car-data.json'
import {AxesHelper, Group} from "three";
import {importModelSetting} from "./index";

const CAR_NUM = carData.length

const models = await generateModels(carData)

const findAll = async () => {
    const cars = new Group()
    for (const [index, modelPromise] of models.entries()) {
        const model = await modelPromise
        importModelSetting(model, carData[index])
        model.add(new AxesHelper(100))
        cars.add(model)
    }
    cars.traverse(o => {
        if (o.castShadow !== undefined) {
            o.castShadow = true
        }
    })
    return cars
}

const cars = await findAll()
console.log(cars)
export {CAR_NUM, cars}