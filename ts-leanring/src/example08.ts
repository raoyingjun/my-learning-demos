// any任意类型
export {} // 使用export表示这是个模块。以防止命名冲突。

function logWithTimeStamp(val: any): string {
    return `${Date.now()}: ${val}`
}

logWithTimeStamp(true)
logWithTimeStamp(1)
logWithTimeStamp([7, 5, 8])
logWithTimeStamp({})
