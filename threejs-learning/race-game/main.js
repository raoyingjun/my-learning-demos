import './style.css'
import {renderToBody, useControls, useRefresh, useResize} from "./render";
import {useConfig, useScene} from "./scene";;
import {Game} from "./game";
import {car} from "./models/car";
import {roads} from "./models/road";


useResize()
useRefresh()
renderToBody()
useControls()

useConfig()
useScene()

const game = new Game(car, roads)
game.run()
game.start()

// https://blog.csdn.net/nanchen_J/article/details/131759699