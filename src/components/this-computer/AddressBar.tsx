
import { FC, useEffect, useRef, useState } from 'react'
import { css } from '@emotion/css'
import { useAtomValue, useSetAtom } from 'jotai'
import colors from '../../constants/colors'
import { currentAddressAtom, visitAddressAtom, currentObjectAtom, HARD_DISK_NAME } from './lib/state'
import { getObjectIcon } from './lib/tools'
import insetDeepBorderImage from '../../assets/icons/inset-deep-border-image.svg'
import buttonNormalBorderImage from '../../assets/icons/button-normal-border-image.svg'
import hardDiskDriveIcon from '../../assets/icons/hard-disk-drive-32x32.png'

const Address: FC = () => {
    const inputElRef = useRef<HTMLInputElement>(null)
    const [value, setValue] = useState(HARD_DISK_NAME)
    const address = useAtomValue(currentAddressAtom)
    const visitAddress = useSetAtom(visitAddressAtom)
    const object = useAtomValue(currentObjectAtom)

    useEffect(() => {
        if (address === '/') {
            setValue(HARD_DISK_NAME)
        } else {
            setValue(address)
        }
    }, [address])

    const submitAddress = () => {
        if (!inputElRef.current) return
        inputElRef.current.blur()
        if (value.startsWith(HARD_DISK_NAME)) {
            visitAddress('/' + value.substring(HARD_DISK_NAME.length))
        } else {
            visitAddress(value)
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => { submitAddress() }, [])

    return (
        <div className={barStyle}>
            <div className={dragHandlerStyle} />
            <div className={inputStyle}>
                <div className='label'>Address</div>
                <div className='input-box'>
                    <img className='object-icon' src={object ? getObjectIcon(object) : hardDiskDriveIcon} alt="" />
                    <input
                        className='input-el'
                        ref={inputElRef}
                        type="text"
                        autoComplete='off'
                        value={value}
                        onInput={e => setValue(e.currentTarget.value)}
                        onFocus={e => e.currentTarget.select()}
                        onBlur={() => window.getSelection()?.removeAllRanges()}
                        onKeyDown={e => e.code.toLowerCase() === 'enter' && submitAddress()}
                    />
                    <button className='dropdown-button' disabled>
                        <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" style={{ fill: 'currentColor', display: 'inline-block', verticalAlign: 'middle' }}><path style={{ transform: 'rotate(90deg) translate(1px, -3px)', transformOrigin: 'center' }} d="m5 6 4 4-4 4z"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

const barStyle = css({
    backgroundColor: '#c4c6cb',
    width: '100%',
    border: `1px solid ${colors.white}`,
    borderBottomColor: colors.darkGray,
    borderRightColor: colors.darkGray,
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

const inputStyle = css({
    label: 'AddressInput',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '.label': {
        flexGrow: 0,
        fontSize: '.9rem',
        padding: '0 6px'
    },
    '.input-box': {
        flexGrow: 1,
        background: 'white',
        color: 'black',
        display: 'flex',
        borderImage: `url(${insetDeepBorderImage}) 64 / 2px`,
        borderColor: 'rgb(128, 128, 128)',
        borderStyle: 'solid',
        borderWidth: '2px 2px',
        '.object-icon': {
            margin: 'auto 2px',
            width: 17,
            height: 17,
        },
        '.input-el': {
            flexGrow: 1,
            background: 'transparent',
            color: 'inherit',
            border: 0,
            outline: 0,
            padding: 0,
            minWidth: 0,
            width: 0,
            boxShadow: 'none',
            fontSize: 14,
            fontFamily: 'unset',
            '&::selection': {
                background: '#011480',
                color: 'white'
            }
        },
        '.dropdown-button': {
            marginRight: 2,
            width: 20,
            padding: 0,
            textShadow: '1px 1px 0px #fff',
            color: 'rgb(128, 128, 128)',
            outline: 'none',
            borderColor: 'rgb(223, 223, 223) rgb(128, 128, 128) rgb(128, 128, 128) rgb(223, 223, 223)',
            borderStyle: 'solid',
            borderWidth: '2px 2px',
            borderImage: `url(${buttonNormalBorderImage}) 64 / 2px`,
            backgroundColor: 'rgb(195, 198, 202)',
            justifyContent: 'center',
            alignItems: 'center',
            '&:disabled': {
                filter: 'url(#disabled-inset-filter)'
            }
        }
    }
})

export default Address
