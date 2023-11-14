import {endPage, gamingPage, startPage} from "./models";
import {scene} from "./scene";
import {numAnimate, randomHexColor, randomRange, visualToWebglCoords, winSize, $, rgbToHex, all} from "./util";
import {BlOCK_NUM, getRandomBlock} from './models/block'
import {ROAD_NUM, ROAD_WIDTH, roads, roadTexture} from "./models/road";
import {setBackground, fadeInBackground, fadeOutBackground} from "./render";
import {cars} from "./models/car";
import {moveView} from './camera'


const CHECK_INTERVAL = 1000 / 30
const DEPRECATE_INTERVAL = 1000 / 15

const GAME_STARTED = 0
const GAME_GAMING = 1
const GAME_STOPPED = 2

const BLOCK_SPEED = 2
const ROAD_SPEED = 0.01

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
        block.object.removeFromParent()
    }

    clearBlocks() {
        for (const block of this.blocks) {
            block.offMove()
            block.object.removeFromParent()
        }
        this.blocks = []
    }

    onGenerateBlock() {
        const generate = () => {
            const block = new Block()

            block.onMove()

            this.addBlock(block)

            block.onDeprecated(() => {
                block.offMove()
                this.removeBlock(block)
            })
            this.generateBlockTimer = setTimeout(generate, this.blocks.length * 50)
        }
        generate()
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

        this.roads.reset()
        this.car.fitCar()

        this.interaction.openStartPage()
        this.interaction.closeEndPage()
    }

    start() {
        this.state = GAME_GAMING

        startPage.removeFromParent()
        gamingPage.add(this.car.object)
        gamingPage.add(this.roads.object)
        scene.add(gamingPage)

        this.car.registerController()
        this.car.fitCar()
        this.roads.onMove()

        this.onGenerateBlock()
        this.onCheck()

        this.interaction.closeStartPage()
        this.interaction.openGamingPage()
    }

    stop() {
        this.state = GAME_STOPPED

        gamingPage.removeFromParent()

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
            foreach: for (let i = 0; i < this.blocks.length; i++) {
                const block = this.blocks[i]
                if (this.car.check(block) && !block.checked) {
                    switch (block.object.userData.name) {
                        case 'coin':
                            this.interaction.gamingScore(++this.score)
                            block.object.removeFromParent()
                            break;
                        default:
                            this.stop();
                            break foreach;
                    }
                    block.checked = true
                }
            }
        }, CHECK_INTERVAL)

    }

    offCheck() {
        clearInterval(this.check)
    }

    registerController() {
        this.controller = ({key, type}) => {
            switch (key) {
                case ' ':
                    if (type === 'keyup') {
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
                    }
                    break;
                case 'ArrowLeft':
                case 'ArrowRight':
                    if (type === 'keyup') {
                        if (this.state === GAME_STARTED) {
                            if (key === 'ArrowLeft') {
                                this.toggleCar(-1);
                            } else {
                                this.toggleCar(1);
                            }
                            this.car.fitCar()
                        }
                    }
                    break
                case 'ArrowUp':
                case  'ArrowDown':
                    const isArrowUp = key === 'ArrowUp'
                    const isKeydown = type === 'keydown'

                    if (isKeydown) {
                        if (isArrowUp) {
                            const isGltZero = this.roads.acceleration >= 0
                            this.roads.acceleration *= isGltZero ? 1 : -1
                            this.roads.updateSpeed(this.roads.acceleration)

                            for (const block of this.blocks) {
                                const isGltZero = block.acceleration >= 0
                                block.acceleration *= isGltZero ? 1 : -1
                                block.updateSpeed(block.acceleration)
                            }
                        } else {
                            const isGltZero = this.roads.acceleration >= 0
                            if (!this.roads.isRatioAcceleration) {
                                this.roads.acceleration *= isGltZero ? -2 : 2
                                this.roads.isRatioAcceleration = true
                            }
                            this.roads.updateSpeed(this.roads.acceleration)
                            
                            for (const block of this.blocks) {
                                const isGltZero = block.acceleration >= 0
                                if (!block.isRatioAcceleration) {
                                    block.acceleration *= isGltZero ? -4 : 4
                                    block.isRatioAcceleration = true
                                }
                                block.updateSpeed(block.acceleration)
                            }
                        }
                    } else {
                        const isGltZero = this.roads.acceleration >= 0
                        this.roads.acceleration *= isGltZero ? -1 : 1
                        this.roads.updateSpeed(this.roads.acceleration)

                        for (const block of this.blocks) {
                            const isGltZero = block.acceleration >= 0
                            block.acceleration *= isGltZero ? -1 : 1
                            block.updateSpeed(block.acceleration)
                        }
                    }
                    if (this.roads.isRatioAcceleration) {
                        this.roads.acceleration /= 2
                        this.roads.isRatioAcceleration = false
                    }
                    for (const block of this.blocks) {
                        if (block.isRatioAcceleration) {
                            block.acceleration /= 4
                            block.isRatioAcceleration = false
                        }
                    }
                    break;
                default:
                    break;
            }
        }
        document.addEventListener('keydown', this.controller)
        document.addEventListener('keyup', this.controller)
    }

    dismissController() {
        document.removeEventListener('keydown', this.controller)
        document.removeEventListener('keyup', this.controller)


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
        startPage: $('startPage'), gamingPage: $('gamingPage'), endPage: $('endPage'), score: all('.score')
    }

    gamingScore(score) {
        if (score === undefined) {
            return this.doms.score[0].innerHTML
        } else {
            this.doms.score.forEach(v => v.innerHTML = score)
        }
    }

    static moveView(x) {
        moveView(Roads.getVerticalCenterPosition(x))
    }

    openStartPage() {
        this.flags.startPage.carSelfRotate = false
        const rot = () => {
            if (!this.flags.startPage.carSelfRotate) {
                requestAnimationFrame(() => {
                    startPage.rotateY(0.003)
                    rot()
                })
            }
        }
        rot();

        setBackground(0x000000)
        this.doms.startPage.style.opacity = 1

        this.game.score = 0
        this.gamingScore(0)
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
    constructor(speed) {
        this.speed = speed
        this.acceleration = this.speed / 10

        this.max = speed * 2
        this.min = speed / 2

        this.canAccelerate(true)
        this.canOverMax(false)
    }

    reset() {
        this.speed = this.min
        this.acceleration *= this.acceleration >= 0 ? -1 : 1
    }

    updateSpeed(acceleration) {
        this.speed += acceleration
    }

    overMin() {
        const isOver = this.speed < this.min
        isOver && (this.speed = this.min)
        return isOver
    }

    inRange() {
        return !this.overMin() && !this.overMax()
    }

    overMax() {
        const isOver = this.speed > this.max
        isOver && (this.speed = this.max)
        return isOver
    }

    canAccelerate(enabled) {
        this.accelerated = enabled
    }

    canOverMax(enabled) {
        this.limited = !enabled
    }

    forward(callback) {
        this.moving = true
        const move = () => {
            let acceleration = this.accelerated ? this.acceleration : 0
            if (this.moving) {
                if (this.limited && !this.inRange()) {
                    acceleration = 0
                }
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

const Block_OFFSET_MAX = 5
const Block_OFFSET_MIN = 4

class Block extends Speed {
    x = 0
    z = 0
    checked = false

    constructor(speed = BLOCK_SPEED) {
        super(speed)

        this.object = getRandomBlock()
        this.decorate()

        const {height} = winSize()
        const ratio = randomRange(Block_OFFSET_MIN, Block_OFFSET_MAX)
        this.set(height * ratio, Roads.getVerticalCenterPosition(randomRange(0, 4)))

        this.max = this.speed * (ratio / Block_OFFSET_MAX) * 10
        this.min = this.speed / 2
        this.acceleration = this.speed / 200
    }

    decorate() {
        const model = this.object
        if (model.userData.name === 'coin') {
            const rot = () => {
                requestAnimationFrame(() => {
                    if (this.moving) {
                        model.rotateY(0.05)
                        rot()
                    }
                })
            }
            rot()
        }
    }

    set(x, z) {
        this.object.position.setX(x)
        this.object.position.setZ(z)
        this.x = x
        this.z = z
    }

    onMove() {
        this.forward(speed => {
            this.set(this.x - speed, this.z)
        })
    }

    offMove() {
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
        this.roadIndex = Math.floor(ROAD_NUM / 2)
        this.object.position.set(0, 0, 0)
        this.object.rotation.set(0, Math.PI / 180 * 90, 0)
        Interaction.moveView(this.roadIndex)
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
                    Interaction.moveView(this.roadIndex)
                    break;
                case 'ArrowRight':
                    this.toRight();
                    Interaction.moveView(this.roadIndex)
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

    constructor(roads, speed = ROAD_SPEED) {
        super(speed)
        this.object = roads

        this.max = this.speed * 3
        this.min = this.speed / 2
        this.acceleration = this.speed / 500
    }

    static getVerticalCenterPosition(roadIndex) {
        const offset = (winSize().width - (ROAD_NUM * ROAD_WIDTH)) / 2 + ROAD_WIDTH / 2
        const {x} = visualToWebglCoords(offset + roadIndex * ROAD_WIDTH)
        return x
    }

    onMove() {
        this.forward(speed => {
            roadTexture.offset.y -= speed
            console.log(this.speed)
        })
    }

    offMove() {
        this.halt()
    }
}

export {Game, Car, Block}