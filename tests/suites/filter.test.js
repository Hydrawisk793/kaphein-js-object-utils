const { expect } = require("chai");

const {
    pickKeys,
    omitKeys,
} = require("../../src");

module.exports = function ()
{
    const obj = {
        foo : 2,
        bar : "asdf",
        baz : "asdfzxcv",
        qux : 0.4,
        quux : false,
        quuux : true,
        piyo : [],
        piyopiyo : {},
    };

    function _emptyFunction()
    {}

    describe("pickKeys", function ()
    {
        it("should pick keys in a whitelist.", function ()
        {
            expect(pickKeys(obj, [])).to.deep.equal([]);

            let keysToFilter = ["foo", "bar"];
            expect(pickKeys(obj, keysToFilter)).to.deep.equal(keysToFilter);

            keysToFilter = ["foo", "zzzz"];
            expect(keysToFilter).to.include.members(pickKeys(obj, keysToFilter));
        });

        it("should pick keys selected by a record of boolean values.", function ()
        {
            expect(pickKeys(obj, {})).to.deep.equal([]);

            let predicate = {
                foo : true,
                bar : false,
                baz : {},
                qux : void 0,
                quuux : null,
            };
            expect(pickKeys(obj, predicate)).to.include.members(["foo", "baz"]);
        });

        it("should pick keys selected by a function.", function ()
        {
            expect(pickKeys(obj, _emptyFunction)).to.deep.equal([]);

            function predicate(value, key)
            {
                return key.startsWith("qu");
            }
            expect(pickKeys(obj, predicate)).to.include.members(["qux", "quux", "quuux"]);
        });
    });

    describe("omitKeys", function ()
    {
        it("should omit keys in a blacklist.", function ()
        {
            expect(omitKeys(obj, []).sort()).to.deep.equal(Object.keys(obj).sort());

            let keysToFilter = ["foo", "bar"];
            expect(omitKeys(obj, keysToFilter)).to.not.include.members(keysToFilter);

            keysToFilter = ["foo", "zzzz"];
            expect(keysToFilter).to.not.include.members(omitKeys(obj, keysToFilter));
        });

        it("should omit keys selected by a record of boolean values.", function ()
        {
            expect(omitKeys(obj, {}).sort()).to.deep.equal(Object.keys(obj).sort());

            let predicate = {
                foo : true,
                bar : false,
                baz : {},
                qux : void 0,
                quuux : null,
            };
            expect(omitKeys(obj, predicate)).to.not.include.members(["foo", "baz"]);
        });

        it("should omit keys selected by a function.", function ()
        {
            expect(omitKeys(obj, _emptyFunction).sort()).to.deep.equal(Object.keys(obj).sort());

            function predicate(value, key)
            {
                return key.startsWith("qu");
            }
            expect(omitKeys(obj, predicate)).to.not.include.members(["qux", "quux", "quuux"]);
        });
    });
};
