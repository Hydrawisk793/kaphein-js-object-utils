const { expect } = require("chai");

const {
    prefixToKeys,
} = require("../../src");

module.exports = function ()
{
    it("should prefix keys of a record.", function ()
    {
        const obj = {
            foo : 1,
            bar : false,
            baz : "a",
        };
        const text = "foo.";
        const expected = {
            [text + "foo"] : obj["foo"],
            [text + "bar"] : obj["bar"],
            [text + "baz"] : obj["baz"],
        };

        expect(prefixToKeys(obj, text)).to.deep.equal(expected);
    });

    it("should suffix string keys only.", function ()
    {
        const sym = Symbol("foo");
        const obj = {
            foo : 1,
            [sym] : false,
        };
        const text = ".qux";
        const expected = {
            [text + "foo"] : obj["foo"],
        };

        expect(prefixToKeys(obj, text)).to.deep.equal(expected);
    });

    it("should prefix all keys including inherited keys by default.", function ()
    {
        const parent = {
            // eslint-disable-next-line brace-style
            qux : () => {},
        };
        const obj = Object.assign(
            Object.create(parent),
            {
                foo : 1,
                bar : false,
                baz : "a",
            }
        );
        const text = "foo.";
        const expected = {
            [text + "qux"] : parent["qux"],
            [text + "foo"] : obj["foo"],
            [text + "bar"] : obj["bar"],
            [text + "baz"] : obj["baz"],
        };

        expect(prefixToKeys(obj, text)).to.deep.equal(expected);
    });

    it("should prefix own keys when the third parameter is true.", function ()
    {
        const parent = {
            // eslint-disable-next-line brace-style
            qux : () => {},
        };
        const obj = Object.assign(
            Object.create(parent),
            {
                foo : 1,
                bar : false,
                baz : "a",
            }
        );
        const text = "foo.";
        const expected = {
            [text + "foo"] : obj["foo"],
            [text + "bar"] : obj["bar"],
            [text + "baz"] : obj["baz"],
        };

        expect(prefixToKeys(obj, text, true)).to.deep.equal(expected);
    });
};
