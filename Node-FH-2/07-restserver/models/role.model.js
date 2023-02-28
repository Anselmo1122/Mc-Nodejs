const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
	rol: {
		type: String,
		required: [true, "El rol es obligatorio"],
	},
});

const RoleModel = model("Role", roleSchema);

module.exports = RoleModel;
