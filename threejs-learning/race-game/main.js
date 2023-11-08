import './style.css'
import {renderToBody, useControls, useRefresh, useResize} from "./render";
import {useConfig, useScene} from "./scene";

useResize()
useRefresh()
renderToBody()
useControls()

useConfig()
useScene()