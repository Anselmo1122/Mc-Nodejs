const { request, response } = require("express");

const userGet = (req = request, res = response) => {

	const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

	res.json({
		message: "GET API - Controller ",
		q,
		nombre,
		apikey,
		page,
		limit
	});
}

const userPost = (req = request, res = response) => {
	const { nombre, edad } = req.body;

	res.status(201).json({
		message: "PUT API - Controller",
		nombre,
		edad,
	});
}

const userPut = (req = request, res = response) => {

	const { id } = req.params;

	res.status(400).json({
		message: "PUT API - Controller",
		id,
	});
}

const userPatch = (req, res = response) => {
	res.json({
		message: "PATCH API - Controller",
	});
}

const userDelete = (req, res = response) => {
	res.json({
		message: "DELETE API - Controller",
	});
}

module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete
}