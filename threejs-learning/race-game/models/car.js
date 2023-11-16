import {generateModels, getRandomModel, isEmpty} from "../util";
import carData from './configs/car-data.json'
import {importModelSetting} from "./index";
import {Group} from "three";

const CAR_NUM = carData.length

const models = await generateModels(carData)

const findAll = async () => {
    const cars = new Group()
    for (const [index, modelPromise] of models.entries()) {
        const model = await modelPromise
        importModelSetting(model, carData[index])
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

export {CAR_NUM, cars}