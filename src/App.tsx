import "./App.css";
import AutoComplete from "./components/Autocomplete";
import TodosList from "./components/TodosList";
import TodosProvider from "./providers/todos";

function App() {
  return (
    <TodosProvider>
      <div className="app">
        <h1>React TS Autocomplete</h1>
        <AutoComplete />
        <TodosList />
      </div>
    </TodosProvider>
  );
}

export default App;
