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