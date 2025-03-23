import { render, screen } from "@testing-library/react";
import TodosList from "../index";
import * as todosProvider from "../../../providers/todos";

describe("TodosList Component", () => {
  const mockTodos = [
    { id: 1, userId: 1, title: "Todo 1", completed: true },
    { id: 2, userId: 1, title: "Todo 2", completed: false },
  ];

  const stateSpy = jest.spyOn(todosProvider, "useTodosState");

  const setup = () => {
    return render(<TodosList />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render nothing if there are no todos", () => {
    stateSpy.mockReturnValue({ todos: [] });
    const { container } = setup();
    expect(container.firstChild).toBeNull();
  });

  it("should render a table with todos if todos exist", () => {
    stateSpy.mockReturnValue({ todos: mockTodos });
    setup();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Todo 2")).toBeInTheDocument();
  });

  it("should display 'Completed' for completed todos", () => {
    stateSpy.mockReturnValue({ todos: mockTodos });
    setup();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  it("should display 'Pending' for incomplete todos", () => {
    stateSpy.mockReturnValue({ todos: mockTodos });
    setup();
    expect(screen.getByText("Pending")).toBeInTheDocument();
  });

  it("should render '-' for missing todo fields", () => {
    const incompleteTodos = [{}];
    stateSpy.mockReturnValue({ todos: incompleteTodos });
    setup();

    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(2); // 1 header row + 1 data row

    const cells = rows[1].querySelectorAll("td");
    expect(cells[0]).toHaveTextContent("-"); // ID column
    expect(cells[1]).toHaveTextContent("-"); // Title column
    expect(cells[2]).toHaveTextContent("Pending"); // Status column
  });
});
