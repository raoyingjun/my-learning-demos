import {AxesHelper, WebGLRenderer} from "three";
import {camera, defaultView, moveView, resetView} from "./camera";
import {scene} from "./scene";
import {numAnimate, rgbToHex, winSize} from "./util";
import {OrbitControls} from "three/addons";

const renderer = new WebGLRenderer({
    antialias: true,
})
renderer.shadowMap.enabled = true


const useRefresh = () => {
    const refresh = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(refresh)
    }
    refresh()
}

const useResize = () => {
    const resize = () => {
        const {width, height, ratio} = winSize()

        camera.aspect = ratio
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
    }
    window.addEventListener('resize', resize)
    resize()
}

const renderElement = renderer.domElement

const orbitControls = new OrbitControls(camera, renderElement)

const renderToBody = () => {
    document.body.append(renderElement)
}

const setBackground = (color) => renderer.setClearColor(color)

const FADE_STEP = 256;
const fade = (from, to) => {
    numAnimate({
        from,
        to,
        onStep: v => setBackground(rgbToHex(...Array(3).fill(Math.floor(v)))),
        step: FADE_STEP
    })
}

const fadeInBackground = (from = 0, to = 255) => fade(from, to)
const fadeOutBackground = (from = 255, to = 0) => fade(from, to)

export {
    useRefresh, useResize, renderToBody,
    setBackground, fadeInBackground, fadeOutBackground,
    renderer, renderElement, orbitControls
}
