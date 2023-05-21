import React, { useEffect, useState } from 'react';
import { Provider } from 'jotai'
import { css } from '@emotion/css';
import Window from '../os/Window';

const FILE_SYSTEM_SERVER = process.env.REACT_APP_FILE_SYSTEM_SERVER || ''

export interface ImageViewerProps extends WindowAppProps {}

const ImageViewerApp: React.FC<ImageViewerProps> = (props) => {
    const [url, setURL] = useState('')

    useEffect(() => {
        const { launchData } = props
        if (launchData && typeof launchData === 'string') {
            setURL(`${FILE_SYSTEM_SERVER}${launchData}`)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Provider>
            <Window
                top={60}
                left={100}
                width={560}
                height={520}
                windowBarIcon="imageViewerSmall"
                windowTitle="ImageViewer"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
            >
                <div className={containerStyle}>
                    {url && (
                        <img src={url} alt="" />
                    )}
                </div>
            </Window>
        </Provider>
    );
};

const containerStyle = css({
    flex: 1,
    width: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'img': {
        maxWidth: '100%',
        maxHeight: '100%'
    }
})

export default ImageViewerApp;
