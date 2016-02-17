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
	* Esta function llena el select con los usuarios
	* activos en el sistema
	* @param array de usuarios
	*
	*/
	function fillUsers(users){
		var selUsers = $("#selUsers");
		selUsers.html("");
		for(var x=0; x<users.length; x++){
			selUsers.append("<option value='"+users[x]+"'>"+users[x]+"</option>");
		}
	}

	/**
	* Esta function crea el usuario en el server
	*
	*/
	function createUser(){
		var name = $("#txtName").val();
		socket.emit('newUser', name);
		$("#nameArea").hide();
		$("#nameTitle").html(name);
	}

	/**
	* Esta funcion envia un mensaje para que el server
	* lo maneje
	*/
	function sendMessage(){
		var sendTo = $("#selUsers").val();
		var message = $("#txtArea").val();
		socket.emit('msgToServer', {
			user: sendTo,
			message: message
		});
	}

	/**
	* Esta funcion recibe un mensaje del server
	*
	* @param String mensaje
	*/
	function onMessage(msg){
		$("#txtArea").html(msg);
	}

	/**
	* Agregar listeners a componentes
	*/
	function addListeners(){
		$("#btnName").click( () => createUser());
		$("#btnSend").click( () => sendMessage());
	}
 });

