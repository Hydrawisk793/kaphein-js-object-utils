const filter = require("./suites/filter.test");
const extendClass = require("./suites/extend-class.test");

describe("kaphein-js-object-utils", function ()
{
    describe("filter", filter.bind(this));
    describe("prefixToKeys", require("./suites/prefix-to-keys.test").bind(this));
    describe("suffixToKeys", require("./suites/suffix-to-keys.test").bind(this));
    describe("extendClass", extendClass.bind(this));
});
