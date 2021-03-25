const { expect } = require("chai");

const {
    suffixToKeys,
} = require("../../src");

module.exports = function ()
{
    it("should suffix keys of a record.", function ()
    {
        const obj = {
            foo : 1,
            bar : false,
            baz : "a",
        };
        const text = ".qux";
        const expected = {
            ["foo" + text] : obj["foo"],
            ["bar" + text] : obj["bar"],
            ["baz" + text] : obj["baz"],
        };

        expect(suffixToKeys(obj, text)).to.deep.equal(expected);
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
            ["foo" + text] : obj["foo"],
        };

        expect(suffixToKeys(obj, text)).to.deep.equal(expected);
    });

    it("should suffix all keys including inherited keys by default.", function ()
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
            ["qux" + text] : parent["qux"],
            ["foo" + text] : obj["foo"],
            ["bar" + text] : obj["bar"],
            ["baz" + text] : obj["baz"],
        };

        expect(suffixToKeys(obj, text)).to.deep.equal(expected);
    });

    it("should suffix own keys when the third parameter is true.", function ()
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
            ["foo" + text] : obj["foo"],
            ["bar" + text] : obj["bar"],
            ["baz" + text] : obj["baz"],
        };

        expect(suffixToKeys(obj, text, true)).to.deep.equal(expected);
    });
};
