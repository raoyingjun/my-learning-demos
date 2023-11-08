import {DRACOLoader, GLTFLoader} from "three/addons";

export const winSize = () => {
    const width = window.innerWidth,
        height = window.innerHeight,
        ratio = width / height;
    return {width, height, ratio}
}

export const loadModel = (url, isDracoCompress) => {
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

export const visualToWebglCoords = (x, y) => {
    const {width, height} = winSize()
    return {
        x: width / 2 - (width - x),
        y: height / 2 - (height - y)
    }
}