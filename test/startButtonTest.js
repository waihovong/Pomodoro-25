const assert = reuqire('chai').assert;
const startButton = require('../src').startButton;

describe('Start', function(){
    it('start button should be pressed', function(){
        assert.equal(app(), 'start');
    })
})