// class类和interface接口
export {} // 使用export表示这是个模块。以防止命名冲突。

enum Position {
    FrontLeft = "FrontLeft",
    FrontRight = "FrontRight",
    RearLeft = "RearLeft",
    RearRight = "RearRight"
}
// 定义一个Door门的接口
interface Door {
    openDoor(dir: Position): void // 开指定方向的门
}
// 定义一个Car车的接口
interface Car {
    color: string
    weight: string
    run(distance: number): void // 跑了多长距离
}
// 实现接口
class BenChi implements Car, Door {
    color: string;
    weight: string;

    constructor(color: string, weight: string) {
        this.color = color
        this.weight = weight
    }

    openDoor(dir: Position): void {
        console.log(`Open door of ${dir} position`)
    }

    run(distance: number): void {
        console.log(`The run distance is ${distance}`)
    }
}

