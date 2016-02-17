module.exports = {
	connectionStart:startConnection
};

var clients={};
function startConnection(io){
	io.on('connection', function(socket){
		  console.log('Un usuario se ha conectado');
		   //Nuevo usuario
		  socket.on('newUser', function(user){newUser(user);});
		   //Envia usuarios a todos
		  sendAllUsers();
		   //Mensaje recibido
		  socket.on('msgToServer', function(data){onMessage(data)});
		   //Usuario desconectado
		   socket.on('disconnect', function(){onUserDisconnect(socket.user)});	

		  function newUser(username){
		  	socket.user = username;
			clients[username] = socket;
		  	console.log("Nuevo nombre creado: "+username);
		  	sendAllUsers();	
		 }
	});

		 function sendAllUsers(){
		 	var users = [];
			for(var user in clients) users.push(user);
			io.emit('allUsers', users);	
		 }

		 function onMessage(data){
		 	var sendToSocket = clients[data.user];
		 	sendToSocket.emit('msgToClient', data.message);
		 }

		 function onUserDisconnect(username){
		 	delete clients[username];
		 	console.log("El usuario: "+username+" se ha desconectado");
		 	sendAllUsers();
		 }
}