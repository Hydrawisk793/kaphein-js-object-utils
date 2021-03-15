import { Assign } from "kaphein-ts-type-utils";

export declare function extendClass<
    BaseClass extends Function,
    Constructor extends (...args : any[]) => any,
    Prototype,
    DerivedConstructor extends Assign<
        BaseClass,
        Constructor
    > = Assign<
        BaseClass,
        Constructor
    >,
    BasePrototype extends BaseClass["prototype"] = BaseClass["prototype"],
    Derived extends Assign<
        BasePrototype,
        Assign<
            {
                constructor : DerivedConstructor;
            },
            Prototype
        >
    > = Assign<
        BasePrototype,
        Assign<
            {
                constructor : DerivedConstructor;
            },
            Prototype
        >
    >,
>(
    baseClass : BaseClass,
    ctor : Constructor,
    proto : Prototype
) : Assign<
    DerivedConstructor,
    {
        new (...args : Parameters<Constructor>) : Derived;

        prototype : Derived;
    }
>;
