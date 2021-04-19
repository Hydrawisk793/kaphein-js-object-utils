var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isDefinedAndNotNull = kapheinJsTypeTrait.isDefinedAndNotNull;
var isFunction = kapheinJsTypeTrait.isFunction;

module.exports = (function ()
{
    var extendClass = null;
    if(_supportsClass() && _supportsSpreadInFunctionCalls())
    {
        extendClass = function extendClass(parentCtor, pickParentArgs, ctor, proto)
        {
            _assertArgsAreValid(parentCtor, pickParentArgs, ctor, proto);

            var derived = class extends parentCtor
            {
                constructor()
                {
                    super(...(isFunction(pickParentArgs) ? pickParentArgs.apply(void 0, arguments) : arguments));
                    ctor.apply(this, arguments);
                }
            };

            Object.assign(derived.prototype, proto);

            // Hoist own properties of ctor.
            Object.assign(derived, ctor);

            return derived;
        };
    }
    else
    {
        extendClass = function extendClass(parentCtor, pickParentArgs, ctor, proto)
        {
            _assertArgsAreValid(parentCtor, pickParentArgs, ctor, proto);

            var derived = function ()
            {
                parentCtor.apply(this, (isFunction(pickParentArgs) ? pickParentArgs.apply(void 0, arguments) : arguments));
                ctor.apply(this, arguments);
            };

            derived.prototype = Object.assign(
                Object.create(parentCtor.prototype),
                {
                    constructor : derived
                },
                proto
            );

            // Hoist own properties of ctor.
            Object.assign(derived, ctor);

            // Set up the prototype chain.
            if(Object.setPrototypeOf)
            {
                Object.setPrototypeOf(derived, parentCtor);
            }
            else if(derived.__proto__)
            {
                derived.__proto__ = parentCtor;
            }
            else
            {
                // If prototype chaning of constructors is not available,
                // Hoist all enumerable properties of the ancestors.
                var _isEnumerable = Object.prototype.propertyIsEnumerable;
                for(var key in parentCtor)
                {
                    if(_isEnumerable.call(parentCtor, key))
                    {
                        derived[key] = parentCtor[key];
                    }
                }
            }

            return derived;
        };
    }

    function _supportsClass()
    {
        var supports = true;

        try
        {
            (new Function("class A {}"))();
        }
        catch(error)
        {
            supports = false;
        }

        return supports;
    }

    function _supportsSpreadInFunctionCalls()
    {
        var supports = true;

        try
        {
            (new Function("(function(){})(...[1,2])"))();
        }
        catch(error)
        {
            supports = false;
        }

        return supports;
    }

    function _assertArgsAreValid(parentCtor, pickParentArgs, ctor, proto)
    {
        if(!isFunction(parentCtor))
        {
            throw new TypeError("'parentCtor' must be a function.");
        }

        if(null !== pickParentArgs && !isFunction(pickParentArgs))
        {
            throw new TypeError("'pickParentArgs' must be null or a function.");
        }

        if(!isFunction(ctor))
        {
            throw new TypeError("'ctor' must be a function.");
        }

        if(!isDefinedAndNotNull(proto))
        {
            throw new TypeError("'proto' must not be undefined or null.");
        }
    }

    return {
        extendClass : extendClass
    };
})();
