const socket = io();

// const params = new URLSearchParams( window.location.search );

if(!params.has("name") || !params.has("room")) {
    window.location = "/";
    throw new Error("El nombre es necesario");
}

let user = {
    name: params.get("name"),
    room: params.get("room")
}

// Conectar
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function( res ) {
        renderUsers(res)
    });

});

socket.on("createMessage", function(msg) {
    renderMessages(msg, false);
    scrollBottom();
})

// Escuchar cuando un usuario entra o sale del chat
socket.on("usersList", function(users) {
    renderUsers(users);
})

// Mensajes privado
socket.on("privateMessage", function(msg) {
    console.log("Private message: ", msg);
})

// Escuchar
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});
