import { setTodos, setFetchTodos } from "../actions";
import { SET_TODOS, SET_FETCH_TODOS } from "../constants";
import { ITodo } from "../../../interfaces";

describe("Todos Actions", () => {
  it("should create an action to set todos", () => {
    const todos: ITodo[] = [
      { id: 1, title: "Test Todo 1", completed: false },
      { id: 2, title: "Test Todo 2", completed: true },
    ];
    const expectedAction = {
      type: SET_TODOS,
      todos,
    };

    expect(setTodos(todos)).toEqual(expectedAction);
  });

  it("should create an action to set fetch todos", () => {
    const searchText = "test";
    const shouldFetch = true;
    const expectedAction = {
      type: SET_FETCH_TODOS,
      searchText,
      shouldFetch,
    };

    expect(setFetchTodos(searchText, shouldFetch)).toEqual(expectedAction);
  });
});
