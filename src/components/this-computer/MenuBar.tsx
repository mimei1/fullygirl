import { FC, useState } from 'react'
import { css, cx } from '@emotion/css'
import colors from '../../constants/colors'
import MENU_TREE, { renderName, MenuItem, isDivider } from './menu-bar-preset'
import ClickAwayListener from 'react-click-away-listener'

const MenuBar: FC = () => {
    return (
        <div className={style}>
            <div className={dragHandlerStyle} />
            <div className='item-list'>
                {MENU_TREE.map((item, i) => (
                    <Menu
                        key={i}
                        name={item.name}
                        expandPosition='bottom'
                        expandMethod='click'
                        items={item.children}
                    />
                ))}
            </div>
        </div>
    )
}

const style = css({
    backgroundColor: '#c4c6cb',
    width: '100%',
    border: `1px solid ${colors.white}`,
    borderBottomColor: colors.darkGray,
    borderRightColor: colors.darkGray,
    alignItems: 'center',
    padding: '2px 3px',
    '.item-list': {
        marginLeft: 4
    },
    '.top-menu-item': {
        height: '1.2rem',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 6px',
        // backgroundColor: 'red',
        '&:hover': {
            boxShadow: `1px 1px 0 ${colors.white} inset, -1px -1px 0 ${colors.darkGray} inset`
        },
        '&.active': {
            boxShadow: `1px 1px 0 ${colors.darkGray} inset, -1px -1px 0 ${colors.white} inset`
        }
    },
    '.menu-item-divider': {
        height: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        '&:after': {
            content: '""',
            display: 'block',
            width: 'calc(100% - 7px)',
            borderTop: `1px solid ${colors.darkGray}`,
            borderBottom: `1px solid ${colors.white}`
        }
    }
})

const dragHandlerStyle = css({
    width: 4,
    border: `1px solid ${colors.white}`,
    borderBottomColor: colors.darkGray,
    borderRightColor: colors.darkGray,
    height: '100%',
    boxSizing: 'border-box'
})

interface MenuProps {
    expandPosition: 'bottom' | 'right';
    expandMethod: 'click' | 'hover';
    items?: MenuItem[];
    name: string;
}

const Menu: FC<MenuProps> = ({
    expandPosition,
    expandMethod,
    items = [],
    name
}) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <ClickAwayListener onClickAway={() => setExpanded(false)}>
            <div
                className={cx(menuStyle, 'top-menu-item', { active: expanded })}
                onClick={expandMethod === 'click' ? (() => setExpanded(!expanded)) : noop}
                onMouseEnter={expandMethod === 'hover' ? (() => setExpanded(true)) : noop}
                onMouseOut={expandMethod === 'hover' ? (() => setExpanded(false)) : noop}
            >
                <span className='name' dangerouslySetInnerHTML={{ __html: renderName(name) }} />
                <div
                    className='children-items-wrapper'
                    style={{
                        left: expandPosition === 'bottom' ? 0 : '100%',
                        top: expandPosition === 'bottom' ? '100%' : 0,
                        display: expanded ? 'block' : 'none'
                    }}
                >
                    <table style={{ borderSpacing: 0, padding: '0 2px' }}>
                        <tbody>
                            {items.map((item, i) => (
                                <ChildMenu
                                    key={`${name}_${item.name}_${i}`}
                                    name={item.name}
                                    items={item.children}
                                    checked={item.checked}
                                    disabled={item.disabled}
                                    shortcut={item.shortcut}
                                    value={item.value}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ClickAwayListener>
    )
}

const menuStyle = css({
    label: 'Menu',
    position: 'relative',
    '.children-items-wrapper': {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: '#c4c6cb',
        boxShadow: `1px 1px 0 ${colors.white} inset, -1px -1px 0 ${colors.darkGray} inset`
    },
    '.name': {
        fontFamily: '"Segoe UI", sans-serif',
        fontSize: '.85rem',
        lineHeight: '.85rem',
        height: '.85rem'
    }
})

interface ChildMenuProps {
    items?: MenuItem[];
    name: string;
    checked?: boolean;
    value?: string;
    disabled?: boolean;
    shortcut?: string;
}

const ChildMenu: FC<ChildMenuProps> = ({
    items = [],
    name,
    checked,
    value,
    disabled,
    shortcut
}) => {
    if (isDivider(name)) {
        return (
            <tr>
                <td colSpan={4}><div className='menu-item-divider' /></td>
            </tr>
        )
    }
    return (
        <tr className={cx(childMenuStyle, { disabled })}>
            <td className='check-icon'>
                {checked && (
                    <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentcolor', display: 'inline-block', verticalAlign: 'middle', visibility: 'visible' }}>
                        <path d="M5 7v3l2 2 5-5V4L7 9Z"></path>
                    </svg>                  
                )}
            </td>
            <td className='child-menu-name' dangerouslySetInnerHTML={{ __html: renderName(name) }}></td>
            <td className='shortcut'>{shortcut}</td>
            <td className='expand-icon'>
                {items.length > 0 && (
                    <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }}>
                        <path d="m6 4 4 4-4 4z"></path>
                    </svg>
                )}
            </td>
            <td style={{ width: 0, color: 'initial' }}>
                <div className='items-wrapper'>
                    <table style={{ borderSpacing: 0, padding: '0 2px' }}>
                        <tbody>
                            {items.map((item, i) => (
                                <ChildMenu
                                    key={`${name}_${item.name}_${i}`}
                                    name={item.name}
                                    items={item.children}
                                    checked={item.checked}
                                    disabled={item.disabled}
                                    shortcut={item.shortcut}
                                    value={item.value}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    )
}

const childMenuStyle = css({
    '&:hover': {
        backgroundColor: 'rgb(0, 0, 128)',
        textShadow: 'none !important',
        '& > td': {
            color: 'white'
        },
        '&.disabled > td': {
            color: 'rgb(128, 128, 128)'
        },
        '.items-wrapper': {
            display: 'block'
        }
    },
    fontFamily: '"Segoe UI", sans-serif',
    fontSize: '.8rem',
    lineHeight: '.8rem',
    whiteSpace: 'nowrap',
    '&.disabled': {
        color: 'rgb(128, 128, 128)',
        textShadow: `0.8px 0.8px 0px ${colors.white}`
    },
    '& > td': {
        padding: '4px 0',
        verticalAlign: 'middle'
    },
    position: 'relative',
    '.items-wrapper': {
        position: 'absolute',
        zIndex: 999,
        backgroundColor: '#c4c6cb',
        boxShadow: `1px 1px 0 ${colors.white} inset, -1px -1px 0 ${colors.darkGray} inset`,
        left: '100%',
        top: 0,
        display: 'none'
    },
    '& > .check-icon': {
        minWidth: 26,
        textAlign: 'center'
    },
    '& > .shortcut': {
        padding: '0px 6px'
    },
    '& > .expand-icon': {
        minWidth: 26,
        textAlign: 'center'
    }
})

function noop(){}

export default MenuBar
