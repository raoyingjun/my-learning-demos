import {startPage, gamingPage, endPage} from "./models";
import {scene} from "./scene";
import {car} from "./models/car";
import {randomHexColor, randomRange, visualToWebglCoords, winSize} from "./util";
import {blocks} from './models/block'
import {ROAD_WIDTH, roads, ROAD_NUM} from "./models/road";

const GENERATE_BLOCK_INTERVAL_TIME = 1000

class Game {
    score = 0
    blocks = []

    constructor(car, roads) {
        this.setCar(new Car(car))
        this.setRoads(new Roads(roads))
    }

    run() {
        scene.add(startPage)
    }

    addBlock(block) {
        this.blocks.push(block)
        scene.add(block.object)
    }

    onGenerateBlock() {
        this.generateBlockTimer = setInterval(() => {
            const block = new Block()

            block.onMove()

            this.addBlock(block)

        }, GENERATE_BLOCK_INTERVAL_TIME)
    }

    offGenerateBlock() {
        clearInterval(this.generateBlockTimer)
    }


    setCar(car) {
        this.car = car
    }

    setRoads(roads) {
        this.roads = roads
    }

    start() {
        scene.remove(startPage)

        gamingPage.add(this.car.object)
        gamingPage.add(this.roads.object)
        scene.add(gamingPage)

        this.onGenerateBlock()
    }

    stop() {
        scene.remove(gamingPage)
        scene.add(endPage)
    }
}

class Block {
    x = 0
    z = 0
    moving = false

    constructor(distance = 4) {
        const object = blocks.children[randomRange(0, 2)].clone(true)
        object.material.color.set(randomHexColor())
        this.object = object

        const {width} = winSize()
        this.set(
            randomRange(width / 2, width * 2),
            Roads.getVerticalCenterPosition(randomRange(0, 4))
        )

        this.distance = distance
    }

    set(x, z) {
        this.object.position.setX(x)
        this.object.position.setZ(z)
        this.x = x
        this.z = z
    }

    onMove() {
        this.moving = true
        const move = () => {
            if (this.moving) {
                this.set(this.x - this.distance, this.z)
            }
            requestAnimationFrame(move)
        }
        move()
    }

    offMove() {
        this.moving = false
    }

}

class Car {
    check() {
        console.log(this)
    }

    constructor(car) {
        this.object = car
    }


    toLeft() {

    }

    toRight() {

    }

}

class Roads {
    constructor() {
        this.object = roads
    }

    static getVerticalCenterPosition(roadIndex) {
        const offset = (winSize().width - (ROAD_NUM * ROAD_WIDTH)) / 2 + ROAD_WIDTH / 2
        const {x} = visualToWebglCoords(offset + roadIndex * ROAD_WIDTH)
        return x

    }
}

export {Game, Car, Block}