//tests/posts.js
function add(a, b) {
    return a + b;
}

Jasmine.onTest(function () {
    'use strict';
    describe('ggggg', function () {
        beforeEach(function () {
            Session.setDefault('counter', 0);
        });
        it('add 1 to 1', function () {
            expect(add(1, 1)).toEqual(2);
        })
        it('add 1 to 1', function () {
            Template.body.events['click button#bt1'];
            expect(Session.get('counter')).toEqual(1);
        })
    });
});
