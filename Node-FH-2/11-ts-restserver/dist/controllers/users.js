"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.obtainUser = exports.obtainUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const obtainUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll();
    res.json({ users });
});
exports.obtainUsers = obtainUsers;
const obtainUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user)
        return res.status(404).json({ msg: `User with id ${id} not found` });
    res.json({ user });
});
exports.obtainUser = obtainUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existEmail = yield user_1.default.findOne({
            where: { email: body.email }
        });
        if (existEmail) {
            return res.status(400).json({
                msg: `There is already a user with the email ${body.email}`
            });
        }
        const user = yield user_1.default.create(body);
        yield user.save();
        res.json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Speak width de admin"
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(400).json({
                msg: `There is no user with id ${id}`
            });
        }
        yield user.update(body);
        res.json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            msg: "Speak width de admin"
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(400).json({
            msg: `There is no user with id ${id}`
        });
    }
    // Eliminación física.
    // await user.destroy();
    yield user.update({ state: false });
    res.json({ user });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map