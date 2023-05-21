import axios, { AxiosError } from 'axios'
import { emitEvent } from '../../../hooks/event'
import { FSObject } from './types'
import { HARD_DISK_NAME } from './state'
import { FILE_OPEN_METHOD_SCHEMA } from '../explorer-preset'
import hardDiskDriveIcon from '../../../assets/icons/hard-disk-drive-32x32.png'
import forlderIcon from '../../../assets/icons/folder-32x32.png'
import notepadFileIcon from '../../../assets/icons/notepad-file-32x32.png'

const FILE_SYSTEM_SERVER = process.env.REACT_APP_FILE_SYSTEM_SERVER || throwError(`missing environment variable 'REACT_APP_FILE_SYSTEM_SERVER'`)

export function dirname(path: string): string {
    if (!path) return '.'
    if (path === '/') return '/'
    return path.split('/').slice(0, -1).join('/')
}

export function basename(path: string): string {
    return path.split('/').slice(-1).shift() as string
}

export function extname(basename: string): string {
    return '.' + basename.split('.').slice(-1)
}


export async function openFile(path: string) {
    const object = await fetchFSObject(path)
    if (!object) {
        console.error(`🚫文件不存在: ${path}`)
        return
    }
    if (object.type !== 'file') {
        console.error(`🚫这不是一个文件: ${path}`)
        return
    }
    const ext = extname(path)
    if (ext.toLowerCase() === '.url') return openURLFile(path)
    const fileViewer = FILE_OPEN_METHOD_SCHEMA[ext]
    if (!fileViewer) {
        console.error(`🚫未设置此文件的打开方式: ${path}`)
        return
    }
    emitEvent('launch-application', { fileViewer, path })
}

export async function fetchFSObject(path: string): Promise<FSObject | null> {
    if (path === '/') {
        return {
            name: HARD_DISK_NAME,
            type: 'directory',
            mtime: '',
            path,
            children: await fetchDirectory(path)
        }
    }
    const objectName = basename(path)
    const parentObjectPath = dirname(path)
    // 请求获取目标路径上一层的路径返回的数组json，因为这个数组里面包含了目标路径的信息，这才是我们想要的
    const response = await axios.get(`${FILE_SYSTEM_SERVER}${parentObjectPath}/`).catch((error: AxiosError) => console.error(error))
    if (!response) return null
    if (!Array.isArray(response.data)) throw new Error('response data format error')
    const target: FSObject = response.data.find(item => item.name === objectName)
    if (!target) return null
    if (target.type === 'file') return { ...target, path }
    const children = await fetchDirectory(path)
    return { ...target, path, children }
}

export async function fetchDirectory(dir: string): Promise<FSObject[]> {
    const response = await axios.get<FSObject[]>(`${FILE_SYSTEM_SERVER}${dir}/`).catch((error: AxiosError) => console.error(error))
    if (!response) return []
    if (!Array.isArray(response.data)) return []
    return response.data.map(object => ({ ...object, path: `${dir}${dir === '/' ? '' : '/'}${object.name}` }))
}

interface FileIconConfigUnit {
    ext: string[];
    icon: string;
}

export const FILE_ICON_SCHAME = flatFileIconMap([
    {
        ext: ['.doc', '.docx'],
        icon: require('../../../assets/icons/ms-word1.png')
    },
    {
        ext: ['.txt', '.css', '.md', '.js', '.json'],
        icon: require('../../../assets/icons/notepad-file-32x32.png')
    },
    {
        ext: ['.png', '.jpg'],
        icon: require('../../../assets/icons/image-gif-32x32.png')
    },
    {
        ext: ['.ico', '.xml', '.sh', '.svg'],
        icon: require('../../../assets/icons/document-32x32.png')
    },
    {
        ext: ['.html', '.url'],
        icon: require('../../../assets/icons/html-32x32.png')
    },
    {
        ext: ['.url'],
        icon: require('../../../assets/icons/html-32x32.png')
    }
])

/**
 * 把上面的数据转换成下面这样的简单json对象
 * @example
 * ```
 * {
 *     '.txt': 'xxxx',
 *     '.css': 'xxxx',
 *     '.png': 'xxxx'
 * }
 * ```
 */
function flatFileIconMap(target: FileIconConfigUnit[]) {
    return target
        .map(item => item.ext.map(e => ({ key: e, val: item.icon })))
        .flat()
        .reduce<Record<string, string>>((ctx, item) => { ctx[item.key] = item.val; return ctx }, {})
}

export const defaultFileIcon = notepadFileIcon

export function getObjectIcon(object: FSObject) {
    if (object.path === '/') return hardDiskDriveIcon
    if (object.type === 'directory') return forlderIcon
    const ext = extname(object.name)
    if (!ext) return defaultFileIcon
    return FILE_ICON_SCHAME[ext] || defaultFileIcon
}

export function throwError(message: string) {
    throw new Error(message)
}

export function openURLFile(path: string) {
    axios.get(`${FILE_SYSTEM_SERVER}${path}`).then(res => window.open(res.data))
}
