import { render, screen } from "@testing-library/react";
import InputSearch from "../index";
import userEvent from "@testing-library/user-event";

describe("InputSearch Component", () => {
  const mockOnChange = jest.fn();
  const mockOnClear = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnEnter = jest.fn();
  const setup = (value: string = "") =>
    render(
      <InputSearch
        value={value}
        onChange={mockOnChange}
        onClear={mockOnClear}
        onFocus={mockOnFocus}
        onEnter={mockOnEnter}
        placeholder="Search..."
      />
    );

  it("should render the SearchIcon", () => {
    setup();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
  });

  it("should render the input with the correct placeholder", () => {
    setup();
    const input = screen.getByPlaceholderText("Search...");
    expect(input).toBeInTheDocument();
  });

  it("should call onChange when typing in the input", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "test");
    expect(mockOnChange).toHaveBeenCalledTimes(4); // "test" has 4 characters
  });

  it("should render the CancelIcon when there is a value", () => {
    setup("test");
    expect(screen.getByTestId("cancel-icon")).toBeInTheDocument();
  });

  it("should not render the CancelIcon when there is no value", () => {
    setup();
    expect(screen.queryByTestId("cancel-icon")).not.toBeInTheDocument();
  });

  it("should call onClear when clicking the CancelIcon", async () => {
    setup("test");
    const cancelIcon = screen.getByTestId("cancel-icon");
    await userEvent.click(cancelIcon);
    expect(mockOnClear).toHaveBeenCalled();
  });

  it("should call onFocus when the input is focused", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.click(input);
    expect(mockOnFocus).toHaveBeenCalled();
  });

  it("should call onEnter when pressing Enter key", async () => {
    setup();
    const input = screen.getByPlaceholderText("Search...");
    await userEvent.type(input, "{enter}");
    expect(mockOnEnter).toHaveBeenCalled();
  });
});
