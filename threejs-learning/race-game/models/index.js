import {Group} from "three";
import {car} from "./car";

const startPage = new Group()
startPage.add(car)

const gamingPage = new Group()
const endPage = new Group()

export {startPage, gamingPage, endPage}