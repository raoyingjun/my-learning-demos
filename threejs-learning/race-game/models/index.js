import {AxesHelper, Group, TextureLoader} from "three";
import {loadTexture} from "../util";

const startPage = new Group()
startPage.position.set(-100, -120, 0)

const gamingPage = new Group()
gamingPage.position.set(-100, -120, 0)
gamingPage.add(new AxesHelper(200))

const endPage = new Group()

const pageBackground = await loadTexture('sky')

const importModelSetting = (model, {rotation, scale, position}) => {
    model.scale.set(...(scale || []))
    model.rotation.set(...(rotation || []).map(rot => Math.PI / 180 * rot))
    model.position.set(...(position || []))
}

export {startPage, gamingPage, endPage, pageBackground, importModelSetting}