import React from 'react';
import { Provider } from 'jotai'
import Window from '../os/Window';
import MenuBar from '../notepad/MenuBar'
import Editor from '../notepad/Editor'

export interface NotepadProps extends WindowAppProps {}

const NotepadApp: React.FC<NotepadProps> = (props) => {
    return (
        <Provider>
            <Window
                top={60}
                left={100}
                width={480}
                height={320}
                windowBarIcon="notepadSmall"
                windowTitle="Notepad"
                closeWindow={props.onClose}
                onInteract={props.onInteract}
                minimizeWindow={props.onMinimize}
                bottomRightText={(
                    <div>
                        <span style={{ marginLeft: 4 }}>Notepad</span>
                    </div>
                )}
                childrenWindow={[
                    <MenuBar />,
                    <Editor url={props.launchData} />
                ]}
            />
        </Provider>
    );
};

export default NotepadApp;
