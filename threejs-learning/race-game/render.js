import {WebGLRenderer} from "three";
import {camera, defaultView, moveView, resetView} from "./camera";
import {scene} from "./scene";
import {updateFps, numAnimate, rgbToHex, winSize} from "./util";
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

        renderer.setSize(width, height)

        camera.aspect = ratio
        camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    resize()
}

const renderElement = renderer.domElement

const orbitControls = new OrbitControls(camera, renderElement)

const renderToBody = () => {
    document.body.append(renderElement)
}

export {
    useRefresh, useResize, renderToBody,
    renderer, renderElement, orbitControls
}
