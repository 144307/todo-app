import "./TodoItem.css";
import { useState } from "react";
import type { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(todo.text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText);
      setIsEditing(false);
    } else {
      onDelete(todo.id);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      handleCancel();
    }
  };

  return (
    <li
      className={`todo-item ${todo.completed ? "completed" : ""} ${
        isEditing ? "editing" : ""
      }`}
    >
      <div
        className={`view ${
          todo.difficulty === 1
            ? "green-highlight"
            : todo.difficulty === 2
            ? "yellow-highlight"
            : todo.difficulty === 3
            ? "red-highlight"
            : ""
        }`}
      >
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
        {!isEditing && (
          <label onDoubleClick={handleEdit} className="label">
            {todo.text}
          </label>
        )}
        {isEditing && (
          <input
            className="edit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        )}
        <button className="destroy" onClick={() => onDelete(todo.id)} />
      </div>
    </li>
  );
}

export default TodoItem;
