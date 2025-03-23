import { renderHook, act } from "@testing-library/react";
import useQuery from "../useQuery";

describe("useQuery", () => {
  const mockQueryFn = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data successfully when enabled", async () => {
    const mockData = { id: 1, name: "Test" };
    mockQueryFn.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useQuery(mockQueryFn, [], { enabled: true })
    );

    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(undefined);
    expect(result.current.error).toBeNull();
    expect(result.current.isFetching).toBe(false);
    expect(mockQueryFn).toHaveBeenCalledTimes(2);
  });

  it("should handle errors during data fetching", async () => {
    const mockError = new Error("Failed to fetch");
    mockQueryFn.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() =>
      useQuery(mockQueryFn, [], { enabled: true })
    );

    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(undefined);
    expect(result.current.error).toEqual(mockError);
    expect(result.current.isFetching).toBe(false);
    expect(mockQueryFn).toHaveBeenCalledTimes(2);
  });

  it("should not fetch data when disabled", async () => {
    const { result } = renderHook(() =>
      useQuery(mockQueryFn, [], { enabled: false })
    );

    expect(result.current.isFetching).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(mockQueryFn).toHaveBeenCalledTimes(0);
  });

  it("should refetch data when dependencies change", async () => {
    const mockData1 = { id: 1, name: "Test 1" };
    const mockData2 = { id: 2, name: "Test 2" };
    mockQueryFn
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);

    let dependencies = [1];
    const { result, rerender } = renderHook(() =>
      useQuery(mockQueryFn, dependencies, { enabled: true })
    );

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(mockData2);

    dependencies = [2];
    rerender();

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(undefined);
    expect(mockQueryFn).toHaveBeenCalledTimes(4);
  });

  it("should refetch data when dependencies undefined", async () => {
    const mockData = { id: 1, name: "Test" };
    mockQueryFn.mockResolvedValueOnce(mockData);

    const { result } = renderHook(() =>
      useQuery(mockQueryFn, undefined, { enabled: true })
    );

    expect(result.current.isFetching).toBe(true);

    await act(async () => {
      await result.current.refetch();
    });

    expect(result.current.data).toEqual(undefined);
    expect(result.current.error).toBeNull();
    expect(result.current.isFetching).toBe(false);
    expect(mockQueryFn).toHaveBeenCalledTimes(2);
  });
});
