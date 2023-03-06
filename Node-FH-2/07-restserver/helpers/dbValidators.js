const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");

const isRoleValid = async (role = "") => {
	const existRole = await RoleModel.findOne({ role });
	if (!existRole) throw new Error(`El role ${role} no está registrado en la base de datos`);
};

const existEmail = async (email = "") => {
	const emailExist = await UserModel.findOne({ email });
	if (emailExist) throw new Error(`El email ${email} ya está registrado`);
};
const existEmailLogin = async (email = "") => {
	const emailExist = await UserModel.findOne({ email });
	if (!emailExist) throw new Error(`El email ${email} no está registrado`);
};

const isUserActive = async (email) => {
	const isActive = await UserModel.findOne({ email, state: true });
	if (!isActive) throw new Error(`El usuario está inactivo.`);
}

const existUserById = async (id) => {
	const existUser = await UserModel.findById(id);
	if (!existUser) throw new Error(`El usuario con el id ${id} no existe`);
}

module.exports = {
	isRoleValid,
	existEmail,
	existEmailLogin,
	isUserActive,
	existUserById,
};
