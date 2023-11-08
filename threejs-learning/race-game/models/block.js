import {loadModel} from "../util";
import {AxesHelper, Group, PlaneHelper} from "three";
import blockData from './resource/block-data.json'

const getBlockAbsolutePath = (name) => `/race-game/models/resource/rocks/${name}.gltf`

const BlOCK_NUM = blockData.length
const generateBlocks = async (num) => {
    const blocks = new Group();
    for (let i = 0; i < num; i++) {
        const url = new URL(getBlockAbsolutePath(blockData[i].name), location.href).href
        const block = (await loadModel(url, true)).scene.getObjectByProperty('isMesh', true)
        block.scale.set(...blockData[i].scale)
        block.rotation.set(...blockData[i].rotation.map(rot => Math.PI / 180 * rot))
        block.add(new AxesHelper(20))
        blocks.add(block)
    }
    return blocks
}
const blocks = await generateBlocks(BlOCK_NUM)
export {blocks, BlOCK_NUM}