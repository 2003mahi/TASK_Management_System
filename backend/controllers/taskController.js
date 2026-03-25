const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

const getTasks = asyncHandler(async (req, res) => {
    const { status, priority, search } = req.query;
    const query = { user: req.user.id };
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: 'i' };

    const tasks = await Task.find(query).sort({ createdAt: -1 });
    
    const total = await Task.countDocuments({ user: req.user.id });
    const completed = await Task.countDocuments({ user: req.user.id, status: 'Done' });
    const pending = total - completed;

    res.status(200).json({ tasks, stats: { total, completed, pending } });
});

const setTask = asyncHandler(async (req, res) => {
    if (!req.body.title || !req.body.description) {
        res.status(400); throw new Error('Please add title and description');
    }
    const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'Todo',
        priority: req.body.priority || 'Medium',
        dueDate: req.body.dueDate,
        user: req.user.id
    });
    res.status(201).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) { res.status(400); throw new Error('Task not found'); }
    if (task.user.toString() !== req.user.id) {
        res.status(401); throw new Error('User not authorized');
    }
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) { res.status(400); throw new Error('Task not found'); }
    if (task.user.toString() !== req.user.id) {
        res.status(401); throw new Error('User not authorized');
    }
    await task.deleteOne();
    res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
