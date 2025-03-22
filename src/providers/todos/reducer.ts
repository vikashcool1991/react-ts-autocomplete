import { ITodosAction, ITodosState } from "../../interfaces";
import { SET_FETCH_TODOS, SET_TODOS } from "./constants";

export const reducer = (state: ITodosState, action: ITodosAction) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        ...state,
        todos: action.todos,
        shouldFetch: false,
        searchText: "",
      };
    case SET_FETCH_TODOS:
      return {
        ...state,
        shouldFetch: action.shouldFetch,
        searchText: action.searchText,
      };
    default:
      return state;
  }
};
