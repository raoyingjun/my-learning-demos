import {DRACOLoader, GLTFLoader} from "three/addons";
import {Box3, Group, TextureLoader, Vector3} from "three";

export const winSize = () => {
    const width = window.innerWidth,
        height = window.innerHeight,
        ratio = width / height;
    return {width, height, ratio}
}

export const loadModel = (url, isDracoCompress = true) => {
    const loader = new GLTFLoader()
    if (isDracoCompress) {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('./draco/')
        loader.setDRACOLoader(dracoLoader)
    }
    return new Promise((resolve, reject) => {
        loader.load(url, resolve, null, reject)
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

const STEP = 50
export const numAnimate = ({from, to, onStep, onComplete, step = 50}) => {
    const SCALE_FACTOR = 100
    to *= SCALE_FACTOR
    from *= SCALE_FACTOR
    const dis = (to - from) / step
    const stepFn = () => {
        if (from === to) {
            onComplete && onComplete(to)
        } else if (from !== to) {
            from += dis
            if (Math.abs(from - to) < 1) {
                from = to
            }
            onStep && onStep(from / SCALE_FACTOR)
            requestAnimationFrame(stepFn)
        }
    }
    stepFn()
}

export const getModelBox3Size = (model) => {
    const box = new Box3()
    const v = new Vector3()
    box.expandByObject(model)
    box.getSize(v)
    return v
}

export const getModelAbsolutePath = (filename) => `/resource/${filename}.gltf`

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
        new TextureLoader().load(`/resource/textures/${name}.png`, resolve, null, reject)
    )