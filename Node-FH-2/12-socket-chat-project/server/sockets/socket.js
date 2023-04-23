const { io } = require("../server");

const { Users } = require("../classes/users");
const { createMessage } = require("../utils/utils");

const users = new Users();

io.on("connection", (client) => {

	client.on("enterChat", (user, callback) => {
		if(!user.name || !user.room) {
            return callback({
                error: true,
                msg: "El nombre es necesario"
            })
        }

        client.join(user.room);

        const usersConnected = users.addUser( client.id, user.name, user.room );

        client.broadcast.to(user.room).emit("usersList", users.getUsersFromRoom(user.room));
        client.broadcast.to(user.room).emit("createMessage", createMessage("Admin", `${ user.name } se unió.`))

        callback(users.getUsersFromRoom(user.room));
	});

    client.on("createMessage", (data, callback) => {

        let user = users.getUser(client.id);

        let message = createMessage(user.name, data.message);
        client.broadcast.to(user.room).emit("createMessage", message);

        callback( message );
    })

    // Mensajes privados
    client.on("privateMessage", (data) => {
        let user = users.getUser(client.id);

        client.broadcast.to(data.for).emit("privateMessage", createMessage(user.name, data.message))
    })

    client.on("disconnect", () => {
        let userDeleted = users.deleteUser( client.id );

        client.broadcast.to(userDeleted.room).emit("createMessage", createMessage("Admin", `${ userDeleted.name } salió.`))
        client.broadcast.to(userDeleted.room).emit("usersList", users.getUsersFromRoom(userDeleted.room));
    })

});
