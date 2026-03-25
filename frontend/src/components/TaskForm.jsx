import { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

const TaskForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    priority: 'Medium',
    dueDate: ''
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: '', description: '', status: 'Todo', priority: 'Medium', dueDate: '' });
  };

  return (
    <div className="glass-card fade-in" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <FiPlus /> Add New Task
      </h3>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <input type="text" name="title" value={formData.title} onChange={onChange} className="form-control" placeholder="Task Title" required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <input type="text" name="description" value={formData.description} onChange={onChange} className="form-control" placeholder="Brief Description" required />
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <select name="status" value={formData.status} onChange={onChange} className="form-control">
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <select name="priority" value={formData.priority} onChange={onChange} className="form-control">
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
        <div className="form-group" style={{ marginBottom: '0' }}>
          <input type="date" name="dueDate" value={formData.dueDate} onChange={onChange} className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary" style={{ height: '42px', alignSelf: 'center' }}>
          Create Task
        </button>
      </form>
    </div>
  );
};
export default TaskForm;
