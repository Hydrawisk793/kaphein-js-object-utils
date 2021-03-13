const filter = require("./suites/filter.test");
const extendClass = require("./suites/extend-class.test");

describe("kaphein-js-object-utils", function ()
{
    describe("filter", filter.bind(this));
    describe("extendClass", extendClass.bind(this));
});
