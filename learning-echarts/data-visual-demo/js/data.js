const CATEGORY_DATA = ['苹果', '香蕉', '梨子', '西瓜', '芒果']
const BAR_VALUE_DATA = randomList(5, 200, 1000)
const MAP_SCATTER_DATA = [
    {name: '苹果', value: [116.46, 39.92, random(200, 1000)]},
    {name: '香蕉', value: [121.48, 31.22, random(200, 1000)]},
    {name: '梨子', value: [114.07, 22.62, random(200, 1000)]},
    {name: '西瓜', value: [113.23, 23.16, random(200, 1000)]},
    {name: '芒果', value: [108.45, 34.01, random(200, 1000)]}
]
const PIE_VALUE_DATA = [
    {name: '苹果', value: random(200, 1000)},
    {name: '香蕉', value: random(200, 1000)},
    {name: '梨子', value: random(200, 1000)},
    {name: '西瓜', value: random(200, 1000)},
    {name: '芒果', value: random(200, 1000)}
]

const LINE_STACK_VALUE_DATA = {
    FIRST_QUARTER: randomList(5, 200, 1000),
    SECOND_QUARTER: randomList(5, 200, 1000),
    THIRD_QUARTER: randomList(5, 200, 1000),
    FOURTH_QUARTER: randomList(5, 200, 1000)
}

const BAR_STACK_VALUE_DATA = {
    APPLE: randomList(5, 200, 1000),
    BANANA: randomList(5, 200, 1000),
    PEAR: randomList(5, 200, 1000),
    WATERMELON: randomList(5, 200, 1000),
    MANGO: randomList(5, 200, 1000)
}

