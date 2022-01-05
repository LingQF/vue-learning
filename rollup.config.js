import ts from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import resolvePlugin from '@rollup/plugin-node-resolve'
import path from 'path'
// 获取路径
const packagesDir = path.resolve(__dirname, 'packages')
// 获取需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET)
const resolve = p => path.resolve(packageDir, p)
// 读取各自的package.json
const pkg = require(resolve(`package.json`))
// 获取buildOptions
const packageOptions = pkg.buildOptions || {}
const name = path.basename(packageDir)

const outputConfigs = {
    'esm-bundler': {
      file: resolve(`dist/${name}.esm-bundler.js`),
      format: `es`
    },
    cjs: {
      file: resolve(`dist/${name}.cjs.js`),
      format: `cjs`
    },
    global: {
      file: resolve(`dist/${name}.global.js`),
      format: `iife`
    }
}

function createOptions (format, output) {
    output.name = packageOptions.name
    output.sourcemap = true
    output.extend = true
    return {
        input: resolve('src/index.ts'),
        output,
        plugins: [
            json(),
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin()
        ]
    }
}
// 导出配置
export default packageOptions.formats.map(format => createOptions(format, outputConfigs[format]))