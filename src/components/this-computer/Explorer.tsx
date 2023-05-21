import { CSSProperties, FC, useEffect } from 'react'
import { css, cx } from '@emotion/css'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import dayjs from 'dayjs'
import prettyBytes from 'pretty-bytes'
import { FSObject } from './lib/types'
import { useResetThisApp, useResetSelected } from './lib/hooks'
import { getObjectIcon, defaultFileIcon, openFile } from './lib/tools'
import { currentObjectAtom, visitAddressAtom, isLoadingAtom, focusedObjectAtom } from './lib/state'
import wvlineIcon from '../../assets/icons/wvline.gif'
import wvleftImage from '../../assets/icons/wvleft.bmp'

const Explorer: FC = () => {
    const isLoading = useAtomValue(isLoadingAtom)
    const object = useAtomValue(currentObjectAtom)
    const focusedObject = useAtomValue(focusedObjectAtom)
    const reset = useResetThisApp()
    const icon = object ? getObjectIcon(object) : defaultFileIcon

    useEffect(() => {
        reset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!object) return null
    return (
        <div className={explorerStyle}>
            <div className='object-detail'>
                <p className='object-icon'><img src={icon} draggable={false} alt="" /></p>
                <p className='object-title'>{object.name}</p>
                <p className='wvline'><img src={wvlineIcon} alt="" /></p>
                {!focusedObject
                    ? (
                        <p className='object-info'>
                            Select an item to view its description.
                        </p>
                    )
                    : (
                        <p className='object-info'>
                            <b>{focusedObject.name}</b>
                            <br />
                            {focusedObject.type.toUpperCase()}
                            <br /><br />
                            Modified:
                            <br />
                            {dayjs(focusedObject.mtime).format('YYYY/MM/DD HH:mm:ss')}
                            <br /><br />
                            {focusedObject.type === 'file' && `Size: ${prettyBytes(focusedObject.size)}`}
                        </p>
                    )
                }
            </div>
            <div className='object-list'>
                {!isLoading && object.type === 'directory' && object.children.map((item, i) => (
                    <ObjectItem key={i} data={item} />
                ))}
            </div>
        </div>
    )
}

const explorerStyle = css({
    label: 'Explorer',
    flex: 1,
    position: 'relative',
    overflowY: 'scroll',
    '.object-detail': {
        flex: 1,
        maxWidth: 270,
        width: 0,
        flexDirection: 'column',
        background: `url(${wvleftImage}) no-repeat white`,
        position: 'sticky',
        top: 0,
        left: 0,
        'p': {
            fontFamily: 'unset',
        },
        '.object-icon': {
            padding: 15,
            paddingBottom: 0
        },
        '.object-title': {
            fontSize: '1.4rem',
            lineHeight: '1.4rem',
            fontWeight: 'bold',
            marginTop: 5,
            padding: '0 15px'
        },
        '.wvline': {
            padding: 0,
            fontSize: 0,
            marginBottom: 10
        },
        '.object-info': {
            padding: 15,
            paddingBottom: 0,
            fontSize: '.9rem',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            wordBreak: 'break-word'
        }
    },
    '.object-list': {
        flex: 2,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        '.object-item': {
            flexGrow: 0,
            flexShrink: 0,
            width: 75,
            height: 75,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            '.icon': {
                position: 'relative',
                '.selection-effect': {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    maskImage: 'var(--icon-image)',
                    background: 'rgb(0, 0, 128)',
                    opacity: 0.5,
                    display: 'none'
                }
            },
            '.title': {
                marginTop: 4,
                fontSize: 12,
                textAlign: 'center',
                wordBreak: 'break-all',
                overflow: 'hidden',
                marginBottom: 10,
                position: 'relative'
            }
        },
        '.object-item.selected .title::after': {
            content: '""',
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            border: '1px dotted #ffffff',
            mixBlendMode: 'exclusion'
        },
        '.object-item.focused': {
            '.title': {
                overflow: 'visible',
                marginBottom: 0,
                background: 'rgb(0, 0, 128)',
                color: 'white'
            },
            '.icon .selection-effect': {
                display: 'block'
            }
        }
    }
})

const ObjectItem: FC<{ data: FSObject }> = ({ data }) => {
    const [focusedObject, setFocusedObject] = useAtom(focusedObjectAtom)
    const visitAddress = useSetAtom(visitAddressAtom)
    const resetSelected = useResetSelected()
    const icon = getObjectIcon(data)

    // 点击图标，选中且高亮
    const onClickObject = () => {
        setFocusedObject(data)
    }

    // 双击打开文件夹或文件
    const onDbClick = () => {
        if (data.type === 'file') {
            openFile(data.path)
        } else {
            visitAddress(data.path)
            resetSelected()
        }
    }
    
    return (
        <div
            className={cx('object-item', { focused: focusedObject?.name === data.name })}
            onClick={onClickObject}
            onDoubleClick={onDbClick}
        >
            <div className='icon' title={data.path}>
                <img src={icon} draggable={false} alt="" width={32} height={32} />
                <div className='selection-effect' style={{ '--icon-image': `url(${icon})` } as CSSProperties} />
            </div>
            <div className='title'>
                <div>{data.name}</div>
            </div>
        </div>
    )
}

export default Explorer
