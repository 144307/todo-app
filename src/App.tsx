import "./App.css";
import { useState, useCallback, useMemo } from "react";
import type { Todo, FilterType } from "./types";
import TodoItem from "./components/TodoItem/TodoItem";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Features from "./components/Features/Features";

function App() {
  const [showHints, setShowHints] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, []);

  const editTodo = useCallback((id: string, text: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: text.trim() } : todo
      )
    );
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="app">
      <div className="window">
        <h1 className="heading">todos</h1>
        <div className="todoapp">
          <Header
            setTodos={setTodos}
            newTodo={newTodo}
            setNewTodo={setNewTodo}
          ></Header>
          {todos.length > 0 && (
            <section className="main">
              <ul className="todo-list">
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onEdit={editTodo}
                  />
                ))}
              </ul>
            </section>
          )}
          <Footer
            todos={todos}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={clearCompleted}
          ></Footer>
        </div>
      </div>
      <Features
        showHints={showHints}
        toggleHints={() => {
          setShowHints(!showHints);
        }}
      ></Features>
    </div>
  );
}

export default App;
