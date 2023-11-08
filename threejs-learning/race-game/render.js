import {WebGLRenderer} from "three";
import {camera} from "./camera";
import {scene} from "./scene";
import {winSize} from "./util";

const render = new WebGLRenderer()


const useRefresh = () => {
    const refresh = () => {
        render.render(scene, camera)
        requestAnimationFrame(refresh)
    }
    refresh()
}

const useResize = () => {
    const resize = () => {
        const {width, height} = winSize()
        render.setSize(width, height)
    }
    window.addEventListener('load', resize)
    resize()
}

export {useRefresh, useResize}
