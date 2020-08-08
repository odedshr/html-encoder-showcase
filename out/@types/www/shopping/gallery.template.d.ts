declare type KeyedObject = {
    [key: string]: any;
};
declare type Property = {
    type: 'text' | 'html' | 'attribute' | 'loop' | 'conditional';
    node: Node;
    attrName?: string;
    details?: subRoutineInstructions;
};
declare type subRoutineInstructions = {
    startAt: number;
    fn: (value: any) => ChildNode[][];
    fnName: string;
    items?: any;
    flag?: boolean;
    nodes?: ChildNode[][];
};
interface NodeWithSet extends Node {
    set: {
        [key: string]: Property[];
    };
}
export declare function getNode(data?: {
    [key: string]: any;
}): NodeWithSet;
export declare function initNode(existingNode: ChildNode): Node;
export default class JSNode {
    set: {
        [key: string]: Property[];
    };
    data: {
        [key: string]: any;
    };
    node: ChildNode;
    domParser: DOMParser;
    docElm: Document;
    funcs: {
        [key: string]: Function;
    };
    constructor(data: object, existingNode?: ChildNode);
    private initExitingElement;
    private fillNode;
    private getDocElm;
    register(key: string, value: Property): void;
    protected _defineSet(isSSR: boolean): void;
    private findHTMLChildren;
    _forEach(iteratorName: string, indexName: string, parent: Node, fn: Function, list: any): ChildNode[][];
    _getPrecedingOrSelf(elm: HTMLElement): HTMLElement;
    _getValue(data: KeyedObject, path: string): any;
    _setValue(data: KeyedObject, path: string, value: any): void;
    private fixHTMLTags;
}
export {};
