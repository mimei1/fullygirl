import React from 'react';
import { useSetAtom } from 'jotai';
import dayjs from 'dayjs'
import { lastShowAdAtom } from '../../state'
import Window from '../os/Window';

export interface NotepadProps extends WindowAppProps {}

const AdApp: React.FC<NotepadProps> = (props) => {
    const { innerHeight, innerWidth } = window
    const width = 480, height = 320
    const setLastShowAd = useSetAtom(lastShowAdAtom)

    return (
        <Window
            top={innerHeight - height}
            left={innerWidth - width}
            width={width}
            height={height}
            windowBarIcon="windowExplorerIcon"
            windowTitle="Ad"
            closeWindow={() => {
                props.onClose()
                setLastShowAd(dayjs().toDate().getTime())
                console.log('设置最后显示时间');
            }}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomRightText={(
                <div>
                    <span style={{ marginLeft: 4 }}>Ad</span>
                </div>
            )}
        >
            <iframe title="ad" src="ad.html" frameBorder="0" style={{ width: '100%', height: '100%' }} />
        </Window>
    );
};

export default AdApp;
