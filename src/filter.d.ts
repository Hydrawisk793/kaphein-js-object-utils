export declare type PickKeys<T, P> = (
    P extends Array<infer K>
        ? Extract<K, keyof T>
        : (
            P extends {}
                ? ({ [K in keyof P] : (K extends keyof T ? K : never); }[keyof P])
                : keyof T
        )
);

export declare function pickKeys<T>(
    obj : T,
    predicate : FunctionFilterPredicate<T>
) : (keyof T)[];

export declare function pickKeys<
    T,
    P extends (keyof T | string | number | symbol)[] = (keyof T | string | number | symbol)[]
>(
    obj : T,
    predicate : P
) : PickKeys<T, P>[];

export declare function pickKeys<
    T,
    P extends {} = {}
>(
    obj : T,
    predicate : P
) : PickKeys<T, P>[];

export declare function pick<T>(
    obj : T,
    predicate : FunctionFilterPredicate<T>
) : Partial<T>;

export declare function pick<
    T,
    P extends (keyof T | string | number | symbol)[] = (keyof T | string | number | symbol)[]
>(
    obj : T,
    predicate : P
) : Pick<T, PickKeys<T, P>>;

export declare function pick<
    T,
    P extends {} = {}
>(
    obj : T,
    predicate : P
) : Partial<Pick<T, PickKeys<T, P>>>;

export declare function omitKeys<T>(
    obj : T,
    predicate : FunctionFilterPredicate<T>
) : (keyof T)[];

export declare function omitKeys<
    T,
    P extends (keyof T | string | number | symbol)[] = (keyof T | string | number | symbol)[]
>(
    obj : T,
    predicate : P
) : Exclude<keyof T, PickKeys<T, P>>[];

export declare function omitKeys<
    T,
    P extends {} = {}
>(
    obj : T,
    predicate : P
) : Exclude<keyof T, PickKeys<T, P>>[];

export declare function omit<T>(
    obj : T,
    predicate : FunctionFilterPredicate<T>
) : Partial<T>;

export declare function omit<
    T,
    P extends (keyof T | string | number | symbol)[] = (keyof T | string | number | symbol)[]
>(
    obj : T,
    predicate : P
) : Omit<T, PickKeys<T, P>>;

export declare function omit<
    T,
    P extends {} = {}
>(
    obj : T,
    predicate : P
) : Partial<Omit<T, PickKeys<T, P>>>;

export declare type FunctionFilterPredicate<T> = (
    value : T[keyof T],
    key : keyof T,
    obj : T
) => boolean;
