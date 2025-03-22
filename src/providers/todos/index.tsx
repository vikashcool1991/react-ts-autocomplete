import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { reducer } from "./reducer";
import {
  ITodosAction,
  ITodosProviderProps,
  ITodosState,
} from "../../interfaces";
import fetchTodosSafe from "../../requests/fetchTodos";
import { setTodos } from "./actions";

const TodosStateContext = createContext<ITodosState | null>(null);
const TodosDispatchContext = createContext<Dispatch<ITodosAction> | null>(null);

export const useTodosState = () => useContext(TodosStateContext);
export const useTodosDispatch = () => useContext(TodosDispatchContext);

const initialState: ITodosState = {
  todos: [],
};

const TodosProvider = ({ children }: ITodosProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { shouldFetch, searchText } = state;

  async function fetchTodos() {
    const { data, error } = await fetchTodosSafe(searchText || "");
    if (data) {
      dispatch(setTodos(data));
    }
    if (error) {
      dispatch(setTodos([]));
    }
  }
  useEffect(() => {
    if (shouldFetch) {
      fetchTodos();
    }
  }, [shouldFetch]);

  return (
    <TodosStateContext.Provider value={state}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
};

export default TodosProvider;
