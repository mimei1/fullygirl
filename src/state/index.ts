import { atomWithStorage } from 'jotai/utils'
import dayjs from 'dayjs'

// 今日是否登录过
export const hasLoggedAtom = atomWithStorage('has_logged', {
    value: false,
    exp: dayjs().add(24, 'hour').toDate().getTime()
})

// 最后一次显示弹窗广告的时间戳，初始值为一年前（用户关闭了窗口才算显示过了）
export const lastShowAdAtom = atomWithStorage('last_show_ad', dayjs().subtract(1, 'year').toDate().getTime())
