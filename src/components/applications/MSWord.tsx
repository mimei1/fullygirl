import React, { useEffect, useState } from 'react';
import { Provider } from 'jotai'
import Window from '../os/Window';

const FILE_SYSTEM_SERVER = process.env.REACT_APP_FILE_SYSTEM_SERVER || ''

export interface MSWordProps extends WindowAppProps {}

const MSWordApp: React.FC<MSWordProps> = (props) => {
    const { launchData } = props
    const [url, setURL] = useState('')

    useEffect(() => {
        const docUrl = `${FILE_SYSTEM_SERVER}${launchData}`
        console.log(docUrl);
        
        if (launchData && typeof launchData === 'string') {
            setURL(encodeURIComponent(docUrl))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [launchData])

    return (
        <Provider>
            <Window
                top={60}
                left={100}
                width={670}
                height={750}
                windowBarIcon="mswordSmall"
                windowTitle="Word"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
            >
                {url && (
                    <iframe
                        title="word-preview"
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}`}
                        frameBorder="0"
                        style={{ width: '100%' }}
                    />
                )}
            </Window>
        </Provider>
    );
};

export default MSWordApp;
