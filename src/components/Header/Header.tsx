import { useCallback, useRef, useState } from "react";
import "./Header.css";
import type { Todo } from "../../types";

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
}

function Header({
  setTodos: setTodos,
  newTodo: newTodo,
  setNewTodo: setNewTodo,
}: Props) {
  const difficultyRef = useRef<number>(0);
  // const [difficulty, setDifficulty] = useState(0);
  const [hover, setHover] = useState(0);

  const addTodo = useCallback(
    (text: string) => {
      if (text.trim()) {
        const newTodoItem: Todo = {
          id: Date.now().toString(),
          text: text.trim(),
          completed: false,
          difficulty: difficultyRef.current,
        };
        difficultyRef.current = 0;
        // setDifficulty(0);
        setTodos((prev) => [...prev, newTodoItem]);
        setNewTodo("");
      }
    },
    [setNewTodo, setTodos]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(newTodo);
  };

  return (
    <header className="header">
      <form className="form" onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          autoFocus
        />
        <div className="difficulty">
          {[1, 2, 3].map((e: number) => {
            return (
              <label
                key={`radio-${e}`}
                className="radio-label"
                htmlFor={`radio-${e}`}
                onMouseOver={() => {
                  setHover(e);
                }}
                onMouseLeave={() => {
                  setHover(0);
                }}
              >
                <input
                  id={`radio-${e}`}
                  type="radio"
                  className={`difficulty-level ${
                    hover > 0
                      ? hover >= e
                        ? hover === 1
                          ? "easy"
                          : hover <= 2
                          ? "medium"
                          : hover <= 3
                          ? "hard"
                          : ""
                        : ""
                      : difficultyRef.current >= e
                      ? difficultyRef.current === 1
                        ? "easy"
                        : difficultyRef.current <= 2
                        ? "medium"
                        : difficultyRef.current <= 3
                        ? "hard"
                        : ""
                      : ""
                  } ${
                    hover > 0 && difficultyRef.current === e && hover === e
                      ? "crossed"
                      : ""
                  }`}
                  onClick={() => {
                    if (difficultyRef.current !== e) {
                      difficultyRef.current = e;
                      setHover(e);
                    } else {
                      difficultyRef.current = 0;
                    }
                  }}
                />
              </label>
            );
          })}
        </div>
      </form>
    </header>
  );
}

export default Header;
