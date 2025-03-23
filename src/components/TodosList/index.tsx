import "./styles.css";
import { useTodosState } from "../../providers/todos";
import { ITodo } from "../../interfaces";
import { memo } from "react";

const TodosList = () => {
  const todosState = useTodosState();
  const todos = todosState?.todos ?? [];
  if (!todos.length) {
    return <p role="alert">No todos available.</p>;
  }
  return (
    <table role="table" aria-label="List of todos">
      <caption>List of Todos</caption>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo: ITodo, index) => {
          const { id, title, completed } = todo ?? {};
          return (
            <tr key={id || index} tabIndex={0}>
              <td scope="row">{id || "-"}</td>
              <td>{title || "-"}</td>
              <td>{completed ? "Completed" : "Pending"}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default memo(TodosList);
