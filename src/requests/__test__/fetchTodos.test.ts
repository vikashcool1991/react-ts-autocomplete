import fetchTodos from "../fetchTodos";
import { FETCH_TODOS_ERROR, FETCH_TODOS_URL } from "../../constants/requests";

describe("fetchTodos", () => {
  global.fetch = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch todos and return filtered results", async () => {
    const mockResponse = [
      { id: 1, title: "Todo 1" },
      { id: 2, title: "Todo 2" },
    ];
    const filteredTodos = [{ id: 1, title: "Todo 1" }];
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });
    const result = await fetchTodos("Todo 1");
    expect(global.fetch).toHaveBeenCalledWith(FETCH_TODOS_URL);
    expect(result).toEqual({ data: filteredTodos, error: null });
  });

  it("should throw an error if the fetch response is not ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    } as any);

    const result = await fetchTodos("Todo 1");
    expect(global.fetch).toHaveBeenCalledWith(FETCH_TODOS_URL);
    expect(result).toEqual({ data: null, error: new Error(FETCH_TODOS_ERROR) });
  });
});
