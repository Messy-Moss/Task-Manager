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
exports.updateTask = exports.deleteTask = exports.addTask = exports.getTask = exports.getAllTasks = void 0;
const data_source_1 = require("../data-source");
const Task_1 = __importDefault(require("../models/Task"));
const taskRepository = data_source_1.AppDataSource.getRepository(Task_1.default);
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const savedTasks = yield taskRepository.find();
        res.status(200).json(savedTasks);
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
        });
    }
});
exports.getAllTasks = getAllTasks;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield taskRepository.findOne({
            where: {
                id: taskId
            }
        });
        if (!task)
            throw new Error('task with given id does not exist');
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            data: {
                message: err
            }
        });
    }
});
exports.getTask = getTask;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const task = new Task_1.default(body.description, body.completed);
        yield taskRepository.save(task);
        res.status(201).json({
            status: "success",
            data: {
                task
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: "fail",
        });
    }
});
exports.addTask = addTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield taskRepository.findOneBy({
            id: taskId
        });
        if (!task)
            throw new Error('task with given id does not exist');
        yield taskRepository.remove(task);
        res.status(204).json({
            status: 'success'
        });
    }
    catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
});
exports.deleteTask = deleteTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taskId = req.params.id;
        const task = yield taskRepository.findOneBy({
            id: taskId
        });
        if (!task)
            throw new Error('task with given id does not exist');
        for (const [key, value] of Object.entries(req.body)) {
            if (key in task) {
                task[key] = value;
            }
        }
        yield taskRepository.save(task);
        res.status(201).json({
            status: 'success',
            data: {
                task
            }
        });
    }
    catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        });
    }
});
exports.updateTask = updateTask;
