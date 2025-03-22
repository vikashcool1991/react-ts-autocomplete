import { ITodo } from "../interfaces";

export const getFilteredTodos = (
  todos: ITodo[],
  searchText: string
): ITodo[] => {
  return todos.filter(({ title = "" }: ITodo) =>
    title.toLowerCase().includes(searchText.toLowerCase())
  );
};
