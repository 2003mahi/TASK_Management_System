import { FiTrash2, FiCheckCircle } from 'react-icons/fi';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  const getPriorityBadgeClass = (priority) => {
    switch(priority) {
      case 'High': return 'badge-high';
      case 'Medium': return 'badge-medium';
      case 'Low': return 'badge-low';
      default: return 'badge-medium';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Done': return 'badge-done';
      case 'In Progress': return 'badge-progress';
      case 'Todo': return 'badge-todo';
      default: return 'badge-todo';
    }
  };

  const markComplete = () => {
    onUpdate(task._id, { ...task, status: 'Done' });
  };

  return (
    <div className="glass-card fade-in" style={{ padding: '1.5rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: `4px solid ${task.status === 'Done' ? 'var(--success-color)' : 'var(--primary-color)'}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ textDecoration: task.status === 'Done' ? 'line-through' : 'none', opacity: task.status === 'Done' ? 0.7 : 1 }}>
            {task.title}
          </h4>
          <p style={{ fontSize: '0.875rem', marginTop: '0.25rem' }}>{task.description}</p>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{task.priority}</span>
          <span className={`badge ${getStatusBadgeClass(task.status)}`}>{task.status}</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          {task.dueDate ? `Due: ${new Date(task.dueDate).toLocaleDateString()}` : 'No due date'}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {task.status !== 'Done' && (
            <button onClick={markComplete} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--success-color)', color: 'var(--success-color)', background: 'transparent', cursor: 'pointer' }}>
              <FiCheckCircle /> Complete
            </button>
          )}
          <button onClick={() => onDelete(task._id)} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', background: 'transparent', cursor: 'pointer' }}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default TaskItem;
