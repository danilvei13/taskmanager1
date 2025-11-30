import { useState } from 'react';

function TagManager({ tags, onAddTag, onRemoveTag }) {
    const [newTag, setNewTag] = useState('');

    const addTag = () => {
        const tag = newTag.trim();
        if (tag && !tags.includes(tag)) {
            onAddTag(tag);
            setNewTag('');
        }
    };

    return (
        <div className="tag-manager">
            <div className="tag-input-group">
                <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    placeholder="Добавить тег..."
                    className="tag-input"
                />
                <button onClick={addTag} className="tag-add-btn">➕</button>
            </div>

            {tags.length > 0 && (
                <div className="tag-list">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className="tag-item"
                            onClick={() => onRemoveTag(tag)}
                        >
              {tag} ✕
            </span>
                    ))}
                </div>
            )}
        </div>
    );
}

export default TagManager;