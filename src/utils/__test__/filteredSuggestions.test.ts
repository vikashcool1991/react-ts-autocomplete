import { getFilteredSuggestions } from "../filteredSuggestions";
import { ITodo } from "../../interfaces";

describe("getFilteredSuggestions", () => {
  it("should return an empty array when suggestions are empty", () => {
    const suggestions: ITodo[] = [];
    const searchText = "test";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual([]);
  });

  it("should return an empty array when no suggestions match the search text", () => {
    const suggestions: ITodo[] = [
      { title: "Buy milk" },
      { title: "Walk the dog" },
      { title: "Read a book" },
    ];
    const searchText = "test";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual([]);
  });

  it("should return matching suggestions when search text matches", () => {
    const suggestions: ITodo[] = [
      { title: "Buy milk" },
      { title: "Walk the dog" },
      { title: "Read a book" },
    ];
    const searchText = "milk";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual(["Buy milk"]);
  });

  it("should be case-insensitive when matching suggestions", () => {
    const suggestions: ITodo[] = [
      { title: "Buy milk" },
      { title: "Walk the dog" },
      { title: "Read a book" },
    ];
    const searchText = "MILK";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual(["Buy milk"]);
  });

  it("should return multiple matching suggestions if applicable", () => {
    const suggestions: ITodo[] = [
      { title: "Buy milk" },
      { title: "Milk the cow" },
      { title: "Walk the dog" },
    ];
    const searchText = "milk";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual(["Buy milk", "Milk the cow"]);
  });

  it("should handle suggestions with undefined or empty titles", () => {
    const suggestions: ITodo[] = [
      { title: "Buy milk" },
      { title: undefined },
      { title: "" },
    ];
    const searchText = "milk";
    const result = getFilteredSuggestions(suggestions, searchText);
    expect(result).toEqual(["Buy milk"]);
  });
});
