declare type Index = string | number;
declare type Delegate = (newValue: any, newState: State, oldValue?: any) => void;
declare type IDelegateCollection = {
    add: (delegate: Delegate) => void;
    remove: (delegate: Delegate) => void;
    includes: (delegate: Delegate) => void;
    delegate: (newValue: any, obj: {
        [key in Index]: any;
    }, oldValue: any) => void;
};
export declare type State = {
    [key in Index]: any;
} & {
    $?: {
        [key: string]: IDelegateCollection;
    };
};
export default function initState(initial?: State): State;
export {};
