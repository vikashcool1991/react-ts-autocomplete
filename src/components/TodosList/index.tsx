import "./styles.css";
import { useTodosState } from "../../providers/todos";
import { ITodo } from "../../interfaces";
import { memo } from "react";

const TodosList = () => {
  const todosState = useTodosState();
  const todos = todosState?.todos ?? [];
  if (!todos.length) {
    return null;
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo: ITodo) => (
            <tr key={todo.id}>
              <td>{todo.id || "-"}</td>
              <td>{todo.title || "-"}</td>
              <td>{todo.completed ? "Completed" : "Pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default memo(TodosList);
