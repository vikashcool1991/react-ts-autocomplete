import { ITodosAction, ITodo } from "../../interfaces";
import { SET_FETCH_TODOS, SET_TODOS } from "./constants";

export const setTodos = (todos: ITodo[]): ITodosAction => ({
  type: SET_TODOS,
  todos,
});

export const setFetchTodos = (
  searchText: string,
  shouldFetch: boolean
): ITodosAction => ({
  type: SET_FETCH_TODOS,
  shouldFetch,
  searchText,
});
