import {Group} from "three";
import {car} from "./car";
import {roads} from "./road";
import {blocks} from "./block";

const startPage = new Group()
startPage.add(car.clone())

const gamingPage = new Group()

const endPage = new Group()

export {startPage, gamingPage, endPage}