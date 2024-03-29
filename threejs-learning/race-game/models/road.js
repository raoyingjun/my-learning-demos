import {DoubleSide, Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping} from "three";
import {randomHexColor, visualToWebglCoords, winSize} from "../util";
import {loadTexture} from "../util";

const ROAD_WIDTH = 150
const ROAD_HEIGHT = 5000
const ROAD_NUM = 5

const TEXTURE_ORIGIN_HEIGHT = 368

const roadTexture = await loadTexture('road')


roadTexture.wrapS = RepeatWrapping
roadTexture.wrapT = RepeatWrapping
roadTexture.repeat.set(1, ROAD_HEIGHT / TEXTURE_ORIGIN_HEIGHT)

const generateRoads = (num) => {
    const roads = new Group()
    for (let i = 0; i < num; i++) {
        const road = new Mesh(
            new PlaneGeometry(ROAD_WIDTH, ROAD_HEIGHT),
            new MeshStandardMaterial({
                // color: randomHexColor(),
                side: DoubleSide,
                map: roadTexture,
            })
        )

        const offset = (winSize().width - num * ROAD_WIDTH) / 2 + ROAD_WIDTH / 2
        const {x} = visualToWebglCoords(offset + i * ROAD_WIDTH)
        road.position.z = x
        road.rotateY(Math.PI / 2)
        road.receiveShadow = true

        roads.add(road)
    }
    roads.rotateZ(Math.PI / 2)
    roads.position.setX(ROAD_HEIGHT / 3)
    return roads
}

const roads = generateRoads(ROAD_NUM)
export {roads, ROAD_WIDTH, ROAD_NUM, roadTexture}