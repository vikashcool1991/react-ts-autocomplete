import { render, screen, fireEvent } from "@testing-library/react";
import SuggestionsList from "../SuggestionsList";
import { LOADING, NO_TODOS_FOUND, SUGGESTIONS_ERROR } from "../../../constants/autocomplete";

describe("SuggestionsList Component", () => {
  const mockOnSuggestionSelect = jest.fn();

  const defaultProps = {
    isFetching: false,
    suggestions: [],
    showSuggestions: false,
    onSuggestionSelect: mockOnSuggestionSelect,
    inputValue: "",
    error: new Error(""),
  };

  it("renders loading state when isFetching is true", () => {
    render(<SuggestionsList {...defaultProps} isFetching={true} />);
    expect(screen.getByText(LOADING)).toBeInTheDocument();
  });

  it("renders 'No Todos Found' when there are no suggestions and no error", () => {
    render(
      <SuggestionsList
        {...defaultProps}
        showSuggestions={true}
        suggestions={[]}
        error={null}
      />
    );
    expect(screen.getByText(NO_TODOS_FOUND)).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveClass("emptySuggestions");
  });

  it("renders error message when there are no suggestions and error is true", () => {
    render(
      <SuggestionsList
        {...defaultProps}
        showSuggestions={true}
        suggestions={[]}
        error={new Error("An error occurred")}
      />
    );
    expect(screen.getByText(SUGGESTIONS_ERROR)).toBeInTheDocument();
    expect(screen.getByRole("listitem")).toHaveClass("emptySuggestions");
  });

  it("renders suggestions when suggestions are provided", () => {
    const suggestions = ["Task 1", "Task 2"];
    render(
      <SuggestionsList
        {...defaultProps}
        showSuggestions={true}
        suggestions={suggestions}
        inputValue="Task"
      />
    );
    const suggestionItems = screen.getAllByRole("listitem");
    expect(suggestionItems).toHaveLength(suggestions.length);
    expect(suggestionItems[0]).toHaveTextContent("Task 1");
    expect(suggestionItems[1]).toHaveTextContent("Task 2");
  });

  it("calls onSuggestionSelect when a suggestion is clicked", () => {
    const suggestions = ["Task 1"];
    render(
      <SuggestionsList
        {...defaultProps}
        showSuggestions={true}
        suggestions={suggestions}
      />
    );
    const suggestionItem = screen.getByText("Task 1");
    fireEvent.click(suggestionItem);
    expect(mockOnSuggestionSelect).toHaveBeenCalledWith(
      expect.anything(),
      "Task 1"
    );
  });

  it("highlights inputValue in suggestions", () => {
    const suggestions = ["Task 1"];
    render(
      <SuggestionsList
        {...defaultProps}
        showSuggestions={true}
        suggestions={suggestions}
        inputValue="Task"
      />
    );
    const highlightedText = screen.getByText("Task", { exact: false });
    expect(highlightedText).toHaveClass("highlight");
  });
});
