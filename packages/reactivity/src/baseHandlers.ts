import { isObject } from "@vue/shared"
import {readonly, reactive} from './reactive'

function createGetter (isReadonly?, shallow?) {
    return function (target, key, receiver) {
        const res = Reflect.get(target, key, receiver)
        if (shallow) {
            return res
        }
        if (isObject(res)) {
            return isReadonly ? readonly(res) : reactive(res)
        }
        return res
    }
}
const get = createGetter()
const shallowGet = createGetter(false, true)
const readonlyGet = createGetter(true)
const shallowReadonlyGet = createGetter(true, true)

export const mutableHandlers = {
    get,
    set (target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver)
    }
}
export const shallowReactiveHandlers = {
    get: shallowGet,
    set (target, key, value, receiver) {
        return Reflect.set(target, key, value, receiver)
    }
}
export const readonlyHandlers = {
    get: readonlyGet,
    set () {
        console.error(new Error('is readonly'))
    }
}
export const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    set () {
        console.error(new Error('is readonly'))
    }
}