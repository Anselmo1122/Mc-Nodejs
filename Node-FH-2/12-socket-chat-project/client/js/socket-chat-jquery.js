
const params = new URLSearchParams( window.location.search );

let name = params.get("name");
let room = params.get("room");

// Referencias JQuery
const divUsers = $("#divUsuarios");
const formSend = $("#formEnviar");
const txtMessage = $("#txtMensaje");
const divChatbox = $("#divChatbox");

// Funciones para renderizar usuarios
function renderUsers(users) {

  console.log(users);

  let html = "";

  html += "<li>";
  html += "   <a href='javascript:void(0)' class='active'> Chat de <span> " + params.get("room") + "</span></a>";
  html += "</li>";

  for (let i = 0; i < users.length; i++) {
    html += '<li>'
    html += '  <a data-id="' + users[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + users[i].name + '<small class="text-success">online</small></span></a>'
    html += '</li>'
  }

  divUsers.html(html)

}

// Función para renderizar mensajes
function renderMessages(message, me) {

  let html = "";
  let date = new Date(message.date);
  let hour = date.getHours() + ':' + date.getMinutes();

  let adminClass = "info";
  if( message.name === "Admin" ) {
    adminClass = "danger"
  }

  if(me) {
    html += '<li class="reverse">'
    html += '  <div class="chat-content">'
    html += '      <h5>'+ message.name +'</h5>'
    html += '      <div class="box bg-light-inverse">'+ message.message +'</div>'
    html += '  </div>'
    html += '  <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
    html += '  <div class="chat-time">'+ hour +'</div>'
    html += '</li>'
  } else {
    html += '<li class="animated fadeIn">'

    if (message.name !== "Admin") html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>'
    
    html += '  <div class="chat-content">'
    html += '    <h5>'+ message.name +'</h5>'
    html += '    <div class="box bg-light-'+ adminClass +'">' + message.message + '</div>'
    html += '  </div>'
    html += '  <div class="chat-time">'+ hour +'</div>'
    html += '</li>'
  }

  divChatbox.append(html)
}

function scrollBottom() {

  // selectors
  var newMessage = divChatbox.children('li:last-child');

  // heights
  var clientHeight = divChatbox.prop('clientHeight');
  var scrollTop = divChatbox.prop('scrollTop');
  var scrollHeight = divChatbox.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight() || 0;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      divChatbox.scrollTop(scrollHeight);
  }
}

// Escuchas
divUsers.on("click", "a", function() {

  let id = $(this).data("id");

  if( id ) {
    console.log(id);
  }

})

formSend.on("submit", function(e){
  e.preventDefault();

  if(txtMessage.val().trim().length === 0) return;

  socket.emit("createMessage", {
    name,
    message: txtMessage.val()
  }, function(message) {
    txtMessage.val("").focus();
    renderMessages(message, true);
    scrollBottom();
  })
})