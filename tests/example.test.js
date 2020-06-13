'use strict';

const { exampleFunction } = require('./../src/server/utils/example');

const expect = require('chai').expect;

describe('Example', function () 
{
    describe('exampleFunction()', function () 
    {
        it('output should equal "dashboard"', function () 
        {
            expect(exampleFunction()).to.equal('dashboard');
        });
    });
});
