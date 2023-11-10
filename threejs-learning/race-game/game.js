import {endPage, gamingPage, startPage} from "./models";
import {scene} from "./scene";
import {numAnimate, randomHexColor, randomRange, visualToWebglCoords, winSize, $, rgbToHex} from "./util";
import {BlOCK_NUM, getRandomBlock} from './models/block'
import {ROAD_NUM, ROAD_WIDTH, roads} from "./models/road";
import {setBackground, fadeInBackground, fadeOutBackground} from "./render";
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
        this.interaction = new Interaction(this)
        this.setCar(cars)
        this.setRoads(roads)
    }

    addBlock(block) {
        this.blocks.push(block)
        gamingPage.add(block.object)
    }

    removeBlock(block) {
        const index = this.blocks.indexOf(block)
        this.blocks.splice(index, 1)
        console.log('block.object', block.object)
        gamingPage.remove(block.object)
    }

    clearBlocks() {
        for (const block of this.blocks) {
            gamingPage.remove(block.object)
        }
        this.blocks = []
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

    toggleCar(increment) {
        console.log('incre', increment);
        if ((this.selectedCar + increment) === cars.children.length) {
            console.log('do if')
            this.selectedCar = 0
        } else if ((this.selectedCar + increment) === -1) {
            console.log('do elseif')
            this.selectedCar = cars.children.length - 1
        } else {
            this.selectedCar += increment
        }

        const car = cars.children[this.selectedCar]

        cars.add(this.car.object)
        startPage.add(car)

        this.car.object = car
    }

    setRoads(roads) {
        this.roads = new Roads(roads)
    }

    run() {
        this.state = GAME_STARTED

        this.toggleCar(0)
        scene.add(startPage)

        this.car.fitHead()

        this.registerController()

        this.interaction.openStartPage()
        this.interaction.closeEndPage()
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
        this.interaction.openGamingPage()
    }

    stop() {
        this.state = GAME_STOPPED

        scene.remove(gamingPage)

        scene.add(endPage)
        this.car.dismissController()
        this.offGenerateBlock()
        this.offCheck()
        this.clearBlocks()

        this.interaction.closeGamingPage()
        this.interaction.openEndPage()
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
                    switch (this.state) {
                        case GAME_STARTED:
                            this.start()
                            break;
                        case GAME_GAMING:
                            // this.start();
                            break;
                        case GAME_STOPPED:
                            this.run()
                            break;
                        default:
                            break;

                    }
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    if (this.state === GAME_STARTED) {
                        if (key === 'ArrowLeft') {
                            this.toggleCar(-1);
                        } else {
                            this.toggleCar(1);
                        }
                    }
                    break
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
            carSelfRotate: false
        }
    }

    doms = {
        startPage: $('startPage'),
        endPage: $('endPage')
    }

    openStartPage() {
        this.flags.startPage.carSelfRotate = false
        const rot = () => {
            if (!this.flags.startPage.carSelfRotate)
                requestAnimationFrame(() => {
                    startPage.rotateY(0.003)
                    rot()
                })
        }
        rot();

        setBackground(0x000000)
        this.doms.startPage.style.opacity = 1
    }

    closeStartPage() {
        this.flags.startPage.carSelfRotate = true
        this.doms.startPage.style.opacity = 0
    }

    openGamingPage() {
        fadeInBackground()
    }

    closeGamingPage() {

    }

    openEndPage() {
        this.doms.endPage.style.opacity = 1
        fadeOutBackground()
    }

    closeEndPage() {
        this.doms.endPage.style.opacity = 0
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
            step: 300
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

    fitHead() {
        this.object.position.set(0, 0, 0)
        this.object.rotation.set(0, Math.PI / 2, 0)
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