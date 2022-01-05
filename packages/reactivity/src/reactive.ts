import {
    mutableHandlers,
    shallowReactiveHandlers,
    readonlyHandlers,
    shallowReadonlyHandlers
} from './baseHandlers'
import { isObject } from '@vue/shared'
export const reactiveMap = new WeakMap()
export const shallowReactiveMap = new WeakMap()
export const readonlyMap = new WeakMap()
export const shallowReadonlyMap = new WeakMap()

function createReactiveObject (
    target,
    baseHandlers,
    proxyMap
) {
    if (!isObject(target)) {
        console.error(new Error(String(target) + 'is not a Object'))
        return target
    }
    // 已经代理的数据无需重复代理
    const existingProxy = proxyMap.get(target)
    if (existingProxy) {
        return existingProxy
    }
    const proxy = new Proxy(
        target,
        baseHandlers
    )
    proxyMap.set(target, proxy)
    return proxy
}
const reactive = function (target) {
    return createReactiveObject(
        target,
        mutableHandlers,
        reactiveMap
    )
}
const shallowReactive = function (target) {
    return createReactiveObject(
        target,
        shallowReactiveHandlers,
        shallowReactiveMap
    )
}
const readonly = function (target) {
    return createReactiveObject(
        target,
        readonlyHandlers,
        readonlyMap
    )
}
const shallowReadonly = function (target) {
    return createReactiveObject(
        target,
        shallowReadonlyHandlers,
        shallowReadonlyMap
    )
}
export {
  reactive,
  shallowReactive,
  readonly,
  shallowReadonly,
}