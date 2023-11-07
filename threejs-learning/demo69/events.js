import * as THREE from 'three'
import {camera} from "./camera";
import {model} from "./model";


window.onload = function () {
    document
        .querySelector('canvas')
        .addEventListener('click',
            ({target: {offsetWidth, offsetHeight}, offsetX, offsetY}) => {
                // offsetX、offsetY，这两个属性的偏移量是相对于事件元素自身
                // 与下面写法等价，这是简写形式
                const [x1, y1] = [
                    (offsetX / offsetWidth) * 2 - 1,
                    -(offsetY / offsetHeight) * 2 + 1
                ]
                /**
                 * 使用鼠标坐标和画布宽度尺寸，把网页坐标转换成 WebGL 坐标。
                 * 注意，WebGL 坐标的源点默认在中心。
                 */
                    // 与上面写法等价，这是完整形式
                const [x, y] = [
                        (offsetWidth / 2 - (offsetWidth - offsetX)) / (offsetWidth / 2),
                        (offsetHeight / 2 - (offsetHeight - offsetY)) / (offsetHeight / 2) * -1
                    ]
                // 射线投射器。创建射线，判断射线与射线是否相交命中模型。
                const rayCaster = new THREE.Raycaster()
                // 以相机所在位置和计算出的 WebGL 坐标创建射线
                rayCaster.setFromCamera(new THREE.Vector2(x, y), camera)
                // 查询射线是否和模型相交（射线是否命中模型）
                const intersects = rayCaster.intersectObjects(model.children)
                // 如果命中模型
                if (intersects.length) {
                    // 修改模型的一个模型的材质颜色
                    intersects[0].object.material.color.set(0xffff00)
                }
            })
}
