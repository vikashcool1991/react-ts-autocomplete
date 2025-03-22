import { FETCH_TODOS_ERROR, FETCH_TODOS_URL } from "../constants/requests";
import { FetchSuggestionResponseType } from "../types";
import { getFilteredSuggestions } from "../utils/filteredSuggestions";

const fetchTodoSuggestions =
  (searchText: string) => async (): FetchSuggestionResponseType => {
    const response = await fetch(FETCH_TODOS_URL);
    if (!response.ok) throw new Error(FETCH_TODOS_ERROR);
    const data = await response.json();
    const suggestions = getFilteredSuggestions(data, searchText);
    return suggestions;
  };
export default fetchTodoSuggestions;
