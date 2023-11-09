import {generateModels, getRandomModel, isEmpty} from "../util";
import blockData from './resource/rocks/block-data.json'
import {AxesHelper, Group} from "three";
import {cars} from "./car";
import {decorate} from "./index";

const BlOCK_NUM = blockData.length

const models = await generateModels(blockData)

const findByName = async (index, model) => {
    return model.getObjectByName(blockData[index].name)
}

const findAll = async () => {
    const blocks = new Group()
    for (const [index, modelPromise] of models.entries()) {
        const model = await findByName(index, await modelPromise)
        decorate(model, blockData[index])
        blocks.add(model)
    }
    return blocks
}

const blocks = await findAll()

const getRandomBlock = () => getRandomModel(blocks)

console.log('blocks', blocks)
export {BlOCK_NUM, getRandomBlock}

