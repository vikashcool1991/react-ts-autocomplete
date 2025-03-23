import { getFilteredTodos } from "../filterTodos";
import { ITodo } from "../../interfaces";

describe("getFilteredTodos", () => {
  const todos: ITodo[] = [
    { id: 1, title: "Buy groceries" },
    { id: 2, title: "Read a book" },
    { id: 3, title: "Write TypeScript code" },
  ];

  it("should return all todos when searchText is an empty string", () => {
    const result = getFilteredTodos(todos, "");
    expect(result).toEqual(todos);
  });

  it("should return filtered todos based on searchText", () => {
    const result = getFilteredTodos(todos, "book");
    expect(result).toEqual([{ id: 2, title: "Read a book" }]);
  });

  it("should return an empty array if no todos match the searchText", () => {
    const result = getFilteredTodos(todos, "nonexistent");
    expect(result).toEqual([]);
  });

  it("should perform a case-insensitive search", () => {
    const result = getFilteredTodos(todos, "BUY");
    expect(result).toEqual([{ id: 1, title: "Buy groceries" }]);
  });

  it("should handle todos with undefined or empty titles gracefully", () => {
    const todosWithEmptyTitles: ITodo[] = [
      { id: 1, title: "Buy groceries" },
      { id: 2, title: "" },
      { id: 3, title: undefined },
    ];
    const result = getFilteredTodos(todosWithEmptyTitles, "groceries");
    expect(result).toEqual([{ id: 1, title: "Buy groceries" }]);
  });
});
