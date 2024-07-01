import {endPage, gamingPage, startPage} from "./models";
import {scene, setBgLight, fadeInBg, fadeOutBg} from "./scene";
import {$, all, debounce, global, numAnimate, randomRange, updateFps, visualToWebglCoords, winSize} from "./util";
import {getRandomBlock} from './models/block'
import {ROAD_HEIGHT, ROAD_NUM, ROAD_WIDTH, roads, roadTexture} from "./models/road";
import {orbitControls} from "./render";
import {cars} from "./models/car";
import {defaultView, moveView, camera} from './camera'
import {directionalLight} from "./models/light";
import {AxesHelper, Vector3} from "three";


const CHECK_INTERVAL = 1000 / 30
const DEPRECATE_INTERVAL = 1000 / 15
const GENERATE_INTERVAL = 1000 / 5


const GAME_STARTED = 0
const GAME_GAMING = 1
const GAME_STOPPED = 2

const SPEED = 2

class Game {
    state = GAME_STARTED
    blocks = []
    selectedCar = 0

    ready(done) {
        requestAnimationFrame(() => {
            updateFps(() => {
                this.interaction = new Interaction(this)

                this.setCar(cars)
                this.setRoads(roads)
                this.registerController()

                done && done()
            })
            if (!updateFps.ready) {
                this.ready(done)
            }
        })
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

    isTooMuchBlock() {
    }

    onGenerateBlock() {
        const generate = () => {
            const {acceleration, speed, max} = this.roads
            if (!this.interaction.isReducing) {
                const block = new Block()

                block.acceleration = acceleration
                block.speed = speed

                block.onMove()

                this.addBlock(block)

                block.onDeprecated(() => {
                    block.offMove()
                    this.removeBlock(block)
                })
            }
            this.generateBlockTimer = setTimeout(generate, GENERATE_INTERVAL * (max / (Math.max(speed, SPEED))))
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

        this.roads.reset()
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
                            this.interaction.collectCoin(block)
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
        let isDeced = false
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
                    const isAcc = isKeydown && isArrowUp
                    const isDec = isKeydown && !isArrowUp
                    const ratio = isAcc ? 1 : isDec ? isDeced ? -1 : -2 : isDeced ? -0.5 : -1

                    if(isDec && !isDeced) {
                        isDeced = true
                    }
                    if (!isDec && isDeced) {
                        isDeced = false
                    }

                    this.roads.acceleration = Math.abs(this.roads.acceleration) * ratio
                    this.roads.updateSpeed(this.roads.acceleration)

                    for (const block of this.blocks) {
                        block.acceleration = Math.abs(block.acceleration) * ratio
                        block.updateSpeed(block.acceleration)
                    }

                    this.interaction.isReducing = !isAcc

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
    score = 0
    time = 0
    isReducing = true

    constructor(game) {
        this.game = game

        this.useOrbitControls()

        this.closeGamingPage()
        this.closeEndPage()
    }

    flags = {
        startPage: {
            carSelfRotate: false
        }
    }

    doms = {
        startPage: $('startPage'),
        gamingPage: $('gamingPage'),
        endPage: $('endPage'),
        score: all('.score'),
        time: all('.time'),
        gamingTip: $('gamingTip')
    }

    bounce(ele) {
        ele.classList.add('bounce')
        ele.onanimationend = () => ele.classList.remove('bounce')
    }

    collectCoin(block) {
        block.offMove()

        const {offsetLeft, offsetTop} = this.doms.score[0]
        let {x: z, y} = visualToWebglCoords(offsetLeft, offsetTop)
        z += block.z

        const done = () => {
            this.html(this.doms.score, ++this.score)
            this.bounce(this.doms.score[0])
            block.object.removeFromParent()
        }

        const parts = []
        block.object.traverse(o => o.isMesh && parts.push(o.material))

        const targetMap = [
            block.object.position,
            block.object.position,
            block.object.scale,
            block.object.scale,
            block.object.scale,
        ].concat(parts)
        const keyMap = ['y', 'z', 'x', 'y', 'z'].concat(Array(parts.length).fill('opacity'))
        const valueMap = [y, z, 0, 0, 0].concat(Array(parts.length).fill(0))

        let [f, t] = [0, targetMap.length]

        const stepMap = {
            y: 200,
            opacity: 75,
        }

        for (const [index, target] of targetMap.entries()) {
            const isOpacity = keyMap[index] === 'opacity'
            const isPositionY = (keyMap[index] === 'y') && (target === block.object.position)
            const step = isPositionY ? 60 : isOpacity ? 60 : 100
            numAnimate({
                from: target[keyMap[index]],
                to: valueMap[index],
                onStep: v => target[keyMap[index]] = v,
                onComplete: () => {
                    isOpacity && (target['visible'] = false)
                    ;(++f === t) && done()
                },
                step: step
            })
        }
    }

    html(elements, value) {
        if (value === undefined) {
            return elements.innerHTML
        } else {
            elements.forEach(v => v.innerHTML = value)
        }
    }

    static moveView(v) {
        moveView({z: Roads.getVerticalCenterPosition(v)}, camera.position)
    }

    openStartPage() {
        this.flags.startPage.carSelfRotate = false
        const rot = () => {
            if (!this.flags.startPage.carSelfRotate) {
                requestAnimationFrame(() => {
                    startPage.rotateY(0.003 * global.animationRatio)
                    rot()
                })
            }
        }
        rot();

        setBgLight(0)
        this.doms.startPage.style.opacity = 1


        this.html(this.doms.score, (this.score = 0))
        this.html(this.doms.time, `${(this.time = 0)}`)
    }

    closeStartPage() {
        this.flags.startPage.carSelfRotate = true
        this.doms.startPage.style.opacity = 0
    }

    startTimer() {
        this.timer = setInterval(() => {
            this.html(this.doms.time, `${++this.time}`)
        }, 1000)
    }

    stopTimer() {
        clearInterval(this.timer)
    }

    showGamingTip() {
        const tip = this.doms.gamingTip

        tip.style.display = 'block'
        requestAnimationFrame(() => {
            tip.classList.add('animation')
        })

        tip.ontransitionend = () => {
            tip.classList.remove('animation')
            tip.style.display = 'none'
        }
    }

    openGamingPage() {
        fadeInBg()
        this.doms.gamingPage.style.opacity = 1

        this.showGamingTip()
        this.startTimer()
    }

    closeGamingPage() {
        this.doms.gamingPage.style.opacity = 0
        this.stopTimer()
    }

    openEndPage() {
        this.doms.endPage.style.opacity = 1
        fadeOutBg()
    }

    closeEndPage() {
        this.doms.endPage.style.opacity = 0
    }

    useOrbitControls() {
        orbitControls.addEventListener('end', debounce(() => {
            const z = {z: Roads.getVerticalCenterPosition(this.game.car.roadIndex)}
            moveView({...defaultView, ...(this.game.state === GAME_GAMING ? z : null)}, camera.position, orbitControls.update)
            moveView({x: 0, y: 0, ...z}, orbitControls.target, orbitControls.update)
        }, 1500))
    }
}

class Speed {
    constructor(speed) {
        this.speed = speed
        this.acceleration = this.speed / 100
        this.max = speed * 10
        this.min = 0

        this.canAccelerate(true)
        this.canOverMax(false)
    }

    reset() {
        this.speed = this.min
        this.acceleration *= (this.acceleration >= 0 ? -1 : 1)
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

    constructor(speed = SPEED) {
        super(speed * global.animationRatio)

        this.object = getRandomBlock()
        this.decorate()

        const {height} = winSize()
        const ratio = randomRange(Block_OFFSET_MIN, Block_OFFSET_MAX)
        this.set(height * ratio * 2, Roads.getVerticalCenterPosition(randomRange(0, 4)))

        this.reset()
    }

    decorate() {
        const model = this.object
        if (model.userData.name === 'coin') {
            const rot = () => {
                requestAnimationFrame(() => {
                    if (this.moving) {
                        model.rotateY(0.05 * global.animationRatio)
                        rot()
                    }
                })
            }
            rot()
        }
        model.traverse(o => {
            if (o.isMesh) {
                numAnimate({
                    from: 0,
                    to: 1,
                    onStep: v => o.material.opacity = v,
                    step: 200
                })
            }
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

        const {position: {x: bpx, z: bpz}, children: {0: {scale: {x: bsx, z: bsz}}}} = block.object
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
        this.object.rotation.set(0, Math.PI / 2, 0)
        // this.object.add(new AxesHelper(50))
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
    x = 0

    constructor(roads, speed = SPEED) {
        super(speed * global.animationRatio)
        this.object = roads
        this.reset()
        this.onDeprecated(() => {
            const holder = this.object.children[0].removeFromParent()
            holder.position.y = this.object.children[this.object.children.length - 1].position.y + ROAD_HEIGHT
            this.object.add(holder)
        })

    }

    static getVerticalCenterPosition(roadIndex) {
        const offset = (winSize().width - (ROAD_NUM * ROAD_WIDTH)) / 2 + ROAD_WIDTH / 2
        const {x} = visualToWebglCoords(offset + roadIndex * ROAD_WIDTH)
        return x
    }

    onMove() {
        this.forward(speed => {
            this.set(this.x - speed)

        })
    }

    set(x) {
        this.object.position.setX(x)
        this.x = x
    }

    offMove() {
        this.halt()
    }

    onDeprecated(callback) {
        this.deprecated = setInterval(() => {
            const {x} = this.object.children[0].getWorldPosition(new Vector3())
            if (x < 0 && Math.abs(x) > winSize().height) {
                callback && callback()
            }
        }, DEPRECATE_INTERVAL)
    }

    restoreRoad() {
        const cds = this.object.children
        for (let i = 0, len = this.object.children; i < len; i++) {
            cds[i].position.y = i * ROAD_HEIGHT
        }
    }

    reset() {
        super.reset()
        this.restoreRoad()
    }
}

export {Game, Car, Block}