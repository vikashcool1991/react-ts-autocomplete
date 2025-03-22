import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import InputSearch from "../InputSearch";
import { ChangeEventType, MouseEventType } from "../../types";
import fetchTodoSuggestions from "../../requests/fetchTodoSuggestions";
import useQuery from "../../hooks/useQuery";
import useClickAway from "../../hooks/useClickAway";
import "./styles.css";
import {
  LOADING,
  NO_TODOS_FOUND,
  SEARCH_TODOS_PLACEHOLDER,
  SUGGESTIONS_ERROR,
} from "../../constants/autocomplete";
import { useTodosDispatch } from "../../providers/todos";
import { setFetchTodos } from "../../providers/todos/actions";

const AutoComplete: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const ref = useClickAway<HTMLDivElement>(() => setShowSuggestions(false));
  const debouncedInputValue = useDebounce(inputValue, 500);
  const dispatch = useTodosDispatch();

  const { data, isFetching, error } = useQuery(
    fetchTodoSuggestions(debouncedInputValue),
    [debouncedInputValue],
    { enabled: selected !== inputValue && !!inputValue }
  );

  useEffect(() => {
    if (data) {
      setSuggestions(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setSuggestions([]);
    }
  }, [error]);

  const handleChange = (event: ChangeEventType) => {
    setInputValue(event.target.value);
    setShowSuggestions(true);
  };

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

  const onClear = () => {
    setInputValue("");
    setSelected("");
    setShowSuggestions(false);
  };

  const onFocus = () => {
    if (inputValue !== selected && inputValue) {
      setShowSuggestions(true);
    }
  };

  const onEnter = ({ key }: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
      dispatch?.(setFetchTodos(inputValue, true));
    }
  };

  const onSuggestionSelect = (
    _event: MouseEventType,
    selectedSuggestion: string
  ) => {
    setInputValue(selectedSuggestion);
    setShowSuggestions(false);
    setSelected(selectedSuggestion);
    dispatch?.(setFetchTodos(selectedSuggestion, true));
  };

  return (
    <div className="autoComplete" ref={ref}>
      <InputSearch
        placeholder={SEARCH_TODOS_PLACEHOLDER}
        onChange={handleChange}
        value={inputValue}
        onClear={onClear}
        onFocus={onFocus}
        onEnter={onEnter}
      />
      {isFetching ? (
        <div className="loader">{LOADING}</div>
      ) : (
        suggestions &&
        showSuggestions && (
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
        )
      )}
    </div>
  );
};

export default AutoComplete;
