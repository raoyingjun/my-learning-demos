"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Animal = /** @class */ (function () {
    // 自身实现的构造方法
    function Animal(name) {
        this.name = name;
    }
    // 该抽象类实现的方法
    Animal.prototype.eat = function (food) {
        console.log("Eat food " + food);
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 子类继承实现的方法
    Dog.prototype.move = function () {
        console.log('Moving moving...');
    };
    return Dog;
}(Animal));
var dog = new Dog('哈士奇');
console.log(dog);
dog.move();
dog.eat('猪肉');
//# sourceMappingURL=example14.js.map