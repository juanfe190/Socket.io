module.exports = {
	connectionStart:startConnection
};

var clients={};
function startConnection(io){
	io.on('connection', function(socket){
		  console.log('a user connected');
		  //Nuevo usuario
		  socket.on('newUser', function(user, socket){newUser(user, socket);});
		  //Envia usuarios a todos
		  io.emit('allUsers', allUsers());
		  //Mensaje recibido
		  socket.on('msgToServer', function(data){onMessage(data)});
		});

		function newUser(username, socket){
			clients[username] = socket;
		  	console.log(username);
		  	io.emit('allUsers', allUsers());
		 }

		 function allUsers(){
		 	var users = [];
			for(var user in clients) users.push(user);
			return users;	
		 }

		 function onMessage(data){
		 	var sendToSocket = clients[data.user];
		 	sendToSocket.emit('msgToClient', data.message);
		 }
}