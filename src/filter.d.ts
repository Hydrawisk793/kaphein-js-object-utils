export declare function pickKeys<T>(
    obj : T,
    predicate : (keyof T)[]
        | Record<keyof T, boolean>
        | FunctionFilterPredicate<T>
) : (keyof T)[];

export declare function pick<T>(
    obj : T,
    predicate : (keyof T)[]
        | Record<keyof T, boolean>
        | FunctionFilterPredicate<T>
) : Partial<T>;

export declare function omitKeys<T>(
    obj : T,
    predicate : (keyof T)[]
        | Record<keyof T, boolean>
        | FunctionFilterPredicate<T>
) : (keyof T)[];

export declare function omit<T>(
    obj : T,
    predicate : (keyof T)[]
        | Record<keyof T, boolean>
        | FunctionFilterPredicate<T>
) : Partial<T>;

export declare type FunctionFilterPredicate<T> = (
    value : T[keyof T],
    key : keyof T,
    obj : T
) => boolean;
