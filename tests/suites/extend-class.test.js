const { expect } = require("chai");

const { extendClass } = require("../../src");

module.exports = function ()
{
    // class A
    // {
    //     constructor(a, b)
    //     {
    //         this.qux = 1;
    //         this.a = a;
    //         this.b = b;
    //     }

    //     foo()
    //     {
    //         return 0;
    //     }

    //     bar()
    //     {
    //         return 1;
    //     }
    // }
    function A(a, b)
    {
        this.qux = 1;
        this.a = a;
        this.b = b;
    }
    A.prototype = {
        constructor : A,

        foo()
        {
            return 0;
        },

        bar()
        {
            return 1;
        }
    }
    A.staticMemberOfA = "A";
    const a = new A();

    it("should implement inheritance relationships.", function ()
    {
        const B = _createBClassViaExtendClassFunc();
        const b = new B("a", "b");

        expect(b.qux).to.equal(new A().qux);
        expect(b.a).to.be.equal("a");
        expect(b.b).to.be.undefined;
        expect(b).to.instanceOf(B);
        expect(b).to.instanceOf(A);
        expect(B).to.instanceOf(A.constructor);
        expect(B.staticMemberOfA).to.equal(A.staticMemberOfA);
        expect(B.staticMemberOfB).to.equal("test");
    });

    it("should implement method overridings.", function ()
    {
        const B = _createBClassViaExtendClassFunc();
        const b = new B();

        expect(a.foo()).to.equal(b.foo());
        expect(b.bar()).to.equal("asdf");
        expect(b.baz()).to.equal(false);
    });

    it("should be able to override constructor property.", function ()
    {
        const B = _createBClassViaExtendClassFunc({
            constructor : null,
        });

        expect(new B().constructor).to.be.null;
    });

    function _createBClassViaExtendClassFunc(proto = {})
    {
        // class B extends A
        // {
        //     bar()
        //     {
        //         return "asdf";
        //     }

        //     baz()
        //     {
        //         return false;
        //     }
        // }
        // Object.assign(B.prototype, proto);
        // B.staticMemberOfB = "test";

        const bCtor = function B()
        {};
        bCtor.staticMemberOfB = "test";
        const B = extendClass(
            A,
            bCtor,
            function (a)
            {
                return [a];
            },
            Object.assign(
                {
                    bar()
                    {
                        return "asdf";
                    },

                    baz()
                    {
                        return false;
                    }
                },
                proto
            )
        );

        return B;
    }
};
