import './style.css'
import {renderToBody, useRefresh, useResize} from "./render";
import {useScene} from "./scene";
import {Game} from "./game";
import {cars} from "./models/car";
import {roads} from "./models/road";


useResize()
useRefresh()
renderToBody()

useScene()

const game = new Game()
game.ready(() => game.run())


// https://blog.csdn.net/nanchen_J/article/details/131759699