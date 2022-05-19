import { RequestHandler } from 'express';
import { AppDataSource } from '../data-source';
import Task from '../models/Task';

const taskRepository = AppDataSource.getRepository(Task);

export const getAllTasks: RequestHandler = async (req, res) => {
    try {
        const savedTasks = await taskRepository.find();
        res.status(200).json(savedTasks);
    } catch(err) {
        res.status(500).json({
            status: "fail",
        });
    }
}

export const getTask: RequestHandler<{ id: number }> = async (req, res) => {
    try {
        const taskId = req.params.id;
    
        const task = await taskRepository.findOne({
            where: {
                id: taskId
            }
        });
    
        if (!task) throw new Error('task with given id does not exist');
        
        res.status(200).json({
            status: "success",
            data: {
                task
            }
        });
    } catch(err) {
        res.status(404).json({
            status: 'fail',
            data: {
                message: err
            }
        });
    }
}

export const addTask: RequestHandler = async (req, res) => {
    try {
        const body: { description: string, completed: false } = req.body;

        const task = new Task(body.description, body.completed);
    
        await taskRepository.save(task)
        
        res.status(201).json({
            status: "success",
            data: {
                task
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "fail",
        });
    }
}

export const deleteTask: RequestHandler<{ id: number }> = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task = await taskRepository.findOneBy({
            id: taskId
        });
    
        if (!task) throw new Error('task with given id does not exist');
    
        await taskRepository.remove(task);
    
        res.status(204).json({
            status: 'success'
        });
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

export const updateTask: RequestHandler<{ id: number }> = async (req, res) => {
    try {
        const taskId = req.params.id;

        const task: any = await taskRepository.findOneBy({
            id: taskId
        });
        
        if (!task) throw new Error('task with given id does not exist');

        for (const [key, value] of Object.entries(req.body)) {
            if (key in task) {
                task[key] = value;
            }
        }
    
        await taskRepository.save(task);
    
        res.status(201).json({
            status: 'success',
            data: {
                task
            }
        });
    } catch (err) {
        res.status(500).json({
            status: 'fail',
            message: err
        })
    }
}