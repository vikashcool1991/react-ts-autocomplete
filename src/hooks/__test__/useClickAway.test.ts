import { renderHook } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import useClickAway from "../useClickAway";

describe("useClickAway", () => {
  it("should call the callback when clicking outside the referenced element", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickAway<HTMLDivElement>(callback));

    // Create a mock element to act as the referenced element
    const refElement = document.createElement("div");
    result.current.current = refElement;

    // Append the element to the document body
    document.body.appendChild(refElement);

    // Simulate a click outside the referenced element
    fireEvent.mouseDown(document.body);

    expect(callback).toHaveBeenCalled();

    // Clean up
    document.body.removeChild(refElement);
  });

  it("should not call the callback when clicking inside the referenced element", () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useClickAway<HTMLDivElement>(callback));

    // Create a mock element to act as the referenced element
    const refElement = document.createElement("div");
    result.current.current = refElement;

    // Append the element to the document body
    document.body.appendChild(refElement);

    // Simulate a click inside the referenced element
    fireEvent.mouseDown(refElement);

    expect(callback).not.toHaveBeenCalled();

    // Clean up
    document.body.removeChild(refElement);
  });

  it("should clean up event listeners on unmount", () => {
    const callback = jest.fn();
    const { result, unmount } = renderHook(() =>
      useClickAway<HTMLDivElement>(callback)
    );

    // Create a mock element to act as the referenced element
    const refElement = document.createElement("div");
    result.current.current = refElement;

    // Append the element to the document body
    document.body.appendChild(refElement);

    // Unmount the hook
    unmount();

    // Simulate a click outside the referenced element
    fireEvent.mouseDown(document.body);

    expect(callback).not.toHaveBeenCalled();

    // Clean up
    document.body.removeChild(refElement);
  });
});
