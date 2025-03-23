import fetchTodoSuggestions from "../fetchTodoSuggestions";
import { FETCH_TODOS_ERROR, FETCH_TODOS_URL } from "../../constants/requests";

describe("fetchTodoSuggestions", () => {
  const mockSearchText = "test";
  const mockResponseData = [{ id: 1, title: "Test Todo" }];
  const expectedResult = ["Test Todo"];

  global.fetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch data and return filtered suggestions", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockResponseData),
    });

    const fetchSuggestions = fetchTodoSuggestions(mockSearchText);
    const result = await fetchSuggestions();

    expect(global.fetch).toHaveBeenCalledWith(FETCH_TODOS_URL);
    expect(result).toEqual(expectedResult);
  });

  it("should throw an error if the fetch response is not ok", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    const fetchSuggestions = fetchTodoSuggestions(mockSearchText);

    await expect(fetchSuggestions()).rejects.toThrow(FETCH_TODOS_ERROR);
    expect(fetch).toHaveBeenCalledWith(FETCH_TODOS_URL);
  });
});
