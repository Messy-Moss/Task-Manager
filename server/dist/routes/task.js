"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_1 = require("../controllers/task");
const router = (0, express_1.Router)();
router
    .get('/', task_1.getAllTasks)
    .get('/:id', task_1.getTask);
router.post('/', task_1.addTask);
router.patch('/:id', task_1.updateTask);
router.delete('/:id', task_1.deleteTask);
exports.default = router;
