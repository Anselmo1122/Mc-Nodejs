

const socketController = (socket) => {
  console.log('Cliente conectado', socket.id);

  const id = 123456789;

  socket.on("send-message", (payload, callback) => {
    socket.broadcast.emit("send-message", payload, callback(id));
  })

  socket.on("disconnect", () => {
    console.log("Cliente desconectado", socket.id)
  })
}

module.exports = {
  socketController,
}