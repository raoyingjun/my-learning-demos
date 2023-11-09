import {Group} from "three";

const startPage = new Group()

const gamingPage = new Group()

const endPage = new Group()

const decorate = (model, {rotation, scale}) => {
    model.scale.set(...scale)
    model.rotation.set(...rotation)
}


export {startPage, gamingPage, endPage, decorate}