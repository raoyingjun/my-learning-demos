import {startPage, gamingPage, endPage} from "./models";
import {scene} from "./scene";
import {car} from "./models/car";
import {randomHexColor, randomRange, visualToWebglCoords, winSize, numAnimate, getModelBox3Size} from "./util";
import {blocks} from './models/block'
import {ROAD_WIDTH, roads, ROAD_NUM} from "./models/road";

const GENERATE_BLOCK_MAX_INTERVAL = 1500
const GENERATE_BLOCK_MIN_INTERVAL = 1000

const CHECK_INTERVAL = 1000 / 30

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
        gamingPage.add(block.object)
    }

    removeBlock(block) {
        const index = this.blocks.indexOf(block)
        this.blocks.splice(index, 1)
        gamingPage.remove(block.object)
    }

    onGenerateBlock() {
        this.generateBlockTimer = setInterval(() => {
            const block = new Block()

            block.onMove()

            this.addBlock(block)

            block.onDeprecated(() => {
                this.removeBlock(block)
            })
        }, randomRange(GENERATE_BLOCK_MIN_INTERVAL, GENERATE_BLOCK_MAX_INTERVAL))
    }

    offGenerateBlock() {
        clearInterval(this.generateBlockTimer)
        for (const block of this.blocks) {
            block.offMove()
        }
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

        this.car.registerController()
        this.onGenerateBlock()
        this.onCheck()
    }

    stop() {
        // scene.remove(gamingPage)

        // endPage.add(this.car.object)
        // scene.add(endPage)
        this.car.dismissController()
        this.offGenerateBlock()
        this.offCheck()
        this.offGenerateBlock()
    }

    onCheck() {
        const check = () => {
            requestAnimationFrame(() => {
                for (let block of this.blocks) {
                    if (this.car.check(block)) {
                        this.stop()
                        break;
                    }
                }
                check()
            })
        }
        check()

        // this.check = setInterval(() => {
        //     for (let block of this.blocks) {
        //         if (this.car.check(block)) {
        //             this.stop()
        //             break;
        //         }
        //     }
        // }, CHECK_INTERVAL)

    }

    offCheck() {
        clearInterval(this.check)
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

    onDeprecated(callback) {
        const deprecate = () => {
            if (this.x < 0 && Math.abs(this.x) > winSize().height) {
                callback && callback()
            } else {
                requestAnimationFrame(deprecate)
            }
        }
        deprecate()
    }

}

class Car {
    roadIndex = Math.floor(ROAD_NUM / 2)

    check(block) {
        const {position: {x: bpx, z: bpz}, scale: {x: bsx, z: bsz}} = block.object
        const {position: {x: cpx, z: cpz}, scale: {x: csx, z: csz}} = this.object
        console.log(
            'bpx', bpx,
            'cpx', cpx,
            'csx / 2 + bsx / 2', csx / 2 + bsx / 2,
            'csx', csx,
            'bsx', bsx
        )
        console.log(
            'bpz', bpz,
            'cpz', cpz,
            'csz / 2 + bsz / 2', csz / 2 + bsz / 2,
            'csz', csz,
            'bsz', bsz
        )
        const xCheck = Math.abs(bpx - cpx) <= (csx / 2 + bsx / 2)
        const zCheck = Math.abs(bpz - cpz) <= (csz / 2 + bsz / 2)
        return xCheck && zCheck;
    }


    constructor(car) {
        this.object = car
    }

    toLeft() {
        if (this.roadIndex > 0) {
            numAnimate(
                this.object.position.z,
                Roads.getVerticalCenterPosition(--this.roadIndex),
                v => this.object.position.setZ(v)
            )
        }
    }

    toRight() {
        if (this.roadIndex < ROAD_NUM - 1) {
            numAnimate(
                this.object.position.z,
                Roads.getVerticalCenterPosition(++this.roadIndex),
                v => this.object.position.setZ(v)
            )
        }
    }

    registerController() {
        this.control = ({key}) => {
            switch (key) {
                case 'ArrowLeft':
                    this.toLeft();
                    break;
                case 'ArrowRight':
                    this.toRight();
                    break;
                default:
                    break;
            }
        }
        document.addEventListener('keydown', this.control)
    }

    dismissController() {
        document.removeEventListener('keydown', this.control)
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