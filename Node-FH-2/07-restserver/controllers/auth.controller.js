const { request, response } = require("express");

const bcrypt = require("bcryptjs");

const UserModel = require("../models/user.model");
const generateJWT = require("../helpers/generateJWT");

const authPost = async (req = request, res = response) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });

	try {
		// Verificar la contraseña.
		const isValidPassword = bcrypt.compareSync(password, user.password);
		if (!isValidPassword)
			return res.status(400).json({
				message: "La contraseña es incorrecta.",
			});

		// Generar JWT.
		const token = await generateJWT(user.id);

		res.json({
			msg: "Login ok",
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		res.json({
			message: "Ha ocurrido un error, comuníquese con el administrador",
		});
	}
};

module.exports = {
	authPost,
};
