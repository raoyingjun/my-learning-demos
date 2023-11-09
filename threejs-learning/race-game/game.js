import {endPage, gamingPage, startPage} from "./models";
import {scene} from "./scene";
import {numAnimate, randomHexColor, randomRange, visualToWebglCoords, winSize, $, rgbToHex} from "./util";
import {BlOCK_NUM, getRandomBlock} from './models/block'
import {ROAD_NUM, ROAD_WIDTH, roads} from "./models/road";
import {renderer} from "./render";
import {cars} from "./models/car";


const GENERATE_BLOCK_MAX_INTERVAL = 1500
const GENERATE_BLOCK_MIN_INTERVAL = 1000

const CHECK_INTERVAL = 1000 / 30
const DEPRECATE_INTERVAL = 1000 / 15

const GAME_STARTED = 0
const GAME_GAMING = 1
const GAME_STOPPED = 2

class Game {
    state = GAME_STARTED
    score = 0
    blocks = []
    selectedCar = 0

    constructor() {
        this.setCar(cars)
        this.setRoads(roads)
        this.interaction = new Interaction(this)
    }

    run() {
        this.state = GAME_STARTED

        startPage.add(this.car.object)
        scene.add(startPage)

        this.registerController()

        this.interaction.openStartPage()
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

    setCar(cars) {
        this.car = new Car(cars.children[this.selectedCar])
    }

    setRoads(roads) {
        this.roads = new Roads(roads)
    }

    start() {
        this.state = GAME_GAMING

        scene.remove(startPage)

        gamingPage.add(this.car.object)
        gamingPage.add(this.roads.object)
        scene.add(gamingPage)

        this.car.registerController()
        this.onGenerateBlock()
        this.onCheck()

        this.interaction.closeStartPage()
    }

    stop() {
        this.state = GAME_STOPPED

        scene.remove(gamingPage)

        endPage.add(this.car.object)
        scene.add(endPage)

        this.car.dismissController()
        this.offGenerateBlock()
        this.offCheck()
    }

    onCheck() {
        this.check = setInterval(() => {
            for (let block of this.blocks) {
                if (this.car.check(block)) {
                    this.stop()
                    break;
                }
            }
        }, CHECK_INTERVAL)

    }

    offCheck() {
        clearInterval(this.check)
    }

    registerController() {
        this.controller = ({key}) => {
            console.log(key)
            switch (key) {
                case ' ':
                    if (this.state !== GAME_GAMING) {
                        this.start()
                    }
                    break;
                default:
                    break;
            }

        }
        document.addEventListener('keydown', this.controller)
    }

    dismissController() {
        document.removeEventListener('keydown', this.controller)
    }
}

class Interaction {
    constructor(game) {
        this.game = game
    }

    flags = {
        startPage: {
            aborted: false
        }
    }

    doms = {
        startPage: $('startPage')
    }

    openStartPage() {
        const rot = () => {
            if (!this.flags.startPage.aborted)
                requestAnimationFrame(() => {
                    startPage.rotateY(0.003)
                    rot()
                })
        }
        rot();

        renderer.setClearColor(0x000000)
    }

    closeStartPage() {
        this.flags.startPage.aborted = true

        this.game.car.object.rotateY(Math.PI / 2)

        this.doms.startPage.style.opacity = 0

        numAnimate({
            from: 0,
            to: 255,
            onStep: v => renderer.setClearColor(rgbToHex(...Array(3).fill(v))),
            step: 30
        })
    }

    gamingPageAnimation() {
        let aborted = false
        const rot = () => {
            if (!aborted)
                requestAnimationFrame(() => {
                    rot()
                })
        }
        return () => {
            aborted = true
        }
    }
}

class Block {
    x = 0
    z = 0
    moving = false

    constructor(distance = 4) {
        const object = getRandomBlock()
        Block.decorate(object)
        this.object = object

        const {height} = winSize()
        this.set(
            randomRange(height * 2, height * 4),
            Roads.getVerticalCenterPosition(randomRange(0, 4))
        )

        this.distance = distance
    }

    static decorate(model) {
        model.material.color.set(randomHexColor())
        model.material.transparent = true
        numAnimate({
            from: 0,
            to: 1,
            onStep: v => model.material.opacity = v,
            step: 200
        })
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
        this.deprecated = setInterval(() => {
            if (this.x < 0 && Math.abs(this.x) > winSize().height) {
                clearInterval(this.deprecated)
                callback && callback()
            }
        }, DEPRECATE_INTERVAL)
    }

}

class Car {
    roadIndex = Math.floor(ROAD_NUM / 2)

    check(block) {
        const {position: {x: bpx, z: bpz}, scale: {x: bsx, z: bsz}} = block.object
        const {position: {x: cpx, z: cpz}, scale: {x: csx, z: csz}} = this.object
        const xCheck = Math.abs(bpx - cpx) <= (csx / 2 + bsx / 2)
        const zCheck = Math.abs(bpz - cpz) <= (csz / 2 + bsz / 2)
        return xCheck && zCheck;
    }


    constructor(car) {
        this.object = car
    }

    toLeft() {
        if (this.roadIndex > 0) {
            numAnimate({
                from: this.object.position.z,
                to: Roads.getVerticalCenterPosition(--this.roadIndex),
                onStep: v => this.object.position.setZ(v)
            })
        }
    }

    toRight() {
        if (this.roadIndex < ROAD_NUM - 1) {
            numAnimate({
                from: this.object.position.z,
                to: Roads.getVerticalCenterPosition(++this.roadIndex),
                onStep: v => this.object.position.setZ(v)
            })
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