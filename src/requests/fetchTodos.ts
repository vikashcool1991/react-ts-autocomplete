import { FETCH_TODOS_ERROR, FETCH_TODOS_URL } from "../constants/requests";
import { ITodo } from "../interfaces";
import fetchSafe from "../utils/fetchSafe";
import { getFilteredTodos } from "../utils/filterTodos";

const fetchTodos = async (searchText: string): Promise<ITodo[]> => {
  const response = await fetch(FETCH_TODOS_URL);
  if (!response.ok) throw new Error(FETCH_TODOS_ERROR);
  const data = await response.json();
  const todos = getFilteredTodos(data, searchText);
  return todos;
};

export default (searchText: string) => fetchSafe(() => fetchTodos(searchText));
