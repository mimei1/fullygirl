import { FC } from 'react'
import { css } from '@emotion/css'
import colors from '../../../constants/colors'

const ChildWindowItem: FC = ({ children }) => (
    <div className={childWindowItemStyle}>
        <div className='content-outer'>
            <div className='content-inner'>
                <div className='content'>
                    {children}
                </div>
            </div>
        </div>
    </div>
)

export const childWindowItemStyle = css({
    label: 'ChildWindowItem',
    '.content-outer': {
        border: `1px solid ${colors.white}`,
        borderTopColor: colors.darkGray,
        borderLeftColor: colors.darkGray,
        flexGrow: 1,
        '.content-inner': {
            border: `1px solid ${colors.lightGray}`,
            borderTopColor: colors.black,
            borderLeftColor: colors.black,
            flex: 1,
            '.content': {
                flex: 1,
                width: 0,
                position: 'relative',
                backgroundColor: colors.white,
            }
        },
        // 通过:has伪类选择器来实现按需隐藏窗体内边框
        '.content-inner:has(.set-no-inner-border_ChildWindowItem)': {
            border: 'none'
        }
    },
    '.content-outer:has(.set-no-border_ChildWindowItem)': {
        border: 'none',
        '.content-inner': {
            border: 'none'
        }
    }
})

export default ChildWindowItem
