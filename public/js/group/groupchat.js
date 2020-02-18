//  CLIENT SIDE
$(document).ready(function(){
  var socket = io(); // we pass here the global io variable (it comes from the views/group.ejs one of the scripts at the bottom of the file (socket.io.js))

  var group = $('#groupName').val(); // with this we get the group name we've assigned to channel (it is in the controllers/home.js: successRedirect)
  // we'll use it to communicate events only in that room using joint

  var username = $('#sender').val(); // getting the useranme of the sender

  var myPlot = $('#textORplot');



socket.on('connect', function(){ // this listens to the connect event each time a SOCKET is connected
  // emmitting joint events (event only to one room)
  var params = {
      room: group,
      sender: username
    }

  socket.emit('join', params, function(){
      console.log('User has joined room '+ params.room)
    });

  });




//////
myPlot.on('plotly_restyle', function(data) {
    //console.log('here')
    //console.log($('#textORplot'))
    //console.log($('#textORplot')[0].layout)
    dataNew = {
      data: [$('#textORplot')[0].data[0]],
      layout: $('#textORplot')[0].layout
     }

  socket.emit('dataToServer', dataNew);

});

  socket.on('usersList', function(users){ // the users argument is from the client side the array of the users
    var ol = $('<ol></ol>'); // we're creating an ordered list
    // and using a for loop going through the user list
    for(var i = 0; i < users.length; i++){
      ol.append('<p>'+users[i]+'</p>') // this is how we combine html and javasc
    }

    $('#users').html(ol); // with this we append the ol to the #users div

    // if number of users is == 2 then start task
    if (users.length == 2){
      // in here we will have the task
      // for now, let's create just a plot to play around
      $("#waiting_area").hide();
      $("#textORplot").show();



     //io.emit('createPlot', () => {
        Plotly.plot('textORplot', [{
            x: [1, 2, 3],
            y: [2, 1, 3],
          }],
          {showlegend: false,
          xaxis: {fixedrange: true},
            yaxis: {fixedrange: true},
            sliders: [{
              pad: {
                t: 30
              },
              //active:1,
              currentvalue: {
                xanchor: 'right',
                prefix: 'color: ',
                font: {
                  color: '#888',
                  size: 20
                }
              },
              steps: [{
                label: 'blue',
                method: 'restyle',
                args: ['line.color', 'blue']
              }, {
                label: 'green',
                method: 'restyle',
                args: ['line.color', 'green']
              }, {
                label: 'red',
                method: 'restyle',
                args: ['line.color', 'red']
              }]
            }]
          }, {showSendToCloud: true}); // closing of plotly
    //  });  // closing of socket emit

    } // closing of if statemetn

});
socket.on('dataToClient', (plotData)=>{
  //$('#textORplot').empty()
  //Plotly.restyle('textORplot', plotData.data);
  Plotly.plot('textORplot', plotData.data, plotData.layout);
  Plotly.relayout('textORplot', plotData.layout);
  });
  // listening to an event coming from the server


  // emmiting an even from the client side to the server
  // keep in mind that each time u emit an event on the client side,
  // u have to go to the server side as well and listen for that event
  $('#message-form').on('submit', function(e){ // when the submit button is pressed ('send' in the view file)
    e.preventDefault(); // prevents the form from reloading
    var msg = $('#msg').val() // getting the data from the text-area
    socket.emit('createMessage', { // emmiting the event when submit is pressed
      text: msg,
      room: group,
      from: username
    }, function(){ // this function clears the text after pressing enter
      $('#msg').val('');
    });
  });
});
