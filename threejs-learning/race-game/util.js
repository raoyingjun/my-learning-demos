import {DRACOLoader, GLTFLoader} from "three/addons";
import {Box3, Group, TextureLoader, Vector3} from "three";
import * as THREE from "three";

export const winSize = () => {
    const width = window.innerWidth,
        height = window.innerHeight,
        ratio = width / height;
    return {width, height, ratio}
}


const loading = (progress, url) => {
    const {loaded, total} = progress

    let mask = document.getElementById('tempMask')
    if (!mask) {
        mask = document.createElement('div')
        mask.style.position = 'absolute'
        mask.style.inset = '0'
        mask.style.zIndex = '10'
        mask.style.color = 'orange'
        mask.style.backgroundColor = 'rgba(255, 255, 255, .5)'
        mask.id = 'tempMask'
        mask.innerHTML = '正在加载相关模型资源'
    }

    let paraElement = document.getElementById('pid:' + url)
    if (!paraElement) {
        paraElement = document.createElement('p')
        paraElement.innerHTML = `正在加载位于 [${url}] 的模型资源<br>加载进度：`
        paraElement.id = 'pid:' + url
    }

    let progressElement = document.getElementById('progressid:' + url)
    if (!progressElement) {
        progressElement = document.createElement('progress')
        progressElement.max = total
        progressElement.id = 'progressid:' + url
    }

    paraElement.appendChild(progressElement)
    mask.appendChild(paraElement)
    document.body.appendChild(mask)

    progressElement.value = loaded

}
let propsLen = 7
let propsIdx = 0
const loaded = () => {
    if (++propsIdx >= propsLen) {
        document.body.removeChild($('tempMask'))
    }
}

export const loadModel = (url, isDracoCompress = true) => {
    const loader = new GLTFLoader()
    if (isDracoCompress) {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    }
    return new Promise((resolve, reject) => {
        loader.load(url, (data) => {
            resolve(data)
            loaded()
        }, e => loading(e, url), reject)
    })
}
export const randomRange = (min, max) => {
    return Math.floor((Math.floor((max - min + 1) * Math.random())) + min)
}

export const randomHexColor = () => {
    let hexColor = ''
    for (let i = 0; i < 3; i++) {
        hexColor += randomRange(0, 255).toString(16).padStart(2, '0')
    }
    return `#${hexColor}`
}

export const rgbToHex = (...rgb) => '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('')

export const visualToWebglCoords = (x, y) => {
    const {width, height} = winSize()
    return {
        x: width / 2 - (width - x),
        y: (height / 2 - (height - y)) * -1
    }
}

export const numAnimate = ({from, to, onStep, onComplete, step = 50}) => {
    const SCALE_FACTOR = 100 * global.animationRatio
    to *= SCALE_FACTOR
    from *= SCALE_FACTOR
    const dis = ((to - from) / step) * global.animationRatio
    const stepFn = () => {
        from = parseFloat(from.toFixed(2))
        to = parseFloat(to.toFixed(2))
        if (from === to) {
            onComplete && onComplete(to, from)
        } else if (from !== to) {
            from += dis
            if (Math.abs(from - to) < Math.abs(dis)) {
                from = to
            }
            onStep && onStep(from / SCALE_FACTOR)
            requestAnimationFrame(stepFn)
        }
    }
    stepFn()
}

export const getModelAbsolutePath = (filename) => `${import.meta.env.BASE_URL}resource/${filename}.gltf`

export const generateModel = async (rawModel) => {
    const {filename} = rawModel
    const url = new URL(getModelAbsolutePath(filename), location.href).href
    const model = new Group()
    model.add((await loadModel(url, true)).scene)
    model.userData = rawModel
    return model
}

export const generateModels = async (rawModels) => rawModels.map(async rawModel => await generateModel(rawModel))


export const getRandomModel = (models) => {
    return models.children[randomRange(0, models.children.length - 1)].clone()
}

export const isEmpty = o => !Object.keys(o).length

export const $ = (id) => document.getElementById(id)
export const all = (selector) => document.querySelectorAll(selector)

export const debounce = (fn, threshold = 300) => {
    let timer;
    return () => {
        clearTimeout(timer)
        timer = setTimeout(fn, threshold)
    }
}

export const loadTexture = async (name) =>
    new Promise((resolve, reject) =>
        new TextureLoader().load(`${import.meta.env.BASE_URL}resource/textures/${name}.png`, resolve, null, reject)
    )


const clock = new THREE.Clock()

export const global = {
    fps: 60,
    fpsRatio: 2.4,
    animationRatio: 2.4,
}

export let updateFps = (ready) => {
    if (!updateFps.ready) {
        if (updateFps.checkFpsTimes++ < updateFps.checkFpsThreshold) {
            let fps = 1 / (clock.getDelta() || 1)
            fps = fps > 144 ? 144 : fps
            fps = fps < 60 ? 60 : fps
            updateFps.avgFps += fps

        } else {
            let fps = updateFps.avgFps / updateFps.checkFpsThreshold
            fps = [60, 75, 90, 120, 144].find(v => fps > v - 15 && fps < v + 15)
            const fpsRatio = 144 / fps
            global.fps = fps
            global.fpsRatio = fpsRatio
            global.animationRatio = fpsRatio
            updateFps.ready = true
            ready && ready()
        }
    }

}
updateFps.checkFpsThreshold = 60
updateFps.checkFpsTimes = 0
updateFps.avgFps = 0
updateFps.ready = false