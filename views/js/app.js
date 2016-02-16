 $(document).ready(function(){
 		//Iniciar sockets
		 var socket = io.connect( "http://localhost:3000");
	 	 //GET USUARIOS
	 	 socket.on('allUsers', function(users){fillUsers(users)});
	 	 //Recibir mensaje
	 	 socket.on('msgToClient', function(msg){onMessage(msg)});

	//Agregar Listeners
	addListeners();

	/**
	* Esta function recibe un objeto con los
	* usuarios presentes en el sistema
	* @param Object de usuarios
	*
	*/
	function fillUsers(users){
		var selUsers = $("#selUsers");
		selUsers.html("");
		for(var x=0; x<users.length; x++){
			selUsers.append("<option value='"+users[x]+"'>"+users[x]+"</option>");
		}
	}

	function createUser(){
		var name = $("#txtName").val();
		socket.emit('newUser', name);
		$("#nameArea").hide();
	}

	function sendMessage(){
		var sendTo = $("#selUsers").val();
		var message = $("#txtArea").val();
		socket.emit('msgToServer', {
			user: sendTo,
			message: message
		});
	}

	function onMessage(msg){
		$("#txtArea").html(msg);
	}

	function addListeners(){
		$("#btnName").click(function(){createUser();});
		$("#btnSend").click(function(){sendMessage();});
	}
 });

