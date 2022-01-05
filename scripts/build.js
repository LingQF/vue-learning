const fs = require('fs')
const execa = require('execa')
// 获取需要打包的目录 输出：['reactivity', 'shared']
const dirs = fs.readdirSync('packages').filter(p => fs.statSync('packages/' + p).isDirectory())
// 使用rollup开始打包
async function build (target) {
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出，在父包中输出
    })
}
// 并行打包
async function runParaller (dirs, itemFn) {
    let res = []
    for (let item of dirs) {
        res.push(itemFn(item))
    }
    return Promise.all(res)
}
// 执行打包
runParaller(dirs, build).then(() => {
    console.log('打包成功')
})