"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Position;
(function (Position) {
    Position["FrontLeft"] = "FrontLeft";
    Position["FrontRight"] = "FrontRight";
    Position["RearLeft"] = "RearLeft";
    Position["RearRight"] = "RearRight";
})(Position || (Position = {}));
// 实现接口
var BenChi = /** @class */ (function () {
    function BenChi(color, weight) {
        this.color = color;
        this.weight = weight;
    }
    BenChi.prototype.openDoor = function (dir) {
        console.log("Open door of " + dir + " position");
    };
    BenChi.prototype.run = function (distance) {
        console.log("The run distance is " + distance);
    };
    return BenChi;
}());
//# sourceMappingURL=example13.js.map