const expect = require('expect');
const {Users} =  require('./users');

describe('Users' ,()=>{

  beforeEach(()=>{
    users = new Users();
    users.users=[{
      id:'1',
      name:'Kar',
      room:'A'
    },{
      id:'2',
      name:'Kar1',
      room:'A'
    },
    {
      id:'3',
      name:'Kar3',
      room:'A'
    }];
  });

  it('should create user' ,()=>{
    var users = new Users();
    var user ={
      id:'123',
      name:'Karthik',
      room:'LOT'
    };
    var resUser = users.addUser(user.id,user.name,user.room);
    expect(users.users).toEqual([user]);
  });

it('should return the users for a given room' ,()=>{
  var userList = users.getUserList('A');
  expect(userList).toEqual(['Kar','Kar1','Kar3'])
});

it('should remove user' , ()=>{

  var userId= '2';
  var returnedUser = users.removeUser(userId);
  expect(returnedUser.id).toBe(userId);

});

it('should not remove user with invalid id' ,()=>{
  var userId= '21';
  var returnedUser = users.removeUser(userId);
  expect(returnedUser).toBe(undefined);
});

it('should find user' , ()=>{

var userId= '2';
var returnedUser = users.getUser(userId);
expect(returnedUser.id).toBe(userId);

});

it('should not find user when an invalid userid' ,()=>{

  var userId= '10';
  var returnedUser = users.getUser(userId);
  expect(returnedUser).toBe(undefined);

});




});
