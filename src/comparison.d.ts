export declare function deepEquals(
    l : any,
    r : any,
    option? : {
        maximumDepth? : number;

        comparer? : (
            l : any,
            r : any,
            doDefault : () => boolean
        ) => boolean;
    }
) : boolean;

export declare function shallowEquals(
    l : any,
    r : any
) : boolean;
