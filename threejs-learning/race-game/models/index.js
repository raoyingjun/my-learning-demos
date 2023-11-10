import {Group, TextureLoader} from "three";
import {getModelAbsolutePath} from "../util";

const startPage = new Group()

const gamingPage = new Group()

const endPage = new Group()

const decorate = (model, {rotation, scale}) => {
    model.scale.set(...scale)
    model.rotation.set(...rotation.map(rot => Math.PI / 180 * rot))
}
const loadTexture = async (name) =>
    new Promise((resolve, reject) =>
        new TextureLoader().load(`/race-game/textures/${name}.png`, resolve, null, reject))

export {startPage, gamingPage, endPage, decorate, loadTexture}