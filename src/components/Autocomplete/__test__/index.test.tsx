import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AutoComplete from "../index";
import * as todosProvider from "../../../providers/todos";
import useQuery from "../../../hooks/useQuery";
import { setFetchTodos } from "../../../providers/todos/actions";
import { SUGGESTIONS_ERROR } from "../../../constants/autocomplete";

jest.mock("../../../hooks/useQuery");
jest.mock("../../../providers/todos", () => ({
  useTodosDispatch: jest.fn(),
}));
jest.mock("../../../requests/fetchTodoSuggestions");

describe("AutoComplete Component", () => {
  const mockDispatch = jest.fn();
  const mockSuggestions = ["Todo 1", "Todo 2", "Todo 3"];

  beforeEach(() => {
    (todosProvider.useTodosDispatch as jest.Mock).mockReturnValue(mockDispatch);
    (useQuery as jest.Mock).mockReturnValue({
      data: mockSuggestions,
      isFetching: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the input field with placeholder", () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    expect(input).toBeInTheDocument();
  });

  it("should update input value on user typing", () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Test" } });
    expect(input).toHaveValue("Test");
  });

  it("should show suggestions when input value changes", async () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Todo" } });

    await waitFor(() => {
      const suggestionsList = screen.getByRole("listbox");
      expect(suggestionsList).toBeInTheDocument();
    });
  });

  it("should hide suggestions when clicking outside", () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Todo" } });

    fireEvent.click(document.body); // Simulate clicking outside
    expect(screen.queryByText("Todo 1")).not.toBeInTheDocument();
  });

  it("should clear input value when clear button is clicked", () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Todo" } });

    const clearButton = screen.getByTestId("cancel-icon");
    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
  });

  it("should dispatch action on Enter key press", () => {
    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Todo" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(mockDispatch).toHaveBeenCalledWith(setFetchTodos("Todo", true));
  });

  it("should handle API errors gracefully", () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: "Error fetching suggestions",
    });

    render(<AutoComplete />);
    const input = screen.getByPlaceholderText("Search todos...");
    fireEvent.change(input, { target: { value: "Todo" } });

    expect(screen.getByText(SUGGESTIONS_ERROR)).toBeInTheDocument();
  });
});
