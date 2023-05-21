import { FC } from 'react'
import { css, cx } from '@emotion/css'
import { useSetAtom, useAtomValue } from 'jotai'
import colors from '../../constants/colors'
import { navigateGoAtom, historyStackAtom, historyStackIndexAtom } from './lib/state'
import browseUIIconsGrayURL from '../../assets/icons/browse-ui-icons-grayscale.png'
import browseUIIconsURL from '../../assets/icons/browse-ui-icons.png'

import SBGFilters from './SVGFilters'

const MenuBar: FC = () => {
    const navigateGo = useSetAtom(navigateGoAtom)
    const stack = useAtomValue(historyStackAtom)
    const stackIndex = useAtomValue(historyStackIndexAtom)
    const allowBack = stackIndex !== 0
    const allowForward = stackIndex < stack.length - 1

    return (
        <div className={barStyle}>
            <div className={dragHandlerStyle} />
            <div className={toolStyle}>
                <div className={cx('function', { disabled: !allowBack })} onClick={() => navigateGo(-1)}>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={0} />
                        <span className='function-name'>Back</span>
                    </button>
                    <button className='reset-button more'>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }}><path style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }} d="m6 4 4 4-4 4z"></path></svg>
                    </button>
                </div>
                <div className={cx('function', { disabled: !allowForward })} onClick={() => navigateGo(1)}>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={20} />
                        <span className='function-name'>Forward</span>
                    </button>
                    <button className='reset-button more'>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }}><path style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }} d="m6 4 4 4-4 4z"></path></svg>
                    </button>
                </div>
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={880} />
                        <span className='function-name'>Up</span>
                    </button>
                </div>
                <div className='divider' />
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={420} />
                        <span className='function-name'>Cut</span>
                    </button>
                </div>
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={440} />
                        <span className='function-name'>Copy</span>
                    </button>
                </div>
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={460} />
                        <span className='function-name'>Paste</span>
                    </button>
                </div>
                <div className='divider' />
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={480} />
                        <span className='function-name'>Undo</span>
                    </button>
                </div>
                <div className='divider' />
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={520} />
                        <span className='function-name'>Delete</span>
                    </button>
                </div>
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={620} />
                        <span className='function-name'>Properties</span>
                    </button>
                </div>
                <div className='divider' />
                <div className='function disabled'>
                    <button className='reset-button button'>
                        <BrowseUIIcon offsetX={760} />
                        <span className='function-name'>Views</span>
                    </button>
                    <button className='reset-button more'>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }}><path style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }} d="m6 4 4 4-4 4z"></path></svg>
                    </button>
                </div>
            </div>
            <SBGFilters />
        </div>
    )
}

const barStyle = css({
    backgroundColor: '#c4c6cb',
    width: '100%',
    border: `1px solid ${colors.white}`,
    borderBottomColor: colors.darkGray,
    borderRightColor: colors.darkGray,
    alignItems: 'center',
    padding: '2px 3px',
})

const dragHandlerStyle = css({
    width: 4,
    border: `1px solid ${colors.white}`,
    borderBottomColor: colors.darkGray,
    borderRightColor: colors.darkGray,
    height: '100%',
    boxSizing: 'border-box'
})

const toolStyle = css({
    marginLeft: 4,
    alignItems: 'center',
    '.function .button, .function .more': {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    '.function:not(.disabled):hover': {
        '.button .icon': {
            backgroundImage: `url(${browseUIIconsURL})`
        },
        '.button, .more': {
            borderColor: 'rgb(255, 255, 255) rgb(128, 128, 128) rgb(128, 128, 128) rgb(255, 255, 255)'
        },
        '.button:active, .more:active, .button:active ~ .more': {
            borderColor: 'rgb(128, 128, 128) rgb(255, 255, 255) rgb(255, 255, 255) rgb(128, 128, 128)',
        }
    },
    '.function .button': {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 54,
        '.function-name': {
            fontSize: '.85rem',
            lineHeight: '.85rem',
            marginTop: 4
        }
    },
    '.function .more': {
        width: 14,
        height: 'inherit',
        alignItems: 'center',
        justifyContent: 'center'
    },
    '.divider': {
        width: 2,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        margin: '0 2px',
        '&:after': {
            content: '""',
            minHeight: 26,
            width: 0,
            borderLeft: `1px solid rgb(128, 128, 128)`,
            borderRight: `1px solid rgb(255, 255, 255)`
        }
    },
    '.reset-button': {
        display: 'flex',
        outline: 'none',
        border: 0,
        borderRadius: 0,
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
        padding: 0
    },
    '.function.disabled': {
        '.button': {
            color: 'rgb(128, 128, 128)',
            textShadow: '1px 1px 0px #fff',
            '.icon': {
                imageRendering: 'pixelated',
                filter: 'url(#disabled-inset-filter)'
            }
        }
    }
})

interface BrowseUIIconProps {
    offsetX: number;
}

const BrowseUIIcon: FC<BrowseUIIconProps> = ({ offsetX }) => (
    <div
        className={cx(browseUIIconStyle, 'icon')}
        style={{ backgroundPosition: `-${offsetX}px 0px` }}
    />
)

const browseUIIconStyle = css({
    display: 'block',
    backgroundImage: `url(${browseUIIconsGrayURL})`,
    width: 20,
    height: 20,
    transform: 'scale(1.05)'
})

export default MenuBar
