interface BaseFSObject {
    name: string;
    mtime: string;
    path: string;
}

export interface Directory extends BaseFSObject {
    type: 'directory';
    children: FSObject[]
}

export interface File extends BaseFSObject {
    type: 'file';
    size: number;
}

export type FSObject = Directory | File;
