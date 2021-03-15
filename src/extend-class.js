var kapheinJsTypeTrait = require("kaphein-js-type-trait");
var isDefinedAndNotNull = kapheinJsTypeTrait.isDefinedAndNotNull;
var isFunction = kapheinJsTypeTrait.isFunction;

module.exports = (function ()
{
    var _hasOwnProperty = Object.prototype.hasOwnProperty;

    function extendClass(parentCtor, ctor, proto)
    {
        if(!isFunction(parentCtor))
        {
            throw new TypeError("'parentCtor' must be a function.");
        }

        if(!isFunction(ctor))
        {
            throw new TypeError("'ctor' must be a function.");
        }

        if(!isDefinedAndNotNull(proto))
        {
            throw new TypeError("'proto' must not be undefined or null.");
        }

        ctor.prototype = Object.assign(
            Object.create(parentCtor.prototype),
            {
                constructor : ctor
            },
            proto
        );

        if(Object.setPrototypeOf)
        {
            Object.setPrototypeOf(ctor, parentCtor);
        }
        else if(ctor.__proto__)
        {
            ctor.__proto__ = parentCtor;
        }
        else
        {
            Object
                .keys(parentCtor)
                .forEach(
                    function (key)
                    {
                        if(_hasOwnProperty.call(parentCtor, key))
                        {
                            ctor[key] = parentCtor[key];
                        }
                    }
                )
            ;
        }

        return ctor;
    }

    return {
        extendClass : extendClass
    };
})();
