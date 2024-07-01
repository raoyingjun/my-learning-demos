import {AxesHelper, DoubleSide, Group, Mesh, MeshStandardMaterial, PlaneGeometry, RepeatWrapping} from "three";
import {randomHexColor, visualToWebglCoords, winSize} from "../util";
import {loadTexture} from "../util";
import {scene} from "../scene";


const TEXTURE_ORIGIN_WIDTH = 564
const TEXTURE_ORIGIN_HEIGHT = 368

const ROAD_NUM = 5
const ROAD_ROWS = 30
const ROAD_WIDTH = 368 / 2
const ROAD_HEIGHT = 564 / 2

const roadTexture = await loadTexture('road')

// roadTexture.wrapS = RepeatWrapping
// roadTexture.wrapT = RepeatWrapping
// roadTexture.repeat.set(150/564, 5000/ 368)

const generateRoads = (num, rows) => {
    const roads = new Group()
    for (let i = 0; i < rows; i++) {
        const roadRow = new Group()
        const y = i * ROAD_HEIGHT
        for (let i = 0; i < num; i++) {
            const road = new Mesh(
                new PlaneGeometry(TEXTURE_ORIGIN_WIDTH / 2, TEXTURE_ORIGIN_HEIGHT / 2),
                new MeshStandardMaterial({
                    // color: randomHexColor(),
                    side: DoubleSide,
                    map: roadTexture,
                })
            )
            road.rotation.set(0, Math.PI / 2, Math.PI / 2)

            const offset = (winSize().width - num * ROAD_WIDTH) / 2 + ROAD_WIDTH / 2
            const {x} = visualToWebglCoords(offset + i * ROAD_WIDTH)

            road.position.z = x
            road.receiveShadow = true
            // road.add(new AxesHelper(50))
            roadRow.add(road)
        }
        roadRow.position.y = y
        roads.add(roadRow)
    }

    roads.rotateZ(-Math.PI / 2)
    return roads
}

const roads = generateRoads(ROAD_NUM, ROAD_ROWS)
export {roads, ROAD_WIDTH, ROAD_NUM, roadTexture, ROAD_HEIGHT}