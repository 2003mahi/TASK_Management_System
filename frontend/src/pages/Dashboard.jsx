import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import { FiPieChart, FiList, FiCheckCircle, FiClock, FiSearch } from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const fetchTasks = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      let url = '/api/tasks';
      if (search) url += `?search=${search}`;
      
      const res = await axios.get(url, config);
      setTasks(res.data.tasks);
      setStats(res.data.stats);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchTasks();
    }
  }, [user, navigate, search]); // Re-fetch on search change

  const addTask = async (taskData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/api/tasks', taskData, config);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/tasks/${id}`, config);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, updatedData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/tasks/${id}`, updatedData, config);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  // derived filtered tasks
  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  if (loading) return <div style={{ textAlign: 'center', marginTop: '3rem' }}>Loading Dashboard...</div>;

  return (
    <div className="fade-in">
      {/* Analytics Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--primary-color)' }}>
            <FiList size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stats.total}</h2>
            <p style={{ margin: '0', fontSize: '0.875rem' }}>Total Tasks</p>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--success-color)' }}>
            <FiCheckCircle size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stats.completed}</h2>
            <p style={{ margin: '0', fontSize: '0.875rem' }}>Completed</p>
          </div>
        </div>
        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '1rem', borderRadius: '12px', color: 'var(--warning-color)' }}>
            <FiClock size={28} />
          </div>
          <div>
            <h2 style={{ fontSize: '2rem', margin: '0' }}>{stats.pending}</h2>
            <p style={{ margin: '0', fontSize: '0.875rem' }}>Pending</p>
          </div>
        </div>
      </div>

      <TaskForm onAdd={addTask} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h3 style={{ margin: 0 }}>Your Tasks</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <FiSearch style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Search by title..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              style={{ paddingLeft: '2.5rem', width: '250px' }}
            />
          </div>
          <select 
            className="form-control" 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            style={{ width: 'auto' }}
          >
            <option value="All">All Statuses</option>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-secondary)' }}>
          <FiPieChart size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
          <h3>No tasks found</h3>
          <p>Create a task above to get started!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {filteredTasks.map(task => (
            <TaskItem key={task._id} task={task} onDelete={deleteTask} onUpdate={updateTask} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
