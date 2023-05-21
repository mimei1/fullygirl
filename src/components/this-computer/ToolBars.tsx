import { FC } from 'react'
import { css, cx } from '@emotion/css'
import MenuBar from './MenuBar'
import ObjectToolsBar from './ObjectToolsBar'
import AddressBar from './AddressBar'

// cx函数是用来拼接类命的

const Toolbars: FC = () => {
    return (
        <div className={cx(style, 'set-no-inner-border_ChildWindowItem')}>
            <MenuBar />
            <ObjectToolsBar />
            <AddressBar />
        </div>
    )
}

/**
 * emotion库是一个流行的css in js方案
 * 这个css函数支持传入css源码片段字符串或者css json对象，返回一个类名（字符串），
 * 它是运行时生成（非ssr时）的一个唯一字符串
 * @see https://emotion.sh/docs/introduction
 */
const style = css({
    label: 'Toolbars',
    width: '100%',
    flexDirection: 'column'
})

export default Toolbars
