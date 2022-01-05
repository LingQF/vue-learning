const execa = require('execa')
// 并行打包
async function build (target) {
    await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], {
        stdio: 'inherit' // 子进程的输出，在父包中输出
    })
}
build('reactivity')