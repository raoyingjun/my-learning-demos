import {generateModels, getRandomModel, isEmpty} from "../util";
import carData from './resource/cars/car-data.json'
import {AxesHelper, Group} from "three";
import {decorate} from "./index";

const CAR_NUM = carData.length

const models = await generateModels(carData)

const findAll = async () => {
    const cars = new Group()
    for (const [index, modelPromise] of models.entries()) {
        const model = await modelPromise
        decorate(model, carData[index])
        cars.add(model)
    }
    return cars
}

const cars = await findAll()

console.log('cars', cars)
export {CAR_NUM, cars}