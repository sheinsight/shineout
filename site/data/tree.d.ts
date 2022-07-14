export declare const allIds:[]
export declare const exampleIds: []

type nodeType = Array<{id: string, text: string, children?: nodeType}>

export type  createNode =  (deep: number, index: number, path: number[], max: number, length: number, ids: string[]) => nodeType

export declare const tree : nodeType
export declare const cascader : nodeType
export const exampleTree: nodeType

export default tree
