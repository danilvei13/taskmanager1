import { useState } from 'react';

function TaskItem({ task, onUpdate, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    // ПРОСТАЯ ПРОВЕРКА ПРОСРОЧКИ БЕЗ date-fns
    const isOverdue = task.deadline && new Date(task.deadline) < new Date() && !task.done;

    const saveEdit = () => {
        if (editText.trim()) {
            onUpdate(task.id, { text: editText.trim() });
        }
        setEditing(false);
    };

    // ПРОСТОЙ ФОРМАТ ДАТЫ
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit'
        });
    };

    return (
        <div className={`task-item ${task.done ? 'done' : ''} ${isOverdue ? 'overdue' : ''}`}>
            <input
                type="checkbox"
                checked={task.done}
                onChange={() => onUpdate(task.id, { done: !task.done })}
                className="checkbox"
            />

            <div className="task-content">
                {editing ? (
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={saveEdit}
                        onKeyPress={(e) => e.key === 'Enter' && saveEdit()}
                        className="edit-input"
                        autoFocus
                    />
                ) : (
                    <span
                        className="task-text"
                        onDoubleClick={() => setEditing(true)}
                    >
            {task.text}
          </span>
                )}

                {task.tags && task.tags.length > 0 && (
                    <div className="tags">
                        {task.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}

                {task.deadline && (
                    <div className="deadline">
                        📅 {formatDate(task.deadline)}
                    </div>
                )}
            </div>

            <div className="task-actions">
                {!task.deadline && (
                    <button
                        className="deadline-btn"
                        onClick={() => {
                            const date = prompt('Дедлайн (YYYY-MM-DD):');
                            if (date) onUpdate(task.id, { deadline: date });
                        }}
                        title="Добавить дедлайн"
                    >
                        📅
                    </button>
                )}
                <button
                    className="delete-btn"
                    onClick={() => onDelete(task.id)}
                    title="Удалить"
                >
                    🗑️
                </button>
            </div>

            {isOverdue && <span className="overdue-badge">⏰ ПРОСРОЧЕНО</span>}
        </div>
    );
}

export default TaskItem;