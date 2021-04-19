var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isArray = kapheinJsTypeTrait.isArray;
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
        else
        {
            var keyMap = null;
            if(isArray(predicate))
            {
                keyMap = _createKeyMap(predicate);
            }
            else if(isNonNullObject(predicate))
            {
                keyMap = predicate;
            }

            if(keyMap)
            {
                finalKeys = finalKeys
                    .filter(function (key)
                    {
                        return (key in keyMap) && keyMap[key];
                    })
                ;
            }
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
        else
        {
            var keyMap = null;
            if(isArray(predicate))
            {
                keyMap = _createKeyMap(predicate);
            }
            else if(isNonNullObject(predicate))
            {
                keyMap = predicate;
            }

            if(keyMap)
            {
                finalKeys = finalKeys
                    .filter(function (key)
                    {
                        return !((key in keyMap) && keyMap[key]);
                    })
                ;
            }
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

    /**
     *  @template T
     *  @param {(keyof T)[]} keys
     */
    function _createKeyMap(keys)
    {
        /** @type {Record<keyof T, true>} */var keyMap = {};
        keys.forEach(function (key)
        {
            keyMap[key] = true;
        });

        return keyMap;
    }

    return {
        pickKeys : pickKeys,
        pick : pick,
        omitKeys : omitKeys,
        omit : omit
    };
})();
