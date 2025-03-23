import fetchSafe from "../fetchSafe";

describe("fetchSafe", () => {
  it("should return data when the function resolves successfully", async () => {
    const mockFn = jest.fn().mockResolvedValue("test data");
    const result = await fetchSafe(mockFn);

    expect(result).toEqual({ data: "test data", error: null });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it("should return an error when the function rejects", async () => {
    const mockError = new Error("test error");
    const mockFn = jest.fn().mockRejectedValue(mockError);
    const result = await fetchSafe(mockFn);

    expect(result).toEqual({ data: null, error: mockError });
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
