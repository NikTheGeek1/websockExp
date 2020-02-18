// SERVER SIDE
module.exports = function(io, Users){
  // bringing in the users class with all the methods to remove, add etc uers from the user list
  const users = new Users(); // the new keyword creates a new constructor (instance in python lang?)




  // inside the following connection we put every event that we listen or send
  io.on('connection', (socket) => {// that enables the server to lister to the connections event

    socket.on('dataToServer', (plotData) =>{
      //plotData2 = {data:[plotData.data], layout:plotData.layout}
      datas = {x:plotData.data[0].x, y:plotData.data[0].y, 'line.color':plotData.data[0].line.color}
      console.log(datas)
      //plotData.data = datas
      io.emit('dataToClient', plotData)
    });



    console.log('User Connected'); // this will be displayed to the terminal
    // listenning to the joint event coming from the client
    socket.on('join', (params, callback) => { // event is the data sent from the event called join
      socket.join(params.room);// this method allows users to connect to a particular channel, takes argument room name

      users.AddUserData(socket.id, params.sender, params.room);

      io.to(params.room).emit('usersList', users.GetUsersList(params.room)); // sending the userlist to the client from getting it using the function defined in the Users class



      callback(); // this callback is neccessary because when we sent the message from
      // the client side, we also added a function ('join', params, function) so
      // the callback reflects that function
    });

  // creating a listenning event that every time a user disconnects, then the
  // function from the User class RemoveUser is going to be triggered and Remove user data
  socket.on('disconnect', () => {
    var user = users.RemoveUser(socket.id);
    if(user){
      io.to(user.room).emit('usersList', users.GetUsersList(user.room)); // getting the user list using the function defined in the Users class
    }
  });
  });

}
