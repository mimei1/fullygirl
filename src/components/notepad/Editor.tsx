import { FC, useEffect, useState } from 'react'
import { css } from '@emotion/css'
import { Provider } from 'jotai'
import axios from 'axios'

const FILE_SYSTEM_SERVER = process.env.REACT_APP_FILE_SYSTEM_SERVER || ''

interface EditorProps {
    url: string
}

const Editor: FC<EditorProps> = ({ url }) => {
    const [content, setContent] = useState('')
    
    // 获取文件内容（从网络）
    useEffect(() => {
        if (url) {
            axios.get<string>(`${FILE_SYSTEM_SERVER}${url}`).then(res => setContent(res.data))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Provider scope='application/notepad'>
            <div className={editorStyle}>
                <textarea className='content-container' defaultValue={content} />
            </div>
        </Provider>
    )
}

const editorStyle = css({
    label: 'Editor',
    flex: 1,
    width: 0,
    display: 'block',
    '.content-container': {
        display: 'block',
        whiteSpace: 'pre',
        fontFamily: '"Fixedsys Excelsior", "FixedSys", monospace',
        fontSize: 16,
        outline: 'none',
        border: 'none',
        height: '100%',
        boxShadow: 'none'
    }
})

export default Editor
