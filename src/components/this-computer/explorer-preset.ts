/**
 * @file 用于模拟文件系统数据库的预设数据。
 * - id需要保持唯一性，推荐不要使用文件hash值，而应该使用生成的值
 * - 目前判断一个对象是否是文件夹是依据对象上是否有children属性
 */

export const FILE_OPEN_METHOD_SCHEMA: Record<string, string> = {
    '.txt': 'notepad',
    '.html': 'notepad',
    '.md': 'notepad',
    '.doc': 'msword',
    '.docx': 'msword',
    '.png': 'imageViewer',
    '.jpg': 'imageViewer'
}
