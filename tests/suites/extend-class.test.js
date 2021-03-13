const { expect } = require("chai");

const { extendClass } = require("../../src");

module.exports = function ()
{
    class A
    {
        foo()
        {
            return 0;
        }

        bar()
        {
            return 1;
        }
    }
    A.staticMemberOfA = "A";
    const a = new A();

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
    // B.staticMemberOfB = "test";
    let B = null;

    let b = null;

    it("should create a derived class.", function ()
    {
        const bCtor = function B()
        {};
        bCtor.staticMemberOfB = "test";
        B = extendClass(
            A,
            bCtor,
            {
                bar()
                {
                    return "asdf";
                },

                baz()
                {
                    return false;
                }
            }
        );

        b = new B();
    });

    it("should implement inheritance relationships.", function ()
    {
        expect(b).to.instanceOf(B);
        expect(b).to.instanceOf(A);
        expect(B).to.instanceOf(A.constructor);
        expect(B.staticMemberOfA).to.equal(A.staticMemberOfA);
        expect(B.staticMemberOfB).to.equal("test");
    });

    it("should implement method overridings.", function ()
    {
        expect(a.foo()).to.equal(b.foo());
        expect(b.bar()).to.equal("asdf");
        expect(b.baz()).to.equal(false);
    });
};
