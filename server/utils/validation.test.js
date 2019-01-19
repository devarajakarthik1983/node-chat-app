const expect = require('expect');

var {isRealString} = require('./validation')

describe('Name and Room detail Test cases' , ()=>{
  it('it should let into the room when the name and room is correct' ,(done)=>{
    var res =  isRealString('Karthik','room1');
    expect(res).toBe(true);
    done();
  });

  it('it should not let into the room when the name and room values are empty' ,(done)=>{
    var res =  isRealString('','');
    expect(res).toBe(false);
    done();
  });

  it('it should not let into the room when the name and room values have spaces' ,(done)=>{
    var res =  isRealString('  test  ','   room1  ');
    expect(res).toBe(true);
    done();
  });

  it('it should not let into the room when the name and room values are numbers' ,(done)=>{
    var res =  isRealString(1,2);
    expect(res).toBe(false);
    done();
  });
});
