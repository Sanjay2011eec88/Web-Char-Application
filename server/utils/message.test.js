var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () =>{
        var from ='Jen';
        var text = 'Some message';
        var message = generateMessage(from,text);

        //To assert that created at is a number
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({
            from,
            text
        });
    });

});