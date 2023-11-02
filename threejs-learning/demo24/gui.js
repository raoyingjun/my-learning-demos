import {GUI} from "three/addons/libs/lil-gui.module.min";

const gui = new GUI()
// 对GUI调节操作进行分类，也可以嵌套生成子分类
// 其他属性与方法与直接操作 GUI 对象一致
const aFolder = gui.addFolder('光源位置设置')
const bFolder = gui.addFolder('网格位置设置')
const cFolder = gui.addFolder('相机位置设置')
export {aFolder, bFolder, cFolder, gui}