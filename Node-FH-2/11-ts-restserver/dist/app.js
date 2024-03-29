"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_class_1 = __importDefault(require("./models/server.class"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const server = new server_class_1.default();
server.listen();
//# sourceMappingURL=app.js.map