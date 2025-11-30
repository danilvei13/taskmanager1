import { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import TagManager from './components/TagManager';

function App() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [newTags, setNewTags] = useState([]);
    const [search, setSearch] = useState('');
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('simple-tasks');
        if (saved) setTasks(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem('simple-tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([{
                id: Date.now(),
                text: newTask.trim(),
                tags: [...newTags],
                done: false,
                deadline: null
            }, ...tasks]);
            setNewTask('');
            setNewTags([]);
        }
    };

    const updateTask = (id, changes) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, ...changes } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const filteredTasks = tasks.filter(task =>
        task.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className={dark ? 'dark' : ''}>
            <div className="app">
                <div className="header">
                    <h1>📝 Задачи</h1>
                    <button className="theme-btn" onClick={() => setDark(!dark)}>
                        {dark ? '☀️' : '🌙'}
                    </button>
                </div>

                <input
                    className="search"
                    placeholder="🔍 Поиск задач..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div className="add-section">
                    <input
                        className="task-input"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTask()}
                        placeholder="Новая задача..."
                    />
                    <TagManager
                        tags={newTags}
                        onAddTag={(tag) => !newTags.includes(tag) && setNewTags([...newTags, tag])}
                        onRemoveTag={(tag) => setNewTags(newTags.filter(t => t !== tag))}
                    />
                    <button className="add-btn" onClick={addTask}>➕ Добавить</button>
                </div>

                <div className="tasks-list">
                    {filteredTasks.length === 0 ? (
                        <div className="empty">
                            <p>📭 Нет задач</p>
                            <small>Добавьте первую задачу!</small>
                        </div>
                    ) : (
                        filteredTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onUpdate={updateTask}
                                onDelete={deleteTask}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;