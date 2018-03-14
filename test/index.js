const assert = require('assert');
const sinon = require('sinon');
const interfaced = require('..');

describe('interfaced', function() {

    it('should work with classes', function() {
        const i = interfaced('test');
        const fixt_foo = 'FOO!';
        const stub = sinon.stub().returns(fixt_foo);

        class Base {
            constructor() { this.foo = fixt_foo; }
        }

        class Test extends Base {
            [i](...args) {
                assert.equal(this.foo, fixt_foo, 'Test.i should be able to access this');
                return stub(...args);
            }
        }

        class OtherTest extends Base {}
        i.implementOn(OtherTest, function(...args) {
            assert.equal(this.foo, fixt_foo, 'OtherTest.i should be able to access this');
            return stub(...args);
        });

        const test = new Test();
        const otherTest = new OtherTest();

        assert(i.implementedOn(test, 'Test implements interface'));
        assert(i.implementedOn(otherTest, 'OtherTest implements interface'));

        assert.equal(i.call(test, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');
        assert.equal(i.call(otherTest, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');

        i.apply(test, [ fixt_foo, fixt_foo ]);

        assert(stub.calledThrice, 'stub in interface implementation called thrice');
        assert(stub.withArgs(fixt_foo, fixt_foo).calledThrice, 'stub in interface implementation called thrice with correct args');
    });

    it('should work with function-classes', function() {
        const i = interfaced('test');
        const fixt_foo = 'FOO!';
        const stub = sinon.stub().returns(fixt_foo);

        function Test() { this.foo = fixt_foo; }
        Test.prototype[i] = function(...args) {
            assert.equal(this.foo, fixt_foo, 'Test.i should be able to access this');
            return stub(...args);
        };

        function OtherTest() { this.foo = fixt_foo; }
        i.implementOn(OtherTest, function(...args) {
            assert.equal(this.foo, fixt_foo, 'OtherTest.i should be able to access this');
            return stub(...args);
        });

        const test = new Test();
        const otherTest = new OtherTest();

        assert(i.implementedOn(test, 'Test implements interface'));
        assert(i.implementedOn(otherTest, 'OtherTest implements interface'));

        assert.equal(i.call(test, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');
        assert.equal(i.call(otherTest, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');

        i.apply(test, [ fixt_foo, fixt_foo ]);

        assert(stub.calledThrice, 'stub in interface implementation called thrice');
        assert(stub.withArgs(fixt_foo, fixt_foo).calledThrice, 'stub in interface implementation called thrice with correct args');
    });

    it('should work with plain objects', function() {
        const i = interfaced('test');
        const fixt_foo = 'FOO!';
        const stub = sinon.stub().returns(fixt_foo);

        const test = { foo: fixt_foo };
        test[i] = function(...args) {
            assert.equal(this.foo, fixt_foo, 'test.i should be able to access this');
            return stub(...args);
        };

        const otherTest = { foo: fixt_foo };
        i.implementOn(otherTest, function(...args) {
            assert.equal(this.foo, fixt_foo, 'otherTest.i should be able to access this');
            return stub(...args);
        });

        assert(i.implementedOn(test, 'Test implements interface'));
        assert(i.implementedOn(otherTest, 'OtherTest implements interface'));

        assert.equal(i.call(test, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');
        assert.equal(i.call(otherTest, fixt_foo, fixt_foo), fixt_foo, 'returns fixt_foo');

        i.apply(test, [ fixt_foo, fixt_foo ]);

        assert(stub.calledThrice, 'stub in interface implementation called thrice');
        assert(stub.withArgs(fixt_foo, fixt_foo).calledThrice, 'stub in interface implementation called thrice with correct args');
    });

});
