import { forwardRef, ComponentPropsWithoutRef } from 'react'
import { css } from '@emotion/css'

import { childWindowItemStyle as childWindowItemClassName } from './ChildWindowItem'

type DivProps = ComponentPropsWithoutRef<'div'>

const ChildWindowWrapper = forwardRef<HTMLDivElement, DivProps>((props, ref) => {
    return (
        <div ref={ref} className={wrapperStyle}>
            {props.children}
        </div>
    )
})

const wrapperStyle = css({
    label: 'ChildWindowWrapper',
    flexGrow: 1,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
    marginBottom: 2,
    [`.${childWindowItemClassName}:last-child`]: {
        flexGrow: 1,
        height: 0
    },
    [`.${childWindowItemClassName} + .${childWindowItemClassName}`]: {
        marginTop: 4
    }
})

export default ChildWindowWrapper
