import {
    PrefixToKeys,
    SuffixToKeys,
} from "kaphein-ts-type-utils";

export declare function prefixToKeys<
    T extends {} = {},
    N extends string = string
>(
    obj : T,
    text : N,
    ownKeysOnly? : boolean
) : PrefixToKeys<T, N>;

export declare function suffixToKeys<
    T extends {} = {},
    N extends string = string
>(
    obj : T,
    text : N,
    ownKeysOnly? : boolean
) : SuffixToKeys<T, N>;
