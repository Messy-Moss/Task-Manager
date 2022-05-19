import { Router } from 'express';
import { addTask, deleteTask, getAllTasks, getTask, updateTask } from '../controllers/task';

const router = Router();

router
.get('/', getAllTasks)
.get('/:id', getTask);

router.post('/', addTask);

router.patch('/:id', updateTask);

router.delete('/:id', deleteTask);

export default router;