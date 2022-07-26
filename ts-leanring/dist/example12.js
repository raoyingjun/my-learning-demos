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
var Person = /** @class */ (function () {
    function Person(name, age, gender) {
        this.uid = 17485; // 私有属性。外界无法访问和修改
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    return Person;
}());
var p = new Person('Jack', 18, '男');
// p.uid // 这里会报错，无法访问。因为是私有属性。
// p.uid = 15488 // 这里会报错，无法修改值。因为是私有属性。
// p.gender // 这里会报错，无法访问。因为是受保护的属性。
// p.gender = '女' // 这里会报错，无法修改值。因为是受保护的属性。
// p.age = 18 // 这里会报错，无法修改值。因为是只读属性。
var Student = /** @class */ (function (_super) {
    __extends(Student, _super);
    // 使用private修饰constructor。该类将不能被实例化和继承
    function Student(name, age, gender, school) {
        var _this = _super.call(this, name, age, gender) || this;
        _this.school = school;
        return _this;
    }
    // 使用static关键字修饰的方法仍然属于其内部，所以不受private的影响
    Student.create = function (name, age, gender, school) {
        return new Student(name, age, gender, school);
    };
    return Student;
}(Person));
// new Student() // 这里会报错，无法实例化。因为是私有属性
Student.create('小明', 19, '男', '深圳小学'); // 能正常工作。返回创建的实例
//# sourceMappingURL=example12.js.map