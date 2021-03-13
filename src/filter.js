var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isNonNullObject = kapheinJsTypeTrait.isNonNullObject;
var isFunction = kapheinJsTypeTrait.isFunction;

module.exports = (function ()
{
    /**
     *  @template T
     *  @typedef {import("./filter").FunctionFilterPredicate<T>} FunctionFilterPredicate
     */

    /**
     *  @template T
     *  @param {T} obj
     *  @param {
            (keyof T)[]
            | Record<keyof T, boolean>
            | FunctionFilterPredicate<T>
        } predicate
     */
    function pickKeys(obj, predicate)
    {
        /** @type {(keyof T)[]} */var finalKeys = Object.keys(obj);
        if(isFunction(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return (0, predicate)(obj[key], key, obj);
                })
            ;
        }
        else if(Array.isArray(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return predicate.includes(key);
                })
            ;
        }
        else if(isNonNullObject(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return (key in predicate) && predicate[key];
                })
            ;
        }

        return finalKeys;
    }

    /**
     *  @template T
     *  @param {T} obj
     *  @param {
            (keyof T)[]
            | Record<keyof T, boolean>
            | FunctionFilterPredicate<T>
        } predicate
     */
    function pick(obj, predicate)
    {
        return pickKeys(obj, predicate)
            .reduce(function (acc, key)
            {
                acc[key] = obj[key];

                return acc;
            }, /** @type {Partial<T>} */({}))
        ;
    }

    /**
     *  @template T
     *  @param {T} obj
     *  @param {
            (keyof T)[]
            | Record<keyof T, boolean>
            | FunctionFilterPredicate<T>
        } predicate
     */
    function omitKeys(obj, predicate)
    {
        /** @type {(keyof T)[]} */var finalKeys = Object.keys(obj);
        if(isFunction(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return !((0, predicate)(obj[key], key, obj));
                })
            ;
        }
        else if(Array.isArray(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return !predicate.includes(key);
                })
            ;
        }
        else if(isNonNullObject(predicate))
        {
            finalKeys = finalKeys
                .filter(function (key)
                {
                    return !((key in predicate) && predicate[key]);
                })
            ;
        }

        return finalKeys;
    }

    /**
     *  @template T
     *  @param {T} obj
     *  @param {
            (keyof T)[]
            | Record<keyof T, boolean>
            | FunctionFilterPredicate<T>
        } predicate
     */
    function omit(obj, predicate)
    {
        return omitKeys(obj, predicate)
            .reduce(function (acc, key)
            {
                acc[key] = obj[key];

                return acc;
            }, /** @type {Partial<T>} */({}))
        ;
    }

    return {
        pickKeys : pickKeys,
        pick : pick,
        omitKeys : omitKeys,
        omit : omit
    };
})();
