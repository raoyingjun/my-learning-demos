// Partial<Type>
export { } // 使用export表示这是个模块。以防止命名冲突。

// 构造一个类型
interface Todo {
    title: string;
    description: string;
}
/**
 * 通过 Partial<Type> 将 Todo 所有属性都设置为可选，如下
 * { 
 *  title?: string | undefined;
    description?: string | undefined;
    }
 */
type PartialTodo = Partial<Todo>


// Required<Type>
// 构造一个类型，将所有可选属性设置为 required。与Partial相反。
interface Props {
    a?: number;
    b?: string;
}

const obj: Props = { a: 5 };

// const obj2: Required<Props> = { a: 5 }; // 报错。经 Required 所有属性是必选的。


// Readonly<Type>
// 构造一个类型，其中Type的所有属性都设置为readonly，这意味着构造类型的属性不能被重新分配。

interface Todo1 {
    title: string;
}

const todo1: Readonly<Todo1> = {
    title: "Delete inactive users",
};

// todo1.title = "Hello"; // 报错，经过 Readonly 修饰后所有属性只读

// Record<Keys, Type>
// 构造属性键为 Keys 且属性值为 Type 的对象类型。

interface CatInfo {
    age: number;
    breed: string;
}

type CatName = "miffy" | "boris" | "mordred";

/**
 * 通过 Record 处理后， Cats 的类型如下。
 * type Cats = {
        miffy: CatInfo;
        boris: CatInfo;
        mordred: CatInfo;
    }
 */
type Cats = Record<CatName, CatInfo>
const cats: Cats = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
};

// Pick<Type, Keys>
// 从 Type 中挑选指定属性 Keys 来构造类型。

interface Todo2 {
    title: string;
    description: string;
    completed: boolean;
}
// 通过 Pick 后如下
/**
 * type = PickedTodo2 = {
     title: "Clean room",
     completed: false,
   };
 */
type PickedTodo2 = Pick<Todo2, "title" | "completed">;

const todo2: PickedTodo2 = {
    title: "Clean room",
    completed: false,
};


// Omit<Type, Keys>
// 通过从 Type 中挑选所有属性，然后移除指定 Keys 来构造类型。与 Pick 相反。
interface Todo3 {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
}

type OmitedTodo3 = Omit<Todo3, "description">;

const todo: OmitedTodo3 = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
};