import {generateModels, getRandomModel, isEmpty} from "../util";
import blockData from './resource/rocks/block-data.json'
import {importModelSetting} from "./index";
import {Group} from "three";

const BlOCK_NUM = blockData.length

const models = await generateModels(blockData)

const findAll = async () => {
    const blocks = new Group()
    for (const [index, modelPromise] of models.entries()) {
        const model = await modelPromise
        importModelSetting(model.children[0], blockData[index])
        blocks.add(model)
    }
    return blocks
}

const blocks = await findAll()

const getRandomBlock = () => {
    const model = getRandomModel(blocks)
    model.traverse(o => {
        if (o.isMesh) {
            o.material = o.material.clone()
            o.material.transparent = true
            o.castShadow = true
        }
    })
    return model
}

export {BlOCK_NUM, getRandomBlock}

