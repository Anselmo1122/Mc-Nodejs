const express = require("express");
const hbs = require('hbs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT;

// Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

// Servir contenido estático.
app.use( express.static("public") );

const optionsRender = {
  name: "Anselmo Del Hoyo",
  title: "Curso de Node"
}

app.get("/", function (req, res) {
  res.render("home", optionsRender);
});

app.get("/generic", function (req, res) {
  res.render("generic", optionsRender);
});

app.get("/elements", function (req, res) {
  res.render("elements", optionsRender);
});

app.get("*", function (req, res) {
  res.render("404", optionsRender);
});

// ----- Endpoints par servir contenido estático
// app.get("/home", function (req, res) {
//   res.send();
// });

// app.get("/generic", function (req, res) {
//   res.sendFile(__dirname + "/public/generic.html");
// });

// app.get("/elements", function (req, res) {
//   res.sendFile(__dirname + "/public/elements.html");
// });

// app.get("*", function (req, res) {
//   res.sendFile(__dirname + "/public/404.html");
// });

app.listen(8080, () => {
  console.log("Escuchando en el puerto", port);
});
