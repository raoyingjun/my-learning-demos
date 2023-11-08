import {WebGLRenderer} from "three";
import {camera} from "./camera";
import {scene} from "./scene";
import {winSize} from "./util";
import {OrbitControls} from "three/addons";

const renderer = new WebGLRenderer({
    antialias: true
})


const useRefresh = () => {
    const refresh = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(refresh)
    }
    refresh()
}

const useResize = () => {
    const resize = () => {
        const {width, height} = winSize()
        renderer.setSize(width, height)
    }
    window.addEventListener('resize', resize)
    resize()
}

const renderElement = renderer.domElement
const renderToBody = () => {
    document.body.append(renderElement)
}
const useControls = () => {
    const orbitControls = new OrbitControls(camera, renderer.domElement)
}

renderer.setClearColor(0xffffff)

export {
    useRefresh, useResize, renderToBody, useControls,
    renderer, renderElement
}
