var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isReferenceType = kapheinJsTypeTrait.isReferenceType;
var isString = kapheinJsTypeTrait.isString;

module.exports = (function ()
{
    /**
     *  @template T
     *  @template {string} N
     *  @typedef {import("kaphein-ts-type-utils").PrefixToKeys<T, N>} PrefixToKeys
     */
    /**
     *  @template T
     *  @template {string} N
     *  @typedef {import("kaphein-ts-type-utils").SuffixToKeys<T, N>} SuffixToKeys
     */

    /**
     *  @template {{}} T
     *  @template {string} N
     *  @param {T} obj
     *  @param {N} text
     *  @param {boolean} [ownKeysOnly]
     *  @returns {PrefixToKeys<T, N>}
     */
    function prefixToKeys(obj, text)
    {
        if(!isReferenceType(obj))
        {
            throw new TypeError("The type of 'obj' must be a refrence type.");
        }

        if(!isString(text))
        {
            throw new TypeError("'text' must be a string.");
        }

        var ownKeysOnly = arguments[2];

        var result = {};
        var key;
        if(ownKeysOnly)
        {
            var keys = Object.keys(obj);
            for(var i = 0; i < keys.length; ++i)
            {
                key = keys[i];
                if(isString(key))
                {
                    result[text + key] = obj[key];
                }
            }
        }
        else
        {
            for(key in obj)
            {
                if(isString(key))
                {
                    result[text + key] = obj[key];
                }
            }
        }

        return result;
    }

    /**
     *  @template {{}} T
     *  @template {string} N
     *  @param {T} obj
     *  @param {N} text
     *  @param {boolean} [ownKeysOnly]
     *  @returns {SuffixToKeys<T, N>}
     */
    function suffixToKeys(obj, text)
    {
        if(!isReferenceType(obj))
        {
            throw new TypeError("The type of 'obj' must be a refrence type.");
        }

        if(!isString(text))
        {
            throw new TypeError("'text' must be a string.");
        }

        var ownKeysOnly = arguments[2];

        var result = {};
        var key;
        if(ownKeysOnly)
        {
            var keys = Object.keys(obj);
            for(var i = 0; i < keys.length; ++i)
            {
                key = keys[i];
                if(isString(key))
                {
                    result[key + text] = obj[key];
                }
            }
        }
        else
        {
            for(key in obj)
            {
                if(isString(key))
                {
                    result[key + text] = obj[key];
                }
            }
        }

        return result;
    }

    return {
        prefixToKeys : prefixToKeys,
        suffixToKeys : suffixToKeys
    };
})();
