
const lblNuevoTicket = document.querySelector("#lblNuevoTicket");
const btnCrear = document.querySelector("button");

const socket = io();

socket.on('connect', () => {
  btnCrear.disabled = false;
});

socket.on('disconnect', () => {
  btnCrear.disabled = true
});

socket.on('last-ticket', (payload) => {
  lblNuevoTicket.innerText = "Ticket " + payload;
})

btnCrear.addEventListener( 'click', () => {
    
  socket.emit('next-ticket', "ticket", ( ticket ) => {
    lblNuevoTicket.innerText = ticket;
  });

});