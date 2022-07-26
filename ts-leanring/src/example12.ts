// class类
export {} // 使用export表示这是个模块。以防止命名冲突。

class Person {
    public name: string // 属性默认就是public修饰的，加与不加都一样
    readonly age: number // 只读属性。声明后将无法进行修改
    protected gender: string // 受保护的属性。外界无法访问和修改，仅支持自身和子类访问
    private uid = 17485 // 私有属性。外界无法访问和修改
    constructor(name: string, age: number, gender: string) {
        this.name = name
        this.age = age
        this.gender = gender
    }
}

const p = new Person('Jack', 18, '男')
// p.uid // 这里会报错，无法访问。因为是私有属性。
// p.uid = 15488 // 这里会报错，无法修改值。因为是私有属性。
// p.gender // 这里会报错，无法访问。因为是受保护的属性。
// p.gender = '女' // 这里会报错，无法修改值。因为是受保护的属性。
// p.age = 18 // 这里会报错，无法修改值。因为是只读属性。

class Student extends Person {
    school: string

    // 使用private修饰constructor。该类将不能被实例化和继承
    private constructor(name: string, age: number, gender: string, school: string) {
        super(name, age, gender)
        this.school = school
    }

    // 使用static关键字修饰的方法仍然属于其内部，所以不受private的影响
    static create(name: string, age: number, gender: string, school: string) {
        return new Student(name, age, gender, school)
    }
}

// new Student() // 这里会报错，无法实例化。因为是私有属性
Student.create('小明', 19, '男', '深圳小学') // 能正常工作。返回创建的实例

