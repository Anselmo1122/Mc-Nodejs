const socket = io();

// Referencias Html
const lblOnline = document.getElementById("lblOnline");
const lblOffline = document.getElementById("lblOffline");

const inputMessage = document.getElementById("inputMessage");
const buttonMessage = document.getElementById("buttonMessage");


socket.on("connect", () => {
  console.log("Conectado al servidor");

  socket.on("send-message", (payload) => {
    console.log(payload)
  })

  lblOffline.style.display = "none";
  lblOnline.style.display = "";
})

socket.on("disconnect", () => {
  console.log("Desconectado del servidor");

  lblOnline.style.display = "none";
  lblOffline.style.display = "";
})

buttonMessage.addEventListener("click", () => {

  const payload = {
    id: "123abc",
    user: "Client1",
    message: inputMessage.value
  }

  socket.emit("send-message", payload, (id) => {
    console.log("Desde el servidor:", id);
  })
})

