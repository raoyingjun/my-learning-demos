import {Group, TextureLoader} from "three";

const startPage = new Group()
startPage.position.set(-100, -120, 0)

const gamingPage = new Group()
gamingPage.position.set(-100, -120, 0)

const endPage = new Group()

const importModelSetting = (model, {rotation, scale, position}) => {
    model.scale.set(...(scale || []))
    model.rotation.set(...(rotation || []).map(rot => Math.PI / 180 * rot))
    model.position.set(...(position || []))
}
const loadTexture = async (name) =>
    new Promise((resolve, reject) =>
        new TextureLoader().load(`/race-game/textures/${name}.png`, resolve, null, reject))

export {startPage, gamingPage, endPage, importModelSetting, loadTexture}