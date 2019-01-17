const expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message')

describe('Generate message' , ()=>{
  it('it should generate correct message object' ,(done)=>{
    var text =  generateMessage('kar@qw.com','test');
    expect(text.from).toBe('kar@qw.com')
    expect(text.text).toBe('test')
    expect(typeof text.createdAt).toBe('number')
    done();
  });
});

describe('Generate location message' , ()=>{
  it('it should generate correct location message' ,(done)=>{
    var text =  generateLocationMessage('Admin',20,30);
    expect(text.from).toBe('Admin')
    expect(text.url).toBe('https://www.google.com/maps?q=20,30')
    expect(typeof text.createdAt).toBe('number')
    done();
  });
});
