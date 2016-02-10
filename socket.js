module.exports = {
	connectionStart:startConnection
};

function startConnection(io){
	io.on('connection', function(socket){
		  console.log('a user connected');

		  socket.on('message', function(msg){
		  	console.log('Mensaje'+msg);
		  });
		});
}