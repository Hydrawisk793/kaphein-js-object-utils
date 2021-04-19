var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isDefinedAndNotNull = kapheinJsTypeTrait.isDefinedAndNotNull;
var isArray = kapheinJsTypeTrait.isArray;
var isFunction = kapheinJsTypeTrait.isFunction;

module.exports = (function ()
{
    var defaultDeepEqualityComparisionOption = {
        maximumDepth : null,
        comparer : null
    };

    /**
     *  @param {typeof defaultDeepEqualityComparisionOption} [option]
     */
    function deepEquals(l, r, option)
    {
        var context;
        var typeOfLhs
        var lhs, rhs;
        var contextStack;
        var areEqual;
        var maximumDepth;
        var comparer;

        option = (isDefinedAndNotNull(option) ? option : defaultDeepEqualityComparisionOption);
        maximumDepth = option.maximumDepth;
        comparer = (isFunction(option.comparer) ? option.comparer : null);

        contextStack = [];
        contextStack.push({
            lhs : l,
            rhs : r,
            depth : 0
        });
        for(areEqual = true; areEqual && contextStack.length > 0; )
        {
            context = contextStack.pop();
            lhs = context.lhs;
            rhs = context.rhs;

            areEqual = lhs === rhs;
            if(!areEqual && (!Number.isSafeInteger(maximumDepth) || context.depth < maximumDepth))
            {
                typeOfLhs = typeof lhs;

                if(typeOfLhs === typeof rhs)
                {
                    switch(typeOfLhs)
                    {
                    case "undefined":
                        areEqual = true;
                        break;
                    case "number":
                        if(comparer)
                        {
                            areEqual = !!comparer(lhs, rhs, function ()
                            {
                                return relativelyEquals(lhs, rhs);
                            });
                        }
                        else
                        {
                            areEqual = relativelyEquals(lhs, rhs);
                        }
                        break;
                    case "object":
                        if(comparer)
                        {
                            areEqual = !!comparer(lhs, rhs, function ()
                            {
                                return _compare(contextStack, context, lhs, rhs);
                            });
                        }
                        else
                        {
                            areEqual = _compare(contextStack, context, lhs, rhs);
                        }
                        break;
                    default:
                        // Does nothing.
                    }
                }
            }
        }

        return areEqual;
    }

    function shallowEquals(lhs, rhs)
    {
        return deepEquals(lhs, rhs, { maximumDepth : 1 });
    }

    function _compare(contextStack, context, lhs, rhs)
    {
        var lhsKeys, rhsKeys;
        var key;
        var keyIndex;
        var areEqual = false;

        if(isArray(lhs) && isArray(rhs))
        {
            for(
                keyIndex = lhs.length, areEqual = lhs.length === rhs.length;
                areEqual && keyIndex > 0;
            )
            {
                --keyIndex;

                contextStack.push({
                    lhsParent : lhs,
                    lhs : lhs[keyIndex],
                    rhsParent : rhs,
                    rhs : rhs[keyIndex],
                    depth : (context.depth + 1)
                });
            }
        }
        else if(lhs instanceof RegExp && rhs instanceof RegExp)
        {
            areEqual = lhs.source === rhs.source
                && lhs.flags.split("").sort().join("") === rhs.flags.split("").sort().join("")
            ;
        }
        else if(lhs instanceof Date && rhs instanceof Date)
        {
            areEqual = lhs.getTime() === rhs.getTime();
        }
        else if(null !== lhs && null !== rhs)
        {
            lhsKeys = Object.keys(lhs);
            rhsKeys = Object.keys(rhs);

            areEqual = lhsKeys.length === rhsKeys.length;
            if(areEqual)
            {
                lhsKeys.sort();
                rhsKeys.sort();

                for(keyIndex = lhsKeys.length; areEqual && keyIndex > 0; )
                {
                    --keyIndex;

                    areEqual = lhsKeys[keyIndex] === rhsKeys[keyIndex];
                }

                for(keyIndex = lhsKeys.length; areEqual && keyIndex > 0; )
                {
                    --keyIndex;

                    key = lhsKeys[keyIndex];
                    contextStack.push({
                        lhsParent : lhs,
                        lhs : lhs[key],
                        rhsParent : rhs,
                        rhs : rhs[key],
                        depth : (context.depth + 1)
                    });
                }
            }
        }

        return areEqual;
    }

    /**
     *  @param {number} l
     *  @param {number} r
     *  @param {number} [epsilon]
     */
    function relativelyEquals(l, r)
    {
        var epsilon = ("number" === typeof arguments[2] ? arguments[2] : 1e-9);

        var absLSubtractR = Math.abs(l - r);

        return absLSubtractR <= epsilon || absLSubtractR <= epsilon * Math.max(Math.abs(l), Math.abs(r));
    }

    return {
        deepEquals : deepEquals,
        shallowEquals : shallowEquals
    };
})();
