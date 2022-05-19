"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.env = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const ts_dotenv_1 = require("ts-dotenv");
const Task_1 = __importDefault(require("./models/Task"));
exports.env = (0, ts_dotenv_1.load)({
    PORT: Number,
    DATABASE_NAME: String,
    DATABASE_PASSWORD: String
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: exports.env.DATABASE_NAME,
    password: exports.env.DATABASE_PASSWORD,
    database: "Task-Manager",
    entities: [Task_1.default],
    synchronize: true,
    logging: false,
});
