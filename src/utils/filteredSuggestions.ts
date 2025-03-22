import { ITodo } from "../interfaces";

export const getFilteredSuggestions = (
  suggestions: ITodo[],
  searchText: string
): string[] => {
  const filteredSuggestions: string[] = [];
  suggestions.forEach(({ title = "" }: ITodo) => {
    if (title.toLowerCase().includes(searchText.toLowerCase())) {
      filteredSuggestions.push(title);
    }
  });
  return filteredSuggestions;
};
