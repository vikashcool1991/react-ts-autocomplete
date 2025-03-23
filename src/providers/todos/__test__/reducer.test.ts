import { reducer } from "../reducer";
import { SET_FETCH_TODOS, SET_TODOS } from "../constants";
import { ITodosState, ITodosAction } from "../../../interfaces";

describe("reducer", () => {
  it("should handle SET_TODOS action", () => {
    const initialState: ITodosState = {
      todos: [],
      shouldFetch: true,
      searchText: "initial",
    };

    const action: ITodosAction = {
      type: SET_TODOS,
      todos: [{ id: 1, title: "Test Todo" }],
    };

    const expectedState: ITodosState = {
      todos: [{ id: 1, title: "Test Todo" }],
      shouldFetch: false,
      searchText: "",
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should handle SET_FETCH_TODOS action", () => {
    const initialState: ITodosState = {
      todos: [],
      shouldFetch: false,
      searchText: "",
    };

    const action: ITodosAction = {
      type: SET_FETCH_TODOS,
      shouldFetch: true,
      searchText: "new search",
    };

    const expectedState: ITodosState = {
      todos: [],
      shouldFetch: true,
      searchText: "new search",
    };

    const newState = reducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it("should return the current state for unknown action types", () => {
    const initialState: ITodosState = {
      todos: [],
      shouldFetch: false,
      searchText: "",
    };

    const action: ITodosAction = {
      type: "UNKNOWN_ACTION",
    } as ITodosAction;

    const newState = reducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});
