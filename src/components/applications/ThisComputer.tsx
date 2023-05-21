import React, { useEffect, useState } from 'react';
import { Provider, useAtomValue } from 'jotai'
import { currentObjectAtom } from '../this-computer/lib/state'
import { Directory } from '../this-computer/lib/types'
// import DesktopShortcut from '../os/DesktopShortcut';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import { Explorer, ToolBars } from '../this-computer'
import Icon from '../../components/general/Icon'

export interface ThisComputerProps extends WindowAppProps {}

const ThisComputerApp: React.FC<ThisComputerProps> = (props) => {
    const [objectCount, setObjectCount] = useState(0)
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });
    const object = useAtomValue(currentObjectAtom)

    useEffect(() => {
        if (object && object.type === 'directory') {
            setObjectCount((object as Directory).children.length)
        }
    }, [object])
    
    return (
        <Provider scope='application/this-computer'>
            <Window
                top={24}
                left={50}
                width={initWidth > 900 ? 900 : initWidth}
                height={initHeight > 600 ? 700 : initHeight}
                windowBarIcon="computerSmall"
                windowTitle="This Computer"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
                bottomLeftText={`${objectCount} object(s)`}
                bottomRightText={(
                    <div>
                        <Icon size={20} icon="computerSmall" />
                        <span style={{ marginLeft: 4 }}>My Computer</span>
                    </div>
                )}
                childrenWindow={[
                    <ToolBars />,
                    <Explorer />
                ]}
            />
        </Provider>
    );
};

export default ThisComputerApp;
