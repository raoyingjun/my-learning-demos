import {endPage, gamingPage, startPage} from "./models";
import {scene} from "./scene";
import {numAnimate, randomHexColor, randomRange, visualToWebglCoords, winSize, $, rgbToHex} from "./util";
import {BlOCK_NUM, getRandomBlock} from './models/block'
import {ROAD_NUM, ROAD_WIDTH, roads, roadTexture} from "./models/road";
import {setBackground, fadeInBackground, fadeOutBackground} from "./render";
import {cars} from "./models/car";
import {min} from "three/nodes";


const GENERATE_BLOCK_MAX_INTERVAL = 1500
const GENERATE_BLOCK_MIN_INTERVAL = 1000

const CHECK_INTERVAL = 1000 / 30
const DEPRECATE_INTERVAL = 1000 / 15

const GAME_STARTED = 0
const GAME_GAMING = 1
const GAME_STOPPED = 2

const BLOCK_SPEED = 4
const BLOCK_ACCELERATION = 0.01

const ROAD_SPEED = 0.02
const ROAD_ACCELERATION = 0.00001

class Game {
    state = GAME_STARTED
    score = 0
    blocks = []
    selectedCar = 0

    constructor() {
        this.interaction = new Interaction(this)
        this.setCar(cars)
        this.setRoads(roads)

        this.registerController()
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

    clearBlocks() {
        for (const block of this.blocks) {
            block.offMove()
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
                block.offMove()
                this.removeBlock(block)
            })
        }, randomRange(GENERATE_BLOCK_MIN_INTERVAL, GENERATE_BLOCK_MAX_INTERVAL))
    }

    offGenerateBlock() {
        clearInterval(this.generateBlockTimer)
    }

    setCar(cars) {
        this.car = new Car(cars.children[this.selectedCar].clone())
    }

    toggleCar(increment) {
        if ((this.selectedCar + increment) === cars.children.length) {
            this.selectedCar = 0
        } else if ((this.selectedCar + increment) === -1) {
            this.selectedCar = cars.children.length - 1
        } else {
            this.selectedCar += increment
        }

        this.car.object.removeFromParent()

        const car = cars.children[this.selectedCar].clone()

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

        this.car.fitCar()

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
        this.roads.onMove()

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
        this.roads.offMove()

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
            switch (key) {
                case ' ':
                    switch (this.state) {
                        case GAME_STARTED:
                            this.start()
                            break;
                        case GAME_GAMING:
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
                case 'ArrowUp':
                    console.log('dd')
                    this.roads.canAccelerate(true)
                    break;
                case  'ArrowDown':
                    this.roads.canAccelerate(false)
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

class Speed {
    constructor(speed, acceleration) {
        this.speed = speed
        this.acceleration = acceleration

        this.max = speed * 2
        this.canOverMax(false)
    }

    setMax(max) {
        this.max = max
    }

    overLimit() {
        console.log(this.speed, this.max)
        return this.speed > this.max
    }
    canAccelerate(enabled){
        this.accelerated = enabled
    }
    canOverMax(enabled) {
        this.limited = !enabled
    }

    forward(callback, accelerated) {
        this.moving = true
        this.canAccelerate(accelerated)
        const move = () => {
            let acceleration = this.accelerated ? this.acceleration : 0
            if (this.moving) {
                if (this.limited && this.overLimit()) {
                    acceleration = 0
                }
                console.log('acc',acceleration, this.moving)
                callback && callback(this.speed)
                this.speed += acceleration
                requestAnimationFrame(move)
            }
        }
        move()
    }

    halt() {
        this.moving = false
    }
}

class Block extends Speed {
    x = 0
    z = 0
    moving = false

    constructor(speed = BLOCK_SPEED, acceleration = BLOCK_ACCELERATION) {
        super(speed, acceleration)

        const object = getRandomBlock()
        Block.decorate(object)
        this.object = object

        const {height} = winSize()
        this.set(
            randomRange(height * 2, height * 4),
            Roads.getVerticalCenterPosition(randomRange(0, 4))
        )
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
        this.forward(speed => {
            this.set(this.x - this.speed, this.z)
        })
    }

    offMove() {
        console.log('block off')
        this.halt()
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
        this.object = car.clone()
    }

    fitCar() {
        this.object.position.set(0, 0, 0)
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

class Roads extends Speed {
    move = false

    constructor(roads, speed = ROAD_SPEED, acceleration = ROAD_ACCELERATION) {
        super(speed, acceleration)
        this.object = roads
    }

    static getVerticalCenterPosition(roadIndex) {
        const offset = (winSize().width - (ROAD_NUM * ROAD_WIDTH)) / 2 + ROAD_WIDTH / 2
        const {x} = visualToWebglCoords(offset + roadIndex * ROAD_WIDTH)
        return x
    }

    onMove() {
        this.forward(speed => {
            roadTexture.offset.y -= speed
        })
    }

    offMove() {
        this.halt()
    }
}

export {Game, Car, Block}