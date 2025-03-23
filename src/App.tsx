import "./App.css";
import AutoComplete from "./components/Autocomplete";
import TodosList from "./components/TodosList";
import { AUTO_COMPLETE_HEADING } from "./constants/autocomplete";
import TodosProvider from "./providers/todos";

function App() {
  return (
    <TodosProvider>
      <main className="app" role="main">
        <h1>{AUTO_COMPLETE_HEADING}</h1>
        <AutoComplete />
        <div aria-live="polite">
          <TodosList />
        </div>
      </main>
    </TodosProvider>
  );
}

export default App;
