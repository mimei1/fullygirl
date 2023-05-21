/**
 * @file 这个文件中声明出了“this-computer” application状态，
 * 这些状态是在ThisComputer.tsx的子组件中共享，它通过jotai这
 * 个状态管理库实现，类似于react useContext的上位替代品
 */
import { atom } from 'jotai'
import { atomWithReset } from 'jotai/utils'
import { FSObject } from './types'
import { fetchFSObject } from './tools'

export const HARD_DISK_NAME = '(D:)'

// 浏览路径历史记录，用于前进后退
export const historyStackAtom = atomWithReset<string[]>([HARD_DISK_NAME])

// 当前浏览路径在历史栈中的位置
export const historyStackIndexAtom = atomWithReset(0)

// 当前浏览路径
export const currentAddressAtom = atom(
    // getter
    get => get(historyStackAtom)[get(historyStackIndexAtom)],
    // setter
    (get, set, address: string) => {
        const stack = get(historyStackAtom)
        const index = get(historyStackIndexAtom)
        if (stack[index] === address) return
        stack.splice(index + 1, stack.length - index)
        stack.push(address)
        set(historyStackAtom, stack)
        set(historyStackIndexAtom, index + 1)
    }
)

// 当前浏览的文件对象（文件夹）
export const currentObjectAtom = atomWithReset<FSObject | null>(null)

// 是否正在加载
export const isLoadingAtom = atom(false)

// 访问路径
export const visitAddressAtom = atom(null, async (get, set, address: string) => {
    console.log('visit: ', address)
    set(isLoadingAtom, true)
    const object = await fetchFSObject(address)
    set(isLoadingAtom, false)
    if (!object) {
        throw new Error('文件夹不存在')
    }
    set(currentAddressAtom, address)
    set(currentObjectAtom, object)
})

// 前进后退
export const navigateGoAtom = atom(null, async (get, set, step: 1 | -1) => {
    const stack = get(historyStackAtom)
    const index = get(historyStackIndexAtom)
    const newIndex = index + step
    const targetPath = stack[newIndex]
    if (typeof targetPath !== 'string') return
    console.log('navigate go: ', targetPath)
    set(isLoadingAtom, true)
    const object = await fetchFSObject(targetPath)
    set(isLoadingAtom, false)
    if (!object) {
        throw new Error('文件夹不存在')
    }
    set(currentObjectAtom, object)
    set(historyStackIndexAtom, newIndex)
})

// 当前选中的对象名列表
export const selectedObjectAtom = atomWithReset<string[]>([])

// 当前焦点对象
export const focusedObjectAtom = atomWithReset<FSObject | null>(null)
