import { memo, useEffect } from "react";
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
  useEffect(() => {
    if (showSuggestions && suggestions.length) {
      const firstSuggestion = document.querySelector(
        ".suggestion"
      ) as HTMLElement;
      firstSuggestion?.focus();
    }
  }, [showSuggestions, suggestions]);
  if (isFetching) {
    return <div className="loader">{LOADING}</div>;
  }
  if (suggestions && showSuggestions) {
    const errorMsg = error ? SUGGESTIONS_ERROR : NO_TODOS_FOUND;
    return (
      <ul
        className="suggestions"
        aria-describedby="list of suggestions"
        aria-label="list of suggestions"
        role="listbox"
      >
        {suggestions.length ? (
          suggestions.map((suggestion, index) => (
            <li
              key={index}
              role="option"
              className="suggestion"
              tabIndex={0}
              onClick={(e) => onSuggestionSelect(e, suggestion)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSuggestionSelect(e, suggestion);
                }
              }}
            >
              {highlightText(suggestion)}
            </li>
          ))
        ) : (
          <li
            className="emptySuggestions"
            role="alert"
            aria-label={errorMsg}
            aria-live="assertive"
          >
            {errorMsg}
          </li>
        )}
      </ul>
    );
  }
  return null;
};

export default memo(SuggestionsList);
