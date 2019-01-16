const expect = require('expect');

var {generateMessage} = require('./message')

describe('Generate message' , ()=>{
  it('it should generate correct message object' ,(done)=>{
    var text =  generateMessage('kar@qw.com','test');
    expect(text.from).toBe('kar@qw.com')
    expect(text.text).toBe('test')
    expect(typeof text.createdAt).toBe('number')
    done();
  });
});
