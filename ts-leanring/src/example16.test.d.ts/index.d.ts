declare function greet(string): string

declare var userIds: number[]

interface Address {
    province: string,
    city: string,
    district: string
}
declare var address: Address
declare class Person {
    constructor(username: string, age: number, address: Address)
    username: string
    age: number
    address: Address
}

type CalcCallback = () => number

declare const calc: (expression?: CalcCallback | number, ...expression: number[]) => number;

namespace ArticleNS {
    interface Title {
        heading: 'Hello',
        subtitle: 'hello world!'
    }
    interface Meta {
        time: '2023/15',
        author: 'royin'
    }
}
interface Article {
    title: ArticleNS.Title
    meta: ArticleNS.Meta
    content: string
}
declare var article: Article

declare namespace util {
    function getHex(): string
    var speed: number
}