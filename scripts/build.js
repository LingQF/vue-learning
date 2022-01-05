const fs = require('fs')
const execa = require('execa')
// 获取打包目录
const dirs = fs.readdirSync('packages').filter(p => fs.statSync('packages/' + p).isDirectory())

// 并行打包
async function build (target) {
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出，在父包中输出
    })
}
async function runParaller (dirs, itemFn) {
    let res = []
    for (let item of dirs) {
        res.push(itemFn(item))
    }
    return Promise.all(res)
}
runParaller(dirs, build).then(() => {
    console.log('打包成功')
})