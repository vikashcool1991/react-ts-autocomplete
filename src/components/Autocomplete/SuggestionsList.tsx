import { memo } from "react";
import {
  LOADING,
  NO_TODOS_FOUND,
  SUGGESTIONS_ERROR,
} from "../../constants/autocomplete";
import { ISuggestionsListProps } from "../../interfaces";
import "./styles.css";

const SuggestionsList = ({
  isFetching,
  suggestions,
  showSuggestions,
  onSuggestionSelect,
  inputValue,
  error,
}: ISuggestionsListProps) => {
  const highlightText = (text: string) => {
    const parts = text.split(new RegExp(`(${inputValue})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === inputValue.toLowerCase() ? (
        <strong key={index} className="highlight">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };
  if (isFetching) {
    return <div className="loader">{LOADING}</div>;
  }
  if (suggestions && showSuggestions) {
    return (
      <ul className="suggestions">
        {suggestions.length ? (
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="suggestion"
              onClick={(e) => onSuggestionSelect(e, suggestion)}
            >
              {highlightText(suggestion)}
            </li>
          ))
        ) : (
          <li className="emptySuggestions">
            {error ? SUGGESTIONS_ERROR : NO_TODOS_FOUND}
          </li>
        )}
      </ul>
    );
  }
  return null;
};

export default memo(SuggestionsList);
