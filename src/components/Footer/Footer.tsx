import { useMemo } from "react";
import type { FilterType, Todo } from "../../types";
import "./Footer.css";

interface Props {
  todos: Todo[];
  filter: FilterType;
  setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
  clearCompleted: () => void;
}

function Footer({
  todos: todos,
  filter: filter,
  setFilter: setFilter,
  clearCompleted: clearCompleted,
}: Props) {
  const activeTodoCount = useMemo(
    () => todos.filter((todo: Todo) => !todo.completed).length,
    [todos]
  );

  const completedCount = useMemo(
    () => todos.filter((todo: Todo) => todo.completed).length,
    [todos]
  );

  return (
    <>
      {todos.length > 0 && (
        <footer className="footer">
          <div className="todo-count">
            <strong>{activeTodoCount}</strong> item
            {activeTodoCount !== 1 ? "s" : ""} left
          </div>

          <ul className="filters">
            <li>
              <button
                className={`button ${filter === "all" ? "selected" : ""}`}
                onClick={() => setFilter("all")}
              >
                All
              </button>
            </li>
            <li>
              <button
                className={`button ${filter === "active" ? "selected" : ""}`}
                onClick={() => setFilter("active")}
              >
                Active
              </button>
            </li>
            <li>
              <button
                className={`button ${filter === "completed" ? "selected" : ""}`}
                onClick={() => setFilter("completed")}
              >
                Completed
              </button>
            </li>
          </ul>

          <button
            className={`button clear-completed `}
            onClick={clearCompleted}
            disabled={!(completedCount > 0)}
          >
            Clear completed
          </button>
        </footer>
      )}
    </>
  );
}

export default Footer;
