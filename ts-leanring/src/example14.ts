// abstract class抽象类
export {} // 使用export表示这是个模块。以防止命名冲突。

abstract class Animal {
    name: string
    // 自身实现的构造方法
    constructor(name: string) {
        this.name = name
    }
    // 该抽象类实现的方法
    eat(food: string): void {
        console.log(`Eat food ${food}`)
    }
    // 需要被实现的方法
    abstract move(): void
}

class Dog extends Animal {
    // 子类继承实现的方法
    move(): void {
        console.log('Moving moving...')
    }
}

const dog = new Dog('哈士奇')
console.log(dog)
dog.move()
dog.eat('猪肉')
