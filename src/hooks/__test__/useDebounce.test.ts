import { renderHook, act } from "@testing-library/react";
import useDebounce from "../useDebounce";

jest.useFakeTimers();
jest.spyOn(global, "clearTimeout");

describe("useDebounce", () => {
  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current).toBe("test");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Initial value
    expect(result.current).toBe("initial");

    // Update value
    rerender({ value: "updated", delay: 500 });

    // Value should not change immediately
    expect(result.current).toBe("initial");

    // Fast-forward time
    act(() => {
      jest.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe("updated");
  });

  it("should clear the timeout on unmount", () => {
    const { unmount } = renderHook(() => useDebounce("test", 500));

    unmount();

    // Ensure no pending timers
    expect(clearTimeout).toHaveBeenCalledTimes(4);
  });
});
