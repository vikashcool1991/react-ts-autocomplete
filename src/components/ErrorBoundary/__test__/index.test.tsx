import { render, screen } from "@testing-library/react";
import ErrorBoundary from "../index";
import { ERROR_BOUNDARY_MESSAGE } from "../../../constants/autocomplete";

describe("ErrorBoundary Component", () => {
  const ProblematicComponent = () => {
    throw new Error("Test error");
  };

  it("should render children when no error occurs", () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText("Child Component")).toBeInTheDocument();
  });

  it("should render fallback UI when an error occurs", () => {
    jest.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(ERROR_BOUNDARY_MESSAGE)).toBeInTheDocument();

    (console.error as jest.Mock).mockRestore(); // Restore console.error
  });

  it("should log the error to the console", () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledTimes(4);

    consoleErrorSpy.mockRestore();
  });
});
